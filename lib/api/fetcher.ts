import { ApiError } from "./api-error";

interface FetchOptions extends RequestInit {
  next?: NextFetchRequestConfig;
}

export async function fetcher<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorBody = await response.json();
      errorMessage = errorBody?.message || errorMessage;
    } catch {
      // response is not json
    }

    throw new ApiError(errorMessage, response.status);
  }

  return response.json() as Promise<T>;
}