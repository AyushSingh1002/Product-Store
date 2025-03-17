import { useState } from "react";
import Loader from "../components/ui/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { ErrorRes } from "@/components/ui/errorRes";


import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"


import { Button } from "../components/ui/button";
import { ProductsStore } from "../store/productStore";
import ProductsState from "../StateManager/ProductsState";

function Product() {
  const [page, setPage] = useState(1);
  const limit = 8;
  const { data, isLoading, error } = ProductsState(limit, page);
  const { AddProductToCart } = ProductsStore();

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // State for sorting
  const [sortType, setSortType] = useState<string>("none");

  // Extract unique categories
  const categories = ["All", ...(data ? [...new Set(data.map((item: any) => item.category))] : [])];

  // Handle adding a product to the cart
  const handleProductData = (product: any) => {
    AddProductToCart(product);
  };

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? data
      : data?.filter((product: any) => product.category === selectedCategory);

  // Sort products by price or count
  const sortedProducts = filteredProducts
    ? [...filteredProducts].sort((a: any, b: any) => {
        if (sortType === "priceLowHigh") return a.price - b.price;
        if (sortType === "priceHighLow") return b.price - a.price;
        if (sortType === "countLowHigh") return a.rating.count - b.rating.count;
        if (sortType === "countHighLow") return b.rating.count - a.rating.count;
        return 0;
      })
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <ErrorRes />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen w-full p-5">
      {/* Filters and Sorting */}
      <div className="flex flex-wrap justify-center gap-4 mb-5">
        {/* Category Buttons */}
        {categories.map((category: any) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category}
          </Button>
        ))}

        {/* Sorting Dropdown */}
        <select
          className="px-4 py-2 border rounded-lg bg-gray-200 text-gray-800"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="none">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="countLowHigh">Count: Low to High</option>
          <option value="countHighLow">Count: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 text-center ml-3 justify-center">
        {sortedProducts.map((product: any) => (
          <Card key={product.id}>
            <CardHeader>
              <img
                className="h-[250px] w-full p-2 rounded-2xl"
                src={product.image}
                alt={product.title}
              />
            </CardHeader>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>
              {product.description.substring(0, 100) + "..."}
            </CardDescription>
            <CardContent>
              <p className="font-medium">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Count: {product.rating.count}</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleProductData(product)}
                className="w-full cursor-pointer"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/*pagination*/}
      <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious 
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/">{page}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext 
       onClick={() => setPage((prev) => prev + 1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>


      {/* No Products Found */}
      {sortedProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </div>
  );
}

export default Product;
