import { Suspense } from "react";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import { fetchAllProducts } from "@/lib/api/products";
import ProductsContent from "@/components/products/ProductsContent";

export default async function ProductsPage() {
  // Fetch products from API on the server
  const allProducts = await fetchAllProducts();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="hidden md:block">
            <TopBar />
          </div>
          <main className="container mx-auto px-4 py-4 md:py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            </div>
          </main>
        </div>
      }
    >
      <ProductsContent initialProducts={allProducts} />
    </Suspense>
  );
}
