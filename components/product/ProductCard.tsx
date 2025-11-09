import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";
import { AddToCart } from "./AddToCart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="line-clamp-2 font-semibold">{product.name}</h3>
          <p className="mt-2 text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <AddToCart
          productId={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          disabled={product.stock === 0}
        />
      </CardFooter>
    </Card>
  );
}
