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
  return fetcher<LoginResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}