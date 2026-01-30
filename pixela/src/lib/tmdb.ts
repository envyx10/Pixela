const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is not defined in environment variables");
}

type TmdbParams = Record<string, string | number | boolean | undefined>;

export const fetchFromTmdb = async <T = unknown>(
  endpoint: string, 
  params: TmdbParams = {}
): Promise<T> => {
  const baseUrl = TMDB_BASE_URL?.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  
  const url = new URL(`${baseUrl}/${cleanEndpoint}`);
  
  // console.log(`[TMDB] Fetching: ${url.pathname}`);
  
  url.searchParams.append("api_key", TMDB_API_KEY!);
  url.searchParams.append("language", "es-ES");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.status} - ${res.statusText}`);
  }

  return res.json() as Promise<T>;
};
