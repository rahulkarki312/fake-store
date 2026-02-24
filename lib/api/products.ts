
import { fetcher } from "./fetcher";
import { Product } from "./types";

const BASE_URL = "https://fakestoreapi.com";

export async function getAllProducts(
  sort?: "asc" | "desc"
): Promise<Product[]> {
  const query = sort ? `?sort=${sort}` : "";

  return fetcher<Product[]>(`${BASE_URL}/products${query}`, {
    next: { revalidate: 60 },
    //  cache: "no-store",

  });
}

export async function getProductById(
  id: string
): Promise<Product> {
  return fetcher<Product>(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });
}

export async function getAllCategories(): Promise<string[]> {
  return fetcher<string[]>(`${BASE_URL}/products/categories`, {
    next: { revalidate: 60 },
  });
}