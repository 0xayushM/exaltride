"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signup } from "@/lib/api/auth";
import { UserRole } from "@/lib/types/auth";
import { Loader2 } from "lucide-react";

interface SignupFormProps {
  onSuccess: (phoneNumber: string, session: string) => void;
  onSwitchToLogin: () => void;
}

interface SignupFormData {
  name: string;
  phoneNumber: string;
  role: UserRole;
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      role: "buyer",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Ensure phone number has country code
      const phoneNumber = data.phoneNumber.startsWith("+")
        ? data.phoneNumber
        : `+91${data.phoneNumber}`;

      const response = await signup({
        name: data.name,
        phoneNumber,
        role: data.role,
      });

      if (response) {
        onSuccess(phoneNumber, response.session);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="+91 XXXXXXXXXX"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^(\+91)?[6-9]\d{9}$/,
                message: "Please enter a valid Indian phone number",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            I am a
          </label>
          <select
            id="role"
            {...register("role", { required: "Please select a role" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="buyer">Buyer (Customer)</option>
            <option value="vendor">Vendor (Seller)</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Login
        </button>
      </div>
    </div>
  );
}
