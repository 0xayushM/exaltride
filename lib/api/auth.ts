import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/lib/types/auth";

// Use proxy to bypass CORS issues
// Set USE_PROXY to false once backend enables CORS
const USE_PROXY = true;

const DIRECT_AUTH_URL =
  "https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth";

const PROXY_URL = "/api/auth/proxy";

const AUTH_BASE_URL = USE_PROXY ? PROXY_URL : DIRECT_AUTH_URL;

/**
 * Sign up a new user
 */
export async function signup(
  data: SignupRequest
): Promise<SignupResponse | null> {
  try {
    console.log("Attempting signup with:", { phoneNumber: data.phoneNumber, role: data.role });

    const url = USE_PROXY ? AUTH_BASE_URL : `${AUTH_BASE_URL}/signup`;
    const body = USE_PROXY ? { endpoint: "/signup", ...data } : data;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: "cors",
    });

    console.log("Signup response status:", response.status);

    if (!response.ok) {
      let errorMessage = "Signup failed";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Signup successful");
    return result;
  } catch (error: any) {
    console.error("Signup error details:", error);

    if (error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to authentication server. Please check your internet connection or try again later."
      );
    }

    throw error;
  }
}

/**
 * Login with phone number (sends OTP to WhatsApp)
 */
export async function login(data: LoginRequest): Promise<LoginResponse | null> {
  try {
    console.log("Attempting login with:", { phoneNumber: data.phoneNumber });
    console.log("Using proxy:", USE_PROXY);

    const url = USE_PROXY ? AUTH_BASE_URL : `${AUTH_BASE_URL}/login`;
    const body = USE_PROXY ? { endpoint: "/login", ...data } : data;

    console.log("API URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: "cors",
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      let errorMessage = "Login failed";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Login successful");
    return result;
  } catch (error: any) {
    console.error("Login error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    // Provide more specific error messages
    if (error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to authentication server. Please check your internet connection or try again later."
      );
    }

    throw error;
  }
}

/**
 * Verify OTP and complete authentication
 */
export async function verifyOtp(
  data: VerifyOtpRequest
): Promise<VerifyOtpResponse | null> {
  try {
    console.log("Attempting OTP verification");

    const url = USE_PROXY ? AUTH_BASE_URL : `${AUTH_BASE_URL}/verify-otp`;
    const body = USE_PROXY ? { endpoint: "/verify-otp", ...data } : data;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: "cors",
    });

    console.log("OTP verification response status:", response.status);

    if (!response.ok) {
      let errorMessage = "OTP verification failed";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("OTP verification successful");
    return result;
  } catch (error: any) {
    console.error("OTP verification error details:", error);

    if (error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to authentication server. Please check your internet connection or try again later."
      );
    }

    throw error;
  }
}

/**
 * Get Google SSO URL
 */
export function getGoogleSSOUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: "24vle4l58riamcdce2lh1imn35",
    response_type: "code",
    scope: "email openid profile",
    redirect_uri: redirectUri,
    identity_provider: "Google",
  });

  return `https://exaltride-auth.auth.ap-south-1.amazoncognito.com/oauth2/authorize?${params.toString()}`;
}

/**
 * Exchange OAuth code for tokens (to be implemented based on backend)
 */
export async function exchangeOAuthCode(code: string): Promise<any> {
  // This will need to be implemented based on your backend OAuth flow
  // Typically you'd send the code to your backend which exchanges it with Cognito
  throw new Error("OAuth code exchange not yet implemented");
}
