import { client } from './investbook-api/client.gen';

function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, (c) => '-' + c.toLowerCase());
}

function deepCamelToKebab(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(deepCamelToKebab);
  }

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        camelToKebab(k),
        deepCamelToKebab(v),
      ]),
    );
  }

  return value;
}

function deepKebabToCamel(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(deepKebabToCamel);
  }

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase()),
        deepKebabToCamel(v),
      ]),
    );
  }

  return value;
}

export function configureApiClient(): void {
  client.setConfig({
    baseUrl: import.meta.env['VITE_API_BASE_URL'],
    bodySerializer: (body) => JSON.stringify(deepCamelToKebab(body)),
    responseTransformer: async (data) => deepKebabToCamel(data),
  });
}
