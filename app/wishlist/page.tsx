"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/hooks/useAuth";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <WishlistContent />
    </ProtectedRoute>
  );
}

function WishlistContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>

          <div className="text-center py-12">
            <p className="text-gray-600">
              Your saved items will appear here.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This page is under construction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
