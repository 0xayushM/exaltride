"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { OtpForm } from "./OtpForm";

type AuthView = "login" | "signup" | "otp";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [view, setView] = useState<AuthView>("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [session, setSession] = useState("");

  const handleLoginSuccess = (phone: string, sessionToken: string) => {
    setPhoneNumber(phone);
    setSession(sessionToken);
    setView("otp");
  };

  const handleSignupSuccess = (phone: string, sessionToken: string) => {
    setPhoneNumber(phone);
    setSession(sessionToken);
    setView("otp");
  };

  const handleOtpSuccess = () => {
    onClose();
    // Reset state
    setView("login");
    setPhoneNumber("");
    setSession("");
  };

  const handleBack = () => {
    setView("login");
    setPhoneNumber("");
    setSession("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {view === "login" && "Welcome Back"}
            {view === "signup" && "Create Account"}
            {view === "otp" && "Verify OTP"}
          </DialogTitle>
          <DialogDescription>
            {view === "login" && "Login to your ExaltRide account"}
            {view === "signup" && "Sign up for a new ExaltRide account"}
            {view === "otp" && "Enter the OTP sent to your WhatsApp"}
          </DialogDescription>
        </DialogHeader>

        {view === "login" && (
          <LoginForm
            onSuccess={handleLoginSuccess}
            onSwitchToSignup={() => setView("signup")}
          />
        )}

        {view === "signup" && (
          <SignupForm
            onSuccess={handleSignupSuccess}
            onSwitchToLogin={() => setView("login")}
          />
        )}

        {view === "otp" && (
          <OtpForm
            phoneNumber={phoneNumber}
            session={session}
            onSuccess={handleOtpSuccess}
            onBack={handleBack}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
