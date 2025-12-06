# Authentication Setup Guide

This project uses AWS Cognito for authentication with phone number OTP and Google SSO.

## Environment Variables

Add these to your `.env` or `.env.local` file:

```env
# Cognito Configuration
NEXT_PUBLIC_COGNITO_CLIENT_ID=5u411frjvscpbcksgv4ce5kf5b
COGNITO_CLIENT_SECRET=uqltvu1cr8sgt60pg9c8fmhaacvqmt77op46ut3em7p8igqmde

# SSO Configuration
NEXT_PUBLIC_COGNITO_SSO_CLIENT_ID=24vle4l58riamcdce2lh1imn35
COGNITO_SSO_CLIENT_SECRET=11jhe4jcpokjjca9mskuv79mvnpk0neo8phnq3etgpb2oc8b8hup

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev

# Redirect URLs (update for production)
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback
NEXT_PUBLIC_LOGOUT_URI=http://localhost:3000
```

## Features Implemented

### 1. Phone Number Authentication
- **Signup**: `/auth/signup`
  - User provides: phone number, name, role (buyer/vendor/admin)
  - API: `POST /auth/signup`
  
- **Login**: `/auth/login`
  - User provides: phone number
  - API: `POST /auth/login`
  - Returns: session ID
  - OTP sent via WhatsApp

- **OTP Verification**: 
  - User enters 6-digit OTP
  - API: `POST /auth/verify-otp`
  - Returns: authToken, idToken, refreshToken

### 2. Google SSO
- Click "Sign in with Google" button
- Redirects to Cognito hosted UI
- After authentication, redirects to `/auth/callback`
- Tokens are automatically stored

### 3. Auth Context
The `AuthProvider` wraps the entire app and provides:
- `user`: Current user data
- `isAuthenticated`: Boolean auth status
- `isLoading`: Loading state
- `login(phoneNumber)`: Send OTP
- `signup(phoneNumber, name, role)`: Create account
- `verifyOtp(phoneNumber, session, otp)`: Verify OTP
- `loginWithGoogle()`: Initiate Google SSO
- `logout()`: Clear session
- `refreshUser()`: Refresh user data

### 4. Protected Routes
Use the `ProtectedRoute` component to protect pages:

```tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div>Protected content</div>
    </ProtectedRoute>
  );
}

// With role requirement
export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin only content</div>
    </ProtectedRoute>
  );
}
```

### 5. Using Auth in Components

```tsx
"use client";
import { useAuth } from "@/lib/auth/context";

export default function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Endpoints

### Signup
```
POST https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth/signup
Body: {
  "phoneNumber": "+919876543210",
  "name": "John Doe",
  "role": "buyer" // or "vendor" or "admin"
}
```

### Login (Send OTP)
```
POST https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth/login
Body: {
  "phoneNumber": "+919876543210"
}
Response: {
  "session": "session-id-here"
}
```

### Verify OTP
```
POST https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth/verify-otp
Body: {
  "phoneNumber": "+919876543210",
  "session": "session-id-from-login",
  "otp": "123456"
}
Response: {
  "authToken": "...",
  "idToken": "...",
  "refreshToken": "..."
}
```

### Google SSO
```
GET https://exaltride-auth.auth.ap-south-1.amazoncognito.com/oauth2/authorize
Params:
  - client_id: 24vle4l58riamcdce2lh1imn35
  - response_type: code
  - scope: email openid profile
  - redirect_uri: http://localhost:3000/auth/callback
  - identity_provider: Google
```

## Token Storage

Tokens are stored in localStorage:
- `authToken`: Access token for API requests
- `idToken`: ID token with user info
- `refreshToken`: Refresh token for getting new tokens
- `user`: User profile data

## Header Integration

The header component now shows:
- **Not authenticated**: "Login" button
- **Authenticated**: User name, role, and logout button

## Production Deployment

Before deploying to production:

1. Update redirect URLs in `.env`:
```env
NEXT_PUBLIC_REDIRECT_URI=https://yourdomain.com/auth/callback
NEXT_PUBLIC_LOGOUT_URI=https://yourdomain.com
```

2. Update Cognito settings in AWS Console:
   - Add production domain to allowed callback URLs
   - Add production domain to allowed logout URLs

3. Ensure all environment variables are set in your hosting platform

## Security Notes

- Never commit `.env` or `.env.local` files
- Client secrets should only be used in server-side code
- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Implement token refresh logic for long-lived sessions
- Add CSRF protection for production

## Testing

1. **Phone Auth Flow**:
   - Go to `/auth/signup`
   - Enter phone number with country code (+91...)
   - Enter name and select role
   - Click "Create Account"
   - Enter OTP received on WhatsApp
   - Should redirect to home page

2. **Google SSO**:
   - Go to `/auth/login`
   - Click "Sign in with Google"
   - Complete Google authentication
   - Should redirect back to home page

3. **Logout**:
   - Click logout button in header
   - Should clear session and show login button

## Troubleshooting

- **OTP not received**: Check phone number format (+91XXXXXXXXXX)
- **Google SSO fails**: Verify redirect URI matches Cognito settings
- **Token errors**: Check that client IDs and secrets are correct
- **CORS errors**: Ensure API has proper CORS configuration
