# Authentication Testing Guide

## 🧪 Manual Testing Checklist

### Prerequisites
- [ ] Development server running (`npm run dev`)
- [ ] Valid phone number with WhatsApp installed
- [ ] Browser with localStorage enabled

---

## Test 1: Phone OTP Login (Existing User)

### Steps
1. Open http://localhost:3000
2. Click the **user icon** in the header (top right)
3. Auth dialog should open with login form
4. Enter your phone number in format: `+91XXXXXXXXXX` or `XXXXXXXXXX`
5. Click **"Send OTP"** button
6. Check WhatsApp for OTP message
7. Enter the 6-digit OTP in the form
8. Click **"Verify OTP"**

### Expected Results
- ✅ Dialog opens smoothly
- ✅ Phone number validates correctly
- ✅ Loading spinner shows while sending OTP
- ✅ OTP form appears after successful send
- ✅ OTP received on WhatsApp
- ✅ OTP inputs auto-focus and advance
- ✅ After verification, dialog closes
- ✅ User icon changes to avatar with initial
- ✅ User menu appears when clicking avatar

### Error Cases to Test
- ❌ Invalid phone number format → Shows error
- ❌ Wrong OTP → Shows error message
- ❌ Network error → Shows error message

---

## Test 2: New User Signup

### Steps
1. Open http://localhost:3000
2. Click the **user icon** in header
3. Click **"Sign up"** link at bottom
4. Fill in the form:
   - Name: Your full name
   - Phone: +91XXXXXXXXXX
   - Role: Select "Buyer"
5. Click **"Sign Up"** button
6. Check WhatsApp for OTP
7. Enter the 6-digit OTP
8. Click **"Verify OTP"**

### Expected Results
- ✅ Signup form displays correctly
- ✅ All fields validate properly
- ✅ Role dropdown works
- ✅ OTP sent to WhatsApp
- ✅ After verification, user is logged in
- ✅ User data stored correctly

### Error Cases to Test
- ❌ Empty name → Shows validation error
- ❌ Invalid phone → Shows validation error
- ❌ Duplicate phone number → Shows error from API

---

## Test 3: Google SSO

### Steps
1. Open http://localhost:3000
2. Click the **user icon** in header
3. Click **"Login with Google"** button
4. Should redirect to Google OAuth page

### Expected Results
- ✅ Redirects to Cognito OAuth URL
- ✅ URL contains correct parameters
- ⚠️ Note: Full OAuth flow requires backend implementation

### Current Status
- Redirect works ✅
- OAuth code exchange needs backend implementation 🔄

---

## Test 4: User Menu & Navigation

### Prerequisites
- User must be logged in

### Steps
1. Click on user **avatar** (top right)
2. Dropdown menu should appear
3. Verify menu items:
   - User name and phone displayed
   - Profile link
   - My Orders link
   - Wishlist link
   - Settings link
   - Logout button
4. Click **"Profile"**
5. Should navigate to `/profile` page

### Expected Results
- ✅ Menu opens on click
- ✅ User info displays correctly
- ✅ All menu items present
- ✅ Profile page loads
- ✅ User data shown on profile page

---

## Test 5: Protected Routes

### Test 5a: Without Authentication

1. **Logout** if logged in (click avatar → Logout)
2. Try to visit these URLs directly:
   - http://localhost:3000/profile
   - http://localhost:3000/orders
   - http://localhost:3000/wishlist
   - http://localhost:3000/settings

### Expected Results
- ✅ Redirected to home page
- ✅ Not able to access protected pages

### Test 5b: With Authentication

1. **Login** first
2. Visit the same URLs:
   - http://localhost:3000/profile
   - http://localhost:3000/orders
   - http://localhost:3000/wishlist
   - http://localhost:3000/settings

### Expected Results
- ✅ All pages accessible
- ✅ User data displays on profile
- ✅ Placeholder content shows on other pages

---

## Test 6: Session Persistence

### Steps
1. Login to the application
2. **Refresh the page** (F5 or Cmd+R)
3. Check if still logged in
4. **Close the browser tab**
5. **Open a new tab** to http://localhost:3000
6. Check if still logged in

### Expected Results
- ✅ User stays logged in after refresh
- ✅ User stays logged in in new tab
- ✅ Auth state persists in localStorage

---

## Test 7: Logout

### Steps
1. Ensure you're logged in
2. Click **user avatar**
3. Click **"Logout"**

### Expected Results
- ✅ User menu closes
- ✅ Avatar changes back to user icon
- ✅ Redirected to home page
- ✅ Cannot access protected routes
- ✅ localStorage cleared

---

## Test 8: Mobile Responsiveness

### Steps
1. Open browser DevTools (F12)
2. Toggle device toolbar (mobile view)
3. Test on different screen sizes:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)

### Test on Mobile
1. Click **hamburger menu** (top left)
2. Mobile menu should slide in
3. Click **"Login / Sign Up"**
4. Complete login flow
5. After login, check mobile menu again

### Expected Results
- ✅ Auth dialog responsive
- ✅ Forms work on mobile
- ✅ OTP inputs work on mobile
- ✅ User menu accessible on mobile
- ✅ All buttons clickable

---

## Test 9: OTP Input Features

### Steps
1. Start login flow to get to OTP form
2. Test these features:

#### Auto-Focus
- First input should be focused automatically

#### Auto-Advance
- Type a digit → cursor moves to next input

#### Backspace Navigation
- Press backspace on empty input → moves to previous

#### Paste Support
- Copy 6-digit OTP
- Click first input
- Paste (Cmd+V / Ctrl+V)
- All 6 digits should fill

### Expected Results
- ✅ Auto-focus works
- ✅ Auto-advance works
- ✅ Backspace navigation works
- ✅ Paste fills all inputs

---

## Test 10: Error Handling

### Test Various Errors

1. **Network Error**
   - Turn off internet
   - Try to login
   - Should show error message

2. **Invalid Phone**
   - Enter: "123"
   - Should show validation error

3. **Wrong OTP**
   - Enter incorrect OTP
   - Should show error message
   - Inputs should clear
   - Focus should return to first input

4. **API Error**
   - Use invalid phone format
   - Should handle API error gracefully

### Expected Results
- ✅ All errors display user-friendly messages
- ✅ No crashes or blank screens
- ✅ User can retry after error

---

## Test 11: Role-Based Access

### Test Different Roles

1. **Signup as Buyer**
   - Create account with role: "Buyer"
   - Login and verify

2. **Signup as Vendor**
   - Create account with role: "Vendor"
   - Login and verify

3. **Signup as Admin**
   - Create account with role: "Admin"
   - Login and verify

### Expected Results
- ✅ Role saved correctly
- ✅ Role displayed in user menu
- ✅ Role shown on profile page

---

## Test 12: Multiple Browser Sessions

### Steps
1. Login in **Chrome**
2. Open **Firefox** (or another browser)
3. Visit the same URL
4. Check if logged in

### Expected Results
- ✅ Each browser has independent session
- ❌ Not logged in automatically in other browser (expected)

---

## Browser Compatibility Testing

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Performance Testing

### Check These Metrics

1. **Dialog Open Speed**
   - Should open instantly

2. **API Response Time**
   - Login: < 2 seconds
   - OTP verify: < 2 seconds

3. **Page Load with Auth**
   - Protected pages should load quickly

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all form inputs
- [ ] Enter key submits forms
- [ ] Escape key closes dialog
- [ ] Arrow keys work in OTP inputs

### Screen Reader
- [ ] Form labels are read correctly
- [ ] Error messages are announced
- [ ] Button purposes are clear

---

## Developer Testing

### Console Checks

1. Open browser console (F12)
2. Check for:
   - ❌ No errors in console
   - ❌ No warnings (except expected ones)
   - ✅ API calls successful

### Network Tab

1. Open Network tab
2. Login and check:
   - ✅ POST /auth/login returns 200
   - ✅ POST /auth/verify-otp returns 200
   - ✅ Response contains expected data

### Application Tab

1. Open Application tab
2. Check localStorage:
   - ✅ `auth-storage` key exists
   - ✅ Contains user and tokens
   - ✅ Cleared after logout

---

## Integration Testing

### Test with Cart
1. Login
2. Add items to cart
3. Logout
4. Login again
5. Cart should persist

### Test with Products
1. Browse products while logged out
2. Login
3. Should stay on same page
4. Continue browsing

---

## Common Issues & Solutions

### Issue: OTP Not Received
**Solution:**
- Verify phone number format
- Check WhatsApp is active
- Wait 30 seconds
- Try again

### Issue: Login Not Persisting
**Solution:**
- Check browser localStorage is enabled
- Clear cache and cookies
- Try incognito mode

### Issue: Dialog Not Opening
**Solution:**
- Check console for errors
- Verify all components imported
- Refresh page

### Issue: Protected Route Not Working
**Solution:**
- Verify you're logged in
- Check localStorage has auth data
- Clear cache and login again

---

## Test Report Template

```markdown
## Test Session Report

**Date:** [Date]
**Tester:** [Name]
**Browser:** [Browser + Version]
**Device:** [Desktop/Mobile]

### Tests Passed
- [ ] Phone OTP Login
- [ ] User Signup
- [ ] Google SSO Redirect
- [ ] User Menu
- [ ] Protected Routes
- [ ] Session Persistence
- [ ] Logout
- [ ] Mobile Responsive
- [ ] OTP Input Features
- [ ] Error Handling

### Issues Found
1. [Issue description]
2. [Issue description]

### Notes
[Any additional observations]
```

---

## Automated Testing (Future)

### Recommended Test Framework
- **E2E Testing:** Playwright or Cypress
- **Unit Testing:** Jest + React Testing Library
- **API Testing:** Supertest

### Test Coverage Goals
- [ ] 80%+ component coverage
- [ ] All user flows covered
- [ ] Error scenarios tested
- [ ] Edge cases handled

---

## Success Criteria

All tests should pass with:
- ✅ No console errors
- ✅ Smooth user experience
- ✅ Fast response times
- ✅ Proper error handling
- ✅ Mobile responsive
- ✅ Accessible
- ✅ Secure

---

**Happy Testing!** 🧪

If you find any issues, check the implementation files or consult the documentation.
