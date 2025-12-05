"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { verifyOtp } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Loader2, ArrowLeft } from "lucide-react";

interface OtpFormProps {
  phoneNumber: string;
  session: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function OtpForm({
  phoneNumber,
  session,
  onSuccess,
  onBack,
}: OtpFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.match(/\d/g);

    if (digits) {
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);

      // Focus last filled input
      const lastIndex = Math.min(digits.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await verifyOtp({
        phoneNumber,
        session,
        otp: otpString,
      });

      if (response) {
        // Store auth data
        setAuth(response.user, {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });

        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          OTP sent to WhatsApp number
          <br />
          <span className="font-medium text-gray-900">{phoneNumber}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ))}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || otp.join("").length !== 6}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Didn't receive OTP? Try again
        </button>
      </div>
    </div>
  );
}
