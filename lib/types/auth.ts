export type UserRole = "buyer" | "vendor" | "admin";

export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  role: UserRole;
  email?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SignupRequest {
  phoneNumber: string;
  name: string;
  role: UserRole;
}

export interface SignupResponse {
  message: string;
  session: string;
}

export interface LoginRequest {
  phoneNumber: string;
}

export interface LoginResponse {
  message: string;
  session: string;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  session: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
