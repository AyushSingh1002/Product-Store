import { useQuery } from "@tanstack/react-query";
export default function ProductsState(limit = 8, page = 1) {
    return useQuery({
        queryKey: ["products", limit, page],
        queryFn: async () => {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            // Slicing the data
            return data.slice((page - 1) * limit, page * limit);
        },
    });
}