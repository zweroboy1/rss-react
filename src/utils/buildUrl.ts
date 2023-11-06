export function buildUrl(
  baseUrl: string,
  params: Record<string, string | number>
): string {
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return `${baseUrl}?${queryString}`;
}
