import { fetcher } from "./fetcher";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function loginUser(
  payload: LoginRequest,
): Promise<LoginResponse> {
  const timestamp = Date.now();
  
  return fetcher<LoginResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login?_=${timestamp}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );
}