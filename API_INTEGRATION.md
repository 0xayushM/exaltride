# API Integration Summary

## Overview
Successfully integrated all external API endpoints from AWS API Gateway into the ExaltRide application, replacing local JSON file data sources with live API calls.

## API Base URL
```
https://vais35g209.execute-api.ap-south-1.amazonaws.com/prod/v1
```

## Implemented API Services

### 1. Products API (`/lib/api/products.ts`)

#### Core Endpoints
- **GET /products** - Fetch products with pagination
  - Function: `fetchProducts(params?: { limit, offset, category })`
  - Function: `fetchAllProducts()` - Fetches all products with automatic pagination

- **GET /products/[slug]** - Fetch single product by slug
  - Function: `fetchProductBySlug(slug: string)`

#### Specialized Product Endpoints
- **GET /products/featured** - Featured products
  - Function: `fetchFeaturedProducts(limit: number = 12)`

- **GET /products/best-rated** - Highest rated products
  - Function: `fetchBestRatedProducts(limit: number = 12)`

- **GET /products/new-arrivals** - Recently added products
  - Function: `fetchNewArrivals(limit: number = 12)`

- **GET /products/best-selling** - Top selling products
  - Function: `fetchBestSellingProducts(limit: number = 12)`

- **GET /products/top-deals** - Products with best discounts
  - Function: `fetchTopDeals(limit: number = 12)`

- **GET /products/[slug]/related** - Related products for a specific product
  - Function: `fetchRelatedProducts(slug: string, limit: number = 4)`

#### Helper Functions
- `fetchProductsByCategory(category: string)` - Filter products by category

### 2. Categories API (`/lib/api/categories.ts`)

#### Endpoints
- **GET /categories** - Fetch all categories
  - Function: `fetchCategories()`

- **GET /category/[slug]** - Fetch single category by slug
  - Function: `fetchCategoryBySlug(slug: string)`

#### Helper Functions
- `fetchTopLevelCategories()` - Get only top-level categories (level 0)
- `fetchSubcategories(parentId: string)` - Get subcategories for a parent

### 3. Brands API (`/lib/api/brands.ts`)

#### Endpoints
- **GET /brands** - Fetch all brands
  - Function: `fetchBrands()`

- **GET /brands/[slug]/products** - Fetch products for a specific brand
  - Function: `fetchBrandProducts(brandSlug: string, params?: { limit, offset })`
  - Function: `fetchAllBrandProducts(brandSlug: string)` - Fetch all products with pagination

## Data Schemas

### Product Schema
```typescript
{
  id: string;
  slug: string;
  title: string;
  primary_image: string;
  price: number;
  compare_at_price?: number | null;
  discount_percentage?: number | null;
  rating: number;
  review_count: number;
  in_stock: boolean;
  brand_name: string;
  // Additional optional fields
  category_id?: string;
  description?: string;
  stock?: number;
  status?: string;
  // ... more fields
}
```

### Category Schema
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  image?: string | null;
  parent_id?: string | null;
  level?: number;
  item_count?: number;
}
```

### Brand Schema
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  logo?: string | null;
  website?: string | null;
  product_count?: number;
}
```

## Updated Components

### Pages
1. **Home Page** (`/app/page.tsx`)
   - Uses `fetchFeaturedProducts()`, `fetchTopDeals()`, `fetchBestRatedProducts()`, `fetchNewArrivals()`
   - Parallel fetching with `Promise.all()` for optimal performance

2. **Products Page** (`/app/products/page.tsx`)
   - Server component that fetches all products
   - Passes data to client component `ProductsContent`

3. **Category Page** (`/app/categories/[slug]/page.tsx`)
   - Uses `fetchCategoryBySlug()` and `fetchSubcategories()`
   - Fetches products and filters by category

### Home Components
1. **FeaturedProducts** - Displays featured products
2. **TopDealsSection** - Shows products with discounts
3. **TrendingSection** - Displays new arrivals
4. **RecommendationsSection** - Shows best-rated products
5. **CategoriesSection** - Uses products for category images

## Caching Strategy

All API calls use Next.js ISR (Incremental Static Regeneration):
- **Products**: 60 seconds revalidation
- **Categories**: 300 seconds (5 minutes) revalidation
- **Brands**: 300 seconds (5 minutes) revalidation

Example:
```typescript
fetch(url, {
  next: { revalidate: 60 }
})
```

## Error Handling

All API functions include:
- Try-catch blocks
- Console error logging
- Graceful fallbacks (empty arrays or null)
- Zod schema validation for type safety

Example:
```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed: ${response.statusText}`);
  }
  const data = await response.json();
  const validated = Schema.parse(data);
  return validated;
} catch (error) {
  console.error("Error:", error);
  return [];
}
```

## Type Safety

- All API responses are validated using Zod schemas
- TypeScript interfaces ensure type safety throughout the app
- API types are transformed to match application's Product interface

## Performance Optimizations

1. **Parallel Fetching**: Multiple API calls made simultaneously using `Promise.all()`
2. **Pagination**: Automatic pagination handling for large datasets
3. **ISR Caching**: Reduces API calls and improves response times
4. **Safety Limits**: Maximum offset limits prevent infinite loops

## Migration Notes

### Removed
- Direct imports from `/data/*.json` files
- Mock data functions in `/lib/products.ts`

### Added
- `/lib/api/products.ts` - Complete products API service
- `/lib/api/categories.ts` - Categories API service
- `/lib/api/brands.ts` - Brands API service
- `/components/products/ProductsContent.tsx` - Client component for products page

### Modified
- All home page sections to accept products as props
- Category page to use API endpoints
- Products page converted to server component pattern

## Testing Checklist

- [ ] Home page loads with featured products
- [ ] Top deals section shows discounted products
- [ ] Trending section displays new arrivals
- [ ] Category pages load correctly
- [ ] Product filtering works
- [ ] Pagination functions properly
- [ ] Error states handled gracefully
- [ ] Loading states display correctly

## Authentication APIs

### Base URL
```
https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev/auth
```

### Authentication Flow

The application supports two authentication methods:
1. **SSO (Google OAuth)** - via AWS Cognito
2. **Phone OTP Authentication** - via custom API endpoints

---

### 1. SSO Authentication (Google OAuth)

#### OAuth Authorization URL
```
https://exaltride-auth.auth.ap-south-1.amazoncognito.com/oauth2/authorize
```

#### Parameters
- `client_id`: `24vle4l58riamcdce2lh1imn35`
- `response_type`: `code`
- `scope`: `email openid profile`
- `redirect_uri`: OAuth callback URL (currently set to Postman: `https://oauth.pstmn.io/v1/callback`)
- `identity_provider`: `Google`

#### Full SSO URL
```
https://exaltride-auth.auth.ap-south-1.amazoncognito.com/oauth2/authorize?client_id=24vle4l58riamcdce2lh1imn35&response_type=code&scope=email+openid+profile&redirect_uri=https://oauth.pstmn.io/v1/callback&identity_provider=Google
```

#### Notes
- Currently configured with Postman redirect URL for testing
- Need to update `redirect_uri` to production URL before deployment
- Logout URL also needs to be configured for production

---

### 2. Phone OTP Authentication

#### 2.1 Signup Endpoint

**POST** `/auth/signup`

**Request Body:**
```json
{
  "phoneNumber": "+91XXXXXXXXXX",
  "name": "User Name",
  "role": "buyer" | "vendor" | "admin"
}
```

**Parameters:**
- `phoneNumber` (string, required): Phone number with country code (e.g., "+91XXXXXXXXXX")
- `name` (string, required): User's full name
- `role` (string, required): User role - one of:
  - `"buyer"` - Regular customer
  - `"vendor"` - Seller/merchant
  - `"admin"` - Administrator

**Response:**
```json
{
  "message": "Signup successful",
  "session": "session-token-string"
}
```

---

#### 2.2 Login Endpoint

**POST** `/auth/login`

**Request Body:**
```json
{
  "phoneNumber": "+91XXXXXXXXXX"
}
```

**Parameters:**
- `phoneNumber` (string, required): Phone number with country code

**Response:**
```json
{
  "message": "OTP sent",
  "session": "session-token-string"
}
```

**Notes:**
- OTP will be sent to the user's WhatsApp
- Session token must be stored and used in the verify-otp call

---

#### 2.3 Verify OTP Endpoint

**POST** `/auth/verify-otp`

**Request Body:**
```json
{
  "phoneNumber": "+91XXXXXXXXXX",
  "session": "session-token-from-login",
  "otp": "XXXXXX"
}
```

**Parameters:**
- `phoneNumber` (string, required): Phone number with country code
- `session` (string, required): Session token received from login API
- `otp` (string, required): 6-digit OTP received on WhatsApp

**Response:**
```json
{
  "message": "Authentication successful",
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": "user-id",
    "phoneNumber": "+91XXXXXXXXXX",
    "name": "User Name",
    "role": "buyer"
  }
}
```

---

### Authentication Flow Diagram

#### Phone OTP Flow:
```
1. User enters phone number
   ↓
2. POST /auth/login { phoneNumber }
   ↓
3. Receive session token + OTP sent to WhatsApp
   ↓
4. User enters OTP
   ↓
5. POST /auth/verify-otp { phoneNumber, session, otp }
   ↓
6. Receive access token + user data
   ↓
7. Store tokens and authenticate user
```

#### SSO Flow:
```
1. User clicks "Login with Google"
   ↓
2. Redirect to Cognito OAuth URL
   ↓
3. User authenticates with Google
   ↓
4. Cognito redirects to callback URL with auth code
   ↓
5. Exchange code for tokens
   ↓
6. Store tokens and authenticate user
```

---

### Implementation Checklist

- [ ] Create auth service module (`/lib/api/auth.ts`)
- [ ] Implement signup function
- [ ] Implement login function
- [ ] Implement OTP verification function
- [ ] Implement SSO OAuth flow
- [ ] Create auth context/provider for state management
- [ ] Build login/signup UI components
- [ ] Add OTP input component
- [ ] Implement token storage (localStorage/cookies)
- [ ] Add auth middleware for protected routes
- [ ] Update redirect URLs from Postman to production
- [ ] Configure logout URLs
- [ ] Add error handling for auth failures
- [ ] Implement token refresh logic
- [ ] Add role-based access control

---

### Security Considerations

1. **Token Storage**: Store JWT tokens securely (httpOnly cookies recommended)
2. **HTTPS Only**: All auth endpoints must use HTTPS
3. **Session Management**: Implement proper session timeout
4. **OTP Security**: 
   - Limit OTP attempts
   - Implement rate limiting
   - OTP should expire after a short duration
5. **Role Validation**: Validate user roles on backend for protected actions
6. **Redirect URI**: Update from Postman URL to production domain before launch

---

## Future Enhancements

1. Add search functionality using products API
2. Implement brand pages using brands API
3. Add product detail pages with related products
4. Implement wishlist using product endpoints
5. Add filters for best-rated and best-selling products
6. Optimize with React Query or SWR for client-side caching
7. Implement complete authentication system with SSO and OTP
8. Add user profile management
9. Implement role-based dashboards (buyer/vendor/admin)

## Notes

- All JSON data files in `/data/` are now deprecated but kept for reference
- The API returns data in a consistent format with `{ data: [], meta: {} }` structure
- Product images use the `primary_image` field from the API
- Discount percentages are converted from strings to numbers
- Authentication APIs use a different base URL than product/category APIs
- OTP is delivered via WhatsApp, not SMS
