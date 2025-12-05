"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeOAuthCode } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError("Authentication failed. Please try again.");
        setTimeout(() => router.push("/"), 3000);
        return;
      }

      if (!code) {
        setError("No authorization code received.");
        setTimeout(() => router.push("/"), 3000);
        return;
      }

      try {
        // Exchange code for tokens
        // Note: This needs to be implemented based on your backend
        const response = await exchangeOAuthCode(code);

        if (response) {
          setAuth(response.user, {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });

          // Redirect to home or intended page
          router.push("/");
        }
      } catch (err: any) {
        console.error("OAuth callback error:", err);
        setError("Failed to complete authentication. Please try again.");
        setTimeout(() => router.push("/"), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {error ? (
          <div className="space-y-4">
            <div className="text-red-600 text-lg font-medium">{error}</div>
            <p className="text-gray-600">Redirecting to home page...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
            <p className="text-gray-600">Completing authentication...</p>
          </div>
        )}
      </div>
    </div>
  );
}
