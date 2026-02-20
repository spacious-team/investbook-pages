#!/usr/bin/env node
// Fetches the OpenAPI spec from the backend, transliterates Cyrillic schema
// names to Latin identifiers, generates meaningful operationIds from paths,
// and writes the result to openapi-spec.json for use by openapi-ts.

import { writeFileSync } from 'node:fs';

const SPEC_URL = 'http://localhost:2030/v3/api-docs/public';
const OUTPUT_FILE = 'openapi-spec.json';

// Cyrillic → Latin transliteration table (ISO 9 / common web standard)
const TRANSLIT_MAP = {
  А: 'A',
  Б: 'B',
  В: 'V',
  Г: 'G',
  Д: 'D',
  Е: 'E',
  Ё: 'Yo',
  Ж: 'Zh',
  З: 'Z',
  И: 'I',
  Й: 'J',
  К: 'K',
  Л: 'L',
  М: 'M',
  Н: 'N',
  О: 'O',
  П: 'P',
  Р: 'R',
  С: 'S',
  Т: 'T',
  У: 'U',
  Ф: 'F',
  Х: 'Kh',
  Ц: 'Ts',
  Ч: 'Ch',
  Ш: 'Sh',
  Щ: 'Shch',
  Ъ: '',
  Ы: 'Y',
  Ь: '',
  Э: 'E',
  Ю: 'Yu',
  Я: 'Ya',
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'j',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

function hasCyrillic(str) {
  return /[а-яёА-ЯЁ]/.test(str);
}

function transliterate(str) {
  return str
    .split('')
    .map((ch) => (ch in TRANSLIT_MAP ? TRANSLIT_MAP[ch] : ch))
    .join('');
}

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

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`Fetching spec from ${SPEC_URL}…`);
const response = await fetch(SPEC_URL);
if (!response.ok) {
  throw new Error(
    `Failed to fetch spec: ${response.status} ${response.statusText}`,
  );
}

const spec = await response.json();

// 1. Build transliteration map for all Cyrillic schema names
const schemas = spec?.components?.schemas ?? {};
const renameMap = {}; // cyrillicName → latinName

for (const name of Object.keys(schemas)) {
  if (hasCyrillic(name)) {
    renameMap[name] = transliterate(name)
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}

console.log(`Renaming ${Object.keys(renameMap).length} Cyrillic schema(s):`);
for (const [from, to] of Object.entries(renameMap)) {
  console.log(`  ${from} → ${to}`);
}

// 2. Apply renames via text replacement on the serialised JSON.
//    This catches every $ref, discriminator mapping, etc. in one pass.
let specText = JSON.stringify(spec, null, 2);

const sortedRenames = Object.entries(renameMap).sort(
  ([a], [b]) => b.length - a.length,
);
for (const [from, to] of sortedRenames) {
  // Replace inside JSON strings: "/components/schemas/Сделка" and plain keys "Сделка"
  specText = specText.replaceAll(from, to);
}

const transformedSpec = JSON.parse(specText);

// 3. Generate operationIds for every operation
let operationCount = 0;
const paths = transformedSpec?.paths ?? {};

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

// 4. Write output
writeFileSync(OUTPUT_FILE, JSON.stringify(transformedSpec, null, 2) + '\n');
console.log(`Wrote ${OUTPUT_FILE}`);
