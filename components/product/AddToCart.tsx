"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart-actions";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
  productId: string;
  name: string;
  price: number;
  image: string;
  disabled?: boolean;
}

export function AddToCart({ productId, name, price, image, disabled }: AddToCartProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart(productId, name, price, image, 1);
      setMessage(result.message);

      // Clear message after 2 seconds
      setTimeout(() => setMessage(""), 2000);
    });
  };

  return (
    <div className="w-full">
      <Button
        onClick={handleAddToCart}
        disabled={disabled || isPending}
        className="w-full"
        size="lg"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isPending ? "Adding..." : "Add to Cart"}
      </Button>
      {message && (
        <p className="mt-2 text-center text-sm text-green-600">{message}</p>
      )}
    </div>
  );
}
