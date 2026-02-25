
import { fetcher } from "../fetcher";
import { Product } from "../types";

const BASE_URL =  process.env.NEXT_PUBLIC_API_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;


export async function getAllProducts(
  sort?: "asc" | "desc"
): Promise<Product[]> {
  const query = sort ? `?sort=${sort}` : "";

  return fetcher<Product[]>(`${siteUrl}/api/products${query}`, {
    
    cache: "no-store"

  });
}

export async function getProductById(
  id: string
): Promise<Product> {
  return fetcher<Product>(`${siteUrl}/api/products/${id}`, {
    cache: "no-store"
  });
}

export async function getAllCategories(): Promise<string[]> {
  return fetcher<string[]>(`${siteUrl}/api/products/categories`, {
    cache: "no-store"
  });
}