export function withBasePath(url: string): string {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${url}`;
}
