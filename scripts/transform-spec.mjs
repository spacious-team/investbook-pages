#!/usr/bin/env node
// Fetches the OpenAPI spec from the backend, generates meaningful operationIds
// from paths, and writes the result to openapi-spec.json for use by openapi-ts.

import { writeFileSync } from 'node:fs';

const SPEC_URL = 'http://localhost:2030/v3/api-docs';
const OUTPUT_FILE = 'openapi-spec.json';

// Convert a kebab-case or plain segment to PascalCase.
// e.g. "security-quotes" → "SecurityQuotes", "transactions" → "Transactions"
function toPascalCase(segment) {
  return segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// Build an operationId from an HTTP method and path.
// e.g. GET /api/v1/transactions/{id} → "getTransactionsById"
function buildOperationId(method, path) {
  // Strip leading /api/v1/
  const stripped = path.replace(/^\/api\/v1\//, '');

  const parts = stripped.split('/').filter(Boolean);

  const segments = parts.map((part) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      // {paramName} → "ByParamName"
      const param = part.slice(1, -1);
      return 'By' + toPascalCase(param);
    }
    return toPascalCase(part);
  });

  return method.toLowerCase() + segments.join('');
}

// Recursively sort all object keys alphabetically for deterministic output.
// Arrays and primitives are left as-is.
function sortObjectKeys(value) {
  if (Array.isArray(value)) return value.map(sortObjectKeys);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, sortObjectKeys(value[k])]),
    );
  }
  return value;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`Fetching spec from ${SPEC_URL}…`);
const response = await fetch(SPEC_URL);
if (!response.ok) {
  throw new Error(
    `Failed to fetch spec: ${response.status} ${response.statusText}`,
  );
}

const spec = await response.json();

// 1. Generate operationIds for every operation
let operationCount = 0;
const paths = spec?.paths ?? {};

for (const [path, pathItem] of Object.entries(paths)) {
  for (const method of [
    'get',
    'put',
    'post',
    'delete',
    'patch',
    'options',
    'head',
    'trace',
  ]) {
    const operation = pathItem[method];
    if (!operation) continue;

    operation.operationId = buildOperationId(method, path);
    operationCount++;
  }
}

console.log(`Generated operationIds for ${operationCount} operation(s).`);

// 2. Convert kebab-case names to camelCase in schema properties and path parameters

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// Rename schema properties
const allSchemas = spec?.components?.schemas ?? {};
for (const schema of Object.values(allSchemas)) {
  if (!schema.properties) continue;
  const renamed = {};
  for (const [name, def] of Object.entries(schema.properties)) {
    renamed[kebabToCamel(name)] = def;
  }
  schema.properties = renamed;
  if (Array.isArray(schema.required)) {
    schema.required = schema.required.map(kebabToCamel);
  }
}

// Rename path parameters in URL templates and operation parameter definitions
const renamedPaths = {};
for (const [urlTemplate, pathItem] of Object.entries(spec?.paths ?? {})) {
  const newUrl = urlTemplate.replace(
    /\{([^}]+)\}/g,
    (_, name) => '{' + kebabToCamel(name) + '}',
  );

  for (const method of [
    'get',
    'put',
    'post',
    'delete',
    'patch',
    'options',
    'head',
    'trace',
  ]) {
    const op = pathItem[method];
    if (!op?.parameters) continue;
    for (const param of op.parameters) {
      if (param.in === 'path' && param.name) {
        param.name = kebabToCamel(param.name);
      }
    }
  }
  if (pathItem.parameters) {
    for (const param of pathItem.parameters) {
      if (param.in === 'path' && param.name) {
        param.name = kebabToCamel(param.name);
      }
    }
  }

  renamedPaths[newUrl] = pathItem;
}
spec.paths = renamedPaths;

console.log('Converted kebab-case property names to camelCase.');

// 3. Sort all object keys for deterministic output, then write
const sortedSpec = sortObjectKeys(spec);
writeFileSync(OUTPUT_FILE, JSON.stringify(sortedSpec, null, 2) + '\n');
console.log(`Wrote ${OUTPUT_FILE}`);
