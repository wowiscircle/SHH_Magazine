export function analyticsPage(href) {
  const url = new URL(href);
  if (url.hostname !== 'shh-magazine.vercel.app' || url.pathname === '/admin' || url.pathname.startsWith('/admin/')) return null;
  return `${url.origin}${url.pathname}`;
}

export function cleanReferrer(referrer) {
  try { return referrer ? `${new URL(referrer).origin}/` : ''; } catch { return ''; }
}
