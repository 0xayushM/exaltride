"use client";

import { Button } from "@/components/ui/button";
import { updateCartQuantity } from "@/lib/cart-actions";
import { Minus, Plus } from "lucide-react";
import { useTransition } from "react";

interface CartActionsProps {
  productId: string;
  quantity: number;
}

export function CartActions({ productId, quantity }: CartActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdateQuantity = (newQuantity: number) => {
    startTransition(async () => {
      await updateCartQuantity(productId, newQuantity);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleUpdateQuantity(quantity - 1)}
        disabled={isPending || quantity <= 1}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleUpdateQuantity(quantity + 1)}
        disabled={isPending}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
