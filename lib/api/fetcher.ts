import { ApiError } from "./api-error";

interface FetchOptions extends RequestInit {
  next?: NextFetchRequestConfig;
}

export async function fetcher<T>(
  url: string,
  options?: FetchOptions,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://fakestoreapi.com/',
      'Origin': 'https://fakestoreapi.com',
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorBody = await response.json();
      errorMessage =
        errorBody?.message ||
        errorBody?.error ||
        JSON.stringify(errorBody) ||
        errorMessage;
    } catch (jsonError) {
      try {
        const text = await response.text();
        if (text) {
          errorMessage = text;
        }
      } catch {
        errorMessage = response.statusText || errorMessage;
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  return response.json() as Promise<T>;
}
