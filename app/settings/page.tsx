"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/hooks/useAuth";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}

function SettingsContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="h-8 w-8 text-gray-600" />
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>

          <div className="text-center py-12">
            <p className="text-gray-600">
              Account settings will appear here.
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
