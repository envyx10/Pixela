const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost';

export function getCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
}

export async function initCsrf(): Promise<void> {
  await fetch(`${BACKEND}/sanctum/csrf-cookie`, {
    credentials: 'include',
  });
}

export async function fetcher<T = any>(path: string): Promise<T> {
  const url = `${BACKEND}${path}`;
  const headers: Record<string, string> = {};

  if (path !== '/sanctum/csrf-cookie') {
    const token = getCookie('XSRF-TOKEN');
    if (token) headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }

  const res = await fetch(url, {
    credentials: 'include',
    headers,
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export async function logout(): Promise<void> {
  const token = getCookie('XSRF-TOKEN');
  await fetch(`${BACKEND}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: token
      ? { 'X-XSRF-TOKEN': decodeURIComponent(token) }
      : undefined,
  });
}
