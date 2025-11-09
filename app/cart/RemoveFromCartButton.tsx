"use client";

import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/lib/cart-actions";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

interface RemoveFromCartButtonProps {
  productId: string;
}

export function RemoveFromCartButton({ productId }: RemoveFromCartButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      await removeFromCart(productId);
    });
  };

  return (
    <Button onClick={handleRemove} variant="ghost" size="icon" disabled={isPending}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
