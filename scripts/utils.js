//join array/string for display
export function formatList(data) {
  if (!data) return '';
  if (Array.isArray(data)) return data.join(', ');
  return data;
}
