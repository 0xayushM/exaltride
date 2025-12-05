# Authentication Implementation Guide

## Overview

The ExaltRide application now includes a complete authentication system supporting:
- **Phone OTP Authentication** (via WhatsApp)
- **Google SSO** (via AWS Cognito)
- **Role-based Access Control** (buyer, vendor, admin)

## Architecture

### State Management
- **Zustand Store** (`/lib/stores/auth-store.ts`) - Persistent auth state with localStorage
- **Custom Hook** (`/lib/hooks/useAuth.ts`) - Convenient auth utilities

### API Services
- **Auth API** (`/lib/api/auth.ts`) - All authentication endpoints
- **Type Definitions** (`/lib/types/auth.ts`) - TypeScript interfaces

### UI Components
- **AuthDialog** - Main authentication modal
- **LoginForm** - Phone number login with Google SSO
- **SignupForm** - New user registration
- **OtpForm** - OTP verification with auto-focus
- **UserMenu** - Dropdown menu for authenticated users
- **ProtectedRoute** - HOC for route protection

## Authentication Flows

### 1. Phone OTP Flow

```
User clicks "Login" → LoginForm
  ↓
Enter phone number → POST /auth/login
  ↓
OTP sent to WhatsApp → OtpForm
  ↓
Enter 6-digit OTP → POST /auth/verify-otp
  ↓
Receive tokens + user data → Store in Zustand
  ↓
User authenticated ✓
```

### 2. Signup Flow

```
User clicks "Sign Up" → SignupForm
  ↓
Enter name, phone, role → POST /auth/signup
  ↓
OTP sent to WhatsApp → OtpForm
  ↓
Enter 6-digit OTP → POST /auth/verify-otp
  ↓
Receive tokens + user data → Store in Zustand
  ↓
User authenticated ✓
```

### 3. Google SSO Flow

```
User clicks "Login with Google" → Redirect to Cognito
  ↓
User authenticates with Google
  ↓
Redirect to /auth/callback?code=xxx
  ↓
Exchange code for tokens (backend)
  ↓
Store tokens + user data → Zustand
  ↓
User authenticated ✓
```

## API Endpoints

### Base URL
```
https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth
```

### 1. Signup
**POST** `/auth/signup`

```typescript
Request:
{
  phoneNumber: "+91XXXXXXXXXX",
  name: "User Name",
  role: "buyer" | "vendor" | "admin"
}

Response:
{
  message: "Signup successful",
  session: "session-token"
}
```

### 2. Login
**POST** `/auth/login`

```typescript
Request:
{
  phoneNumber: "+91XXXXXXXXXX"
}

Response:
{
  message: "OTP sent",
  session: "session-token"
}
```

### 3. Verify OTP
**POST** `/auth/verify-otp`

```typescript
Request:
{
  phoneNumber: "+91XXXXXXXXXX",
  session: "session-token",
  otp: "123456"
}

Response:
{
  message: "Authentication successful",
  accessToken: "jwt-token",
  refreshToken: "jwt-token",
  user: {
    id: "user-id",
    phoneNumber: "+91XXXXXXXXXX",
    name: "User Name",
    role: "buyer"
  }
}
```

## Usage Examples

### 1. Using the Auth Hook

```typescript
import { useAuth } from "@/lib/hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, getAuthHeader, isRole } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  // Access user data
  console.log(user.name, user.phoneNumber, user.role);

  // Check user role
  if (isRole("admin")) {
    // Show admin features
  }

  // Make authenticated API calls
  const headers = getAuthHeader();
  fetch("/api/protected", { headers });
}
```

### 2. Protecting Routes

```typescript
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <YourProtectedContent />
    </ProtectedRoute>
  );
}

// With role requirement
export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
```

### 3. Making Authenticated API Calls

```typescript
import { useAuth } from "@/lib/hooks/useAuth";

async function fetchUserOrders() {
  const { getAuthHeader } = useAuth();

  const response = await fetch("/api/orders", {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
```

### 4. Accessing Auth Store Directly

```typescript
import { useAuthStore } from "@/lib/stores/auth-store";

function MyComponent() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
  };
}
```

## Features

### ✅ Implemented

- [x] Phone OTP authentication
- [x] Google SSO integration
- [x] User signup with role selection
- [x] OTP verification with auto-focus
- [x] Persistent auth state (localStorage)
- [x] Protected routes
- [x] Role-based access control
- [x] User menu with dropdown
- [x] Auth dialog with view switching
- [x] Error handling
- [x] Loading states
- [x] OAuth callback page
- [x] Profile page example

### 🔄 To Be Implemented

- [ ] Token refresh logic
- [ ] Session timeout handling
- [ ] Remember me functionality
- [ ] Password reset (if needed)
- [ ] Email verification (if needed)
- [ ] Social login (Facebook, Apple)
- [ ] Two-factor authentication
- [ ] Account deletion
- [ ] OAuth code exchange backend

## Security Considerations

### Current Implementation

1. **Token Storage**: Tokens stored in localStorage via Zustand persist
2. **Auto Phone Format**: Automatically adds +91 country code
3. **OTP Validation**: 6-digit numeric validation
4. **Role Validation**: Client-side role checks
5. **Protected Routes**: Automatic redirect for unauthorized access

### Recommended Improvements

1. **httpOnly Cookies**: Move token storage to httpOnly cookies
2. **CSRF Protection**: Implement CSRF tokens
3. **Rate Limiting**: Add rate limiting for OTP requests
4. **Token Expiry**: Implement automatic token refresh
5. **Backend Validation**: Always validate roles on backend
6. **HTTPS Only**: Ensure all auth endpoints use HTTPS
7. **Session Timeout**: Implement automatic logout after inactivity

## Environment Variables

Create a `.env.local` file:

```env
# Auth Configuration
NEXT_PUBLIC_AUTH_API_URL=https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth
NEXT_PUBLIC_COGNITO_CLIENT_ID=24vle4l58riamcdce2lh1imn35
NEXT_PUBLIC_COGNITO_DOMAIN=exaltride-auth.auth.ap-south-1.amazoncognito.com

# OAuth Redirect (update for production)
NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
```

## Testing

### Manual Testing Checklist

- [ ] Login with phone number
- [ ] Receive OTP on WhatsApp
- [ ] Verify OTP successfully
- [ ] User data persists after refresh
- [ ] Logout clears auth state
- [ ] Signup new user
- [ ] Google SSO redirect works
- [ ] Protected routes redirect when not authenticated
- [ ] User menu displays correctly
- [ ] Role-based access works
- [ ] Error messages display properly

### Test Credentials

Use your own phone number for testing. OTP will be sent to WhatsApp.

## Troubleshooting

### OTP Not Received
- Check phone number format (+91XXXXXXXXXX)
- Verify WhatsApp is installed and active
- Check backend logs for errors

### Login Not Persisting
- Check browser localStorage
- Verify Zustand persist middleware is working
- Check for console errors

### Google SSO Not Working
- Verify redirect URI is configured in Cognito
- Check client ID is correct
- Ensure OAuth callback page exists

### TypeScript Errors
- Run `npm run typecheck` to see all errors
- Some route errors are expected (pages not created yet)
- Import errors should resolve after all files are created

## Next Steps

1. **Update OAuth Redirect URLs**
   - Change from Postman to production domain
   - Configure in AWS Cognito console

2. **Implement Token Refresh**
   - Add refresh token endpoint
   - Implement automatic token refresh

3. **Create Additional Pages**
   - Orders page
   - Wishlist page
   - Settings page
   - Admin dashboard

4. **Add Backend Integration**
   - Implement OAuth code exchange
   - Add protected API endpoints
   - Implement role validation

5. **Enhance Security**
   - Move to httpOnly cookies
   - Add CSRF protection
   - Implement rate limiting

## Support

For issues or questions:
1. Check API_INTEGRATION.md for API details
2. Review this guide for implementation details
3. Check console for error messages
4. Verify network requests in browser DevTools
