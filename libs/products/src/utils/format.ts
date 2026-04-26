export function formatCurrency(value: number | undefined): string | undefined {
  if (value === null || value === undefined) return undefined;

  return value.toLocaleString('ru-RU') + ' ₽';
}
