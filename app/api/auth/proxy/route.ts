import { NextRequest, NextResponse } from "next/server";

const AUTH_BASE_URL =
  "https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth";

/**
 * Proxy route to bypass CORS issues during development
 * This forwards authentication requests to the backend API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, ...data } = body;

    if (!endpoint) {
      return NextResponse.json(
        { message: "Endpoint is required" },
        { status: 400 }
      );
    }

    console.log(`[Auth Proxy] Forwarding request to: ${AUTH_BASE_URL}${endpoint}`);
    console.log(`[Auth Proxy] Request data:`, JSON.stringify(data, null, 2));

    const response = await fetch(`${AUTH_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(`[Auth Proxy] Response status: ${response.status}`);

    let result;
    try {
      result = await response.json();
    } catch (e) {
      result = { message: "Invalid response from authentication server" };
    }

    if (!response.ok) {
      console.error(`[Auth Proxy] Error response:`, result);
      return NextResponse.json(result, { status: response.status });
    }

    console.log(`[Auth Proxy] Success`);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("[Auth Proxy] Error:", error);
    return NextResponse.json(
      { 
        message: error.message || "Proxy request failed",
        error: "PROXY_ERROR" 
      },
      { status: 500 }
    );
  }
}
