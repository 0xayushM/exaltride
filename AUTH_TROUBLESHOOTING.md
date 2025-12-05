# Authentication Troubleshooting Guide

## Common Error: "Failed to fetch"

### Possible Causes

1. **CORS (Cross-Origin Resource Sharing) Issue**
   - The API server doesn't allow requests from your domain
   - Most common cause

2. **Network/Internet Connection**
   - No internet connection
   - Firewall blocking the request

3. **API Server Down**
   - The authentication server is not responding
   - Server maintenance

4. **Wrong API URL**
   - Incorrect endpoint URL
   - Typo in the base URL

---

## Debugging Steps

### Step 1: Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for detailed error logs:
   ```
   Attempting login with: { phoneNumber: "+91XXXXXXXXXX" }
   API URL: https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth/login
   ```

### Step 2: Check Network Tab

1. Open **Network** tab in DevTools
2. Try to login
3. Look for the `/login` request
4. Check the status:
   - **Failed** or **CORS error** → CORS issue
   - **404** → Wrong endpoint
   - **500** → Server error
   - **Pending** forever → Network/timeout issue

### Step 3: Test API Directly

Use curl or Postman to test the API:

```bash
curl -X POST https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+91XXXXXXXXXX"}'
```

---

## Solutions

### Solution 1: CORS Issue (Most Common)

The backend needs to enable CORS for your domain.

**Backend needs to add these headers:**
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**For production:**
```
Access-Control-Allow-Origin: https://yourdomain.com
```

**Contact your backend team** to enable CORS for:
- Development: `http://localhost:3000`
- Production: Your production domain

---

### Solution 2: Use Next.js API Route as Proxy

Create a proxy to bypass CORS (temporary solution):

**Create `/app/api/auth/proxy/route.ts`:**

```typescript
import { NextRequest, NextResponse } from "next/server";

const AUTH_BASE_URL =
  "https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, ...data } = body;

    const response = await fetch(`${AUTH_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Request failed" },
      { status: 500 }
    );
  }
}
```

**Then update `/lib/api/auth.ts`:**

```typescript
const USE_PROXY = true; // Set to true to use proxy
const AUTH_BASE_URL = USE_PROXY
  ? "/api/auth/proxy"
  : "https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth";

export async function login(data: LoginRequest): Promise<LoginResponse | null> {
  const url = USE_PROXY ? "/api/auth/proxy" : `${AUTH_BASE_URL}/login`;
  const body = USE_PROXY ? { endpoint: "/login", ...data } : data;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  // ... rest of the code
}
```

---

### Solution 3: Check Internet Connection

1. Open another tab and try loading a website
2. Check if you're connected to the internet
3. Try disabling VPN if you're using one
4. Check firewall settings

---

### Solution 4: Verify API Endpoint

1. Confirm the API URL is correct:
   ```
   https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth/login
   ```

2. Test in Postman or curl
3. Check with backend team if the endpoint changed

---

### Solution 5: Check API Server Status

1. Contact backend team to verify server is running
2. Check if there's scheduled maintenance
3. Try again after a few minutes

---

## Quick Fix: Proxy Implementation

If you need to test immediately and can't wait for backend CORS fix:

**1. Create the proxy route:**

```bash
mkdir -p app/api/auth/proxy
```

**2. Create `app/api/auth/proxy/route.ts`:**

```typescript
import { NextRequest, NextResponse } from "next/server";

const AUTH_BASE_URL =
  "https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth";

export async function POST(request: NextRequest) {
  try {
    const { endpoint, ...data } = await request.json();

    console.log(`Proxying request to: ${AUTH_BASE_URL}${endpoint}`);

    const response = await fetch(`${AUTH_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Proxy request failed" },
      { status: 500 }
    );
  }
}
```

**3. Update `lib/api/auth.ts`:**

Replace the AUTH_BASE_URL line with:

```typescript
const AUTH_BASE_URL = "/api/auth/proxy";
```

And update the login function:

```typescript
export async function login(data: LoginRequest): Promise<LoginResponse | null> {
  try {
    const response = await fetch(AUTH_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint: "/login",
        ...data,
      }),
    });
    // ... rest stays the same
  }
}
```

---

## Testing After Fix

1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Try login again
4. Check console for logs
5. Verify network request succeeds

---

## Prevention

### For Development
- Always test API endpoints with Postman first
- Verify CORS is enabled for localhost
- Use proxy during development if needed

### For Production
- Ensure CORS is properly configured
- Test on staging environment first
- Monitor API health
- Have fallback error messages

---

## Contact Backend Team

If the issue persists, provide this information to your backend team:

```
Issue: CORS error when calling authentication API
Frontend Domain: http://localhost:3000 (dev) / https://yourdomain.com (prod)
API Endpoint: https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth
Request Method: POST
Headers Needed: Content-Type: application/json

Please enable CORS for the above domain.
```

---

## Additional Resources

- [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [AWS API Gateway CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## Still Having Issues?

1. Check all console logs
2. Share network tab screenshot
3. Test API with curl/Postman
4. Contact backend team
5. Try the proxy solution above
