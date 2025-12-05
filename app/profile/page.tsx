"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/hooks/useAuth";
import { User, Phone, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            My Profile
          </h1>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <User className="h-6 w-6 text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="h-6 w-6 text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.phoneNumber}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Shield className="h-6 w-6 text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Account Type</p>
                <p className="text-lg font-medium text-gray-900 capitalize">
                  {user.role}
                </p>
              </div>
            </div>

            {user.email && (
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <User className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
