# Authentication Quick Start Guide

## 🚀 Getting Started

The authentication system is now fully integrated into your ExaltRide application!

## ✅ What's Been Implemented

### 1. **Authentication Methods**
- ✅ Phone OTP (via WhatsApp)
- ✅ Google SSO (via AWS Cognito)

### 2. **User Roles**
- ✅ Buyer (Customer)
- ✅ Vendor (Seller)
- ✅ Admin

### 3. **UI Components**
- ✅ Login/Signup Dialog
- ✅ OTP Verification Form
- ✅ User Menu Dropdown
- ✅ Protected Routes

### 4. **Pages Created**
- ✅ `/profile` - User profile page
- ✅ `/orders` - Order history (placeholder)
- ✅ `/wishlist` - Saved items (placeholder)
- ✅ `/settings` - Account settings (placeholder)
- ✅ `/auth/callback` - OAuth callback handler

## 🎯 How to Use

### For Users

1. **Login**
   - Click the user icon in the header
   - Enter your phone number (+91XXXXXXXXXX)
   - Receive OTP on WhatsApp
   - Enter the 6-digit OTP
   - You're logged in! ✓

2. **Sign Up**
   - Click "Sign up" in the login dialog
   - Enter your name, phone number, and select role
   - Receive OTP on WhatsApp
   - Enter the OTP
   - Account created! ✓

3. **Google Login**
   - Click "Login with Google"
   - Authenticate with your Google account
   - You're logged in! ✓

### For Developers

#### 1. Check Authentication Status

```typescript
import { useAuth } from "@/lib/hooks/useAuth";

function MyComponent() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    console.log(`Welcome ${user.name}!`);
  }
}
```

#### 2. Protect a Route

```typescript
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function MyPage() {
  return (
    <ProtectedRoute>
      <YourContent />
    </ProtectedRoute>
  );
}
```

#### 3. Make Authenticated API Calls

```typescript
import { useAuth } from "@/lib/hooks/useAuth";

async function fetchData() {
  const { getAuthHeader } = useAuth();

  const response = await fetch("/api/data", {
    headers: getAuthHeader(),
  });
}
```

#### 4. Check User Role

```typescript
import { useAuth } from "@/lib/hooks/useAuth";

function AdminFeature() {
  const { isRole } = useAuth();

  if (!isRole("admin")) {
    return <div>Access denied</div>;
  }

  return <div>Admin content</div>;
}
```

## 📁 File Structure

```
lib/
├── api/
│   └── auth.ts              # Auth API calls
├── stores/
│   └── auth-store.ts        # Zustand auth store
├── hooks/
│   └── useAuth.ts           # Auth hook
└── types/
    └── auth.ts              # TypeScript types

components/
└── auth/
    ├── AuthDialog.tsx       # Main auth modal
    ├── LoginForm.tsx        # Login form
    ├── SignupForm.tsx       # Signup form
    ├── OtpForm.tsx          # OTP verification
    ├── UserMenu.tsx         # User dropdown menu
    └── ProtectedRoute.tsx   # Route protection HOC

app/
├── auth/
│   └── callback/
│       └── page.tsx         # OAuth callback
├── profile/
│   └── page.tsx            # User profile
├── orders/
│   └── page.tsx            # Orders page
├── wishlist/
│   └── page.tsx            # Wishlist page
└── settings/
    └── page.tsx            # Settings page
```

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env.local`:

```env
NEXT_PUBLIC_AUTH_API_URL=https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth
NEXT_PUBLIC_COGNITO_CLIENT_ID=24vle4l58riamcdce2lh1imn35
NEXT_PUBLIC_COGNITO_DOMAIN=exaltride-auth.auth.ap-south-1.amazoncognito.com
NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
```

## 🧪 Testing

### Test the Login Flow

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Click the user icon in the header
4. Enter your phone number
5. Check WhatsApp for OTP
6. Enter OTP and verify

### Test Protected Routes

1. Without logging in, try to visit `/profile`
2. You should be redirected to home
3. Log in first
4. Now visit `/profile` - you should see your profile

## 🎨 UI Features

### Login Dialog
- Phone number validation
- Google SSO button
- Switch between login/signup
- Error handling
- Loading states

### OTP Form
- 6-digit input with auto-focus
- Paste support
- Auto-advance to next digit
- Backspace navigation
- Resend OTP option

### User Menu
- User avatar with initial
- Profile link
- Orders link
- Wishlist link
- Settings link
- Logout button

## 🔐 Security Notes

### Current Implementation
- ✅ Tokens stored in localStorage (via Zustand)
- ✅ Client-side route protection
- ✅ Phone number validation
- ✅ OTP validation

### Production Recommendations
- 🔄 Move tokens to httpOnly cookies
- 🔄 Implement token refresh
- 🔄 Add CSRF protection
- 🔄 Rate limit OTP requests
- 🔄 Add session timeout
- 🔄 Backend role validation

## 📝 API Endpoints

All endpoints use base URL:
```
https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth
```

- `POST /signup` - Create new account
- `POST /login` - Send OTP to phone
- `POST /verify-otp` - Verify OTP and login

## 🐛 Troubleshooting

### OTP Not Received
- Verify phone number format: +91XXXXXXXXXX
- Check WhatsApp is active
- Wait 30 seconds and try again

### Login Not Persisting
- Check browser localStorage
- Clear cache and try again
- Check console for errors

### Google SSO Issues
- Verify redirect URI in Cognito
- Check client ID is correct
- Ensure callback page exists

## 📚 Documentation

For detailed documentation, see:
- `AUTH_IMPLEMENTATION.md` - Complete implementation guide
- `API_INTEGRATION.md` - API documentation

## 🎉 Next Steps

1. **Test the authentication flow**
2. **Customize the UI to match your design**
3. **Implement additional protected pages**
4. **Add backend validation**
5. **Configure production OAuth URLs**

## 💡 Tips

- Auth state persists across page refreshes
- User data is stored in Zustand store
- Protected routes auto-redirect
- Role-based access is built-in
- All forms have validation

---

**Ready to go!** The authentication system is fully functional and integrated into your application. Start testing and customize as needed! 🚀
