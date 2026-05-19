import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";

export function useProducts() {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 10, query: "" });
      return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });
}

export function useProductByHandle(handle: string) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product as ShopifyProduct["node"] | null;
    },
    enabled: !!handle,
  });
}
