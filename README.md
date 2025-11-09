# 🛍️ ExaltRide E-Commerce

A high-performance Next.js 16 e-commerce application built with React 19, TypeScript, Tailwind CSS, and Shadcn UI. Features Server Components, Server Actions, ISR, Edge Runtime, and cookie-based cart management.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
exaltride/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── revalidate/          # ISR revalidation endpoint
│   │   └── search/              # Edge runtime search API
│   ├── cart/                    # Shopping cart pages
│   ├── categories/[slug]/       # Category pages (dynamic)
│   ├── checkout/                # Checkout flow
│   ├── products/                # Product pages
│   │   └── [slug]/             # Individual product (SSG)
│   ├── search/                  # Search page (client-side)
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
│
├── components/                   # React Components
│   ├── cart/                    # Cart-related components
│   ├── layout/                  # Layout components (Header, Footer)
│   ├── product/                 # Product components
│   └── ui/                      # Shadcn UI components
│
├── lib/                         # Utilities & Business Logic
│   ├── cart-actions.ts         # Server Actions for cart
│   ├── env.ts                  # Environment validation
│   ├── products.ts             # Product data fetchers
│   ├── search.ts               # Search utilities
│   └── utils.ts                # Helper functions
│
├── public/                      # Static assets
│   └── images/                 # Images
│
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration (generated)
├── tsconfig.json               # TypeScript configuration
├── components.json             # Shadcn UI configuration
└── .prettierrc                 # Prettier configuration
```

---

## 🎨 Styling & Theming

### Colors

Colors are defined in `app/globals.css` using CSS variables with oklch color space. The theme supports both light and dark modes.

#### Changing Colors

1. **Edit the CSS variables in `app/globals.css`:**

```css
:root {
  --background: oklch(1 0 0);           /* Light mode background */
  --foreground: oklch(0.145 0 0);       /* Light mode text */
  --primary: oklch(0.205 0 0);          /* Primary brand color */
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --accent: oklch(0.97 0 0);
  --muted: oklch(0.97 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  /* ... more colors */
}

.dark {
  --background: oklch(0.145 0 0);       /* Dark mode background */
  --foreground: oklch(0.985 0 0);       /* Dark mode text */
  /* ... dark mode overrides */
}
```

2. **Use color utilities in your components:**

```tsx
<div className="bg-primary text-primary-foreground">
  <button className="bg-accent text-accent-foreground hover:bg-accent/90">
    Button
  </button>
</div>
```

#### Available Color Variables

- `background` / `foreground` - Base colors
- `primary` / `primary-foreground` - Primary brand color
- `secondary` / `secondary-foreground` - Secondary actions
- `accent` / `accent-foreground` - Accent highlights
- `muted` / `muted-foreground` - Subtle backgrounds
- `destructive` - Error/delete actions
- `border` - Borders and dividers
- `input` - Form inputs
- `ring` - Focus rings
- `card` / `card-foreground` - Card backgrounds
- `popover` / `popover-foreground` - Popover backgrounds

---

## 🔤 Typography & Fonts

### Current Font: Inter Tight

The project uses **Inter Tight** (Google Fonts) with 400 and 600 weights.

#### Changing Fonts

**Option 1: Google Fonts**

1. **Update `app/layout.tsx`:**

```tsx
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: true,
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

**Option 2: Local/Self-Hosted Fonts**

1. **Add font files to `app/fonts/` directory:**
   ```
   app/fonts/
   ├── CustomFont-Regular.woff2
   ├── CustomFont-Bold.woff2
   ```

2. **Update `app/layout.tsx`:**

```tsx
import localFont from "next/font/local";

const customFont = localFont({
  src: [
    {
      path: "./fonts/CustomFont-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CustomFont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  preload: true,
  display: "swap",
});
```

3. **The font will automatically apply via the `--font-sans` variable in globals.css:**
   ```css
   body {
     font-family: var(--font-sans), system-ui, sans-serif;
   }
   ```

#### Font Utilities

```tsx
// Use default font (inherits from body)
<p className="text-base">Regular text</p>

// Font weights
<h1 className="font-normal">Normal (400)</h1>
<h2 className="font-semibold">Semibold (600)</h2>
<h3 className="font-bold">Bold (700)</h3>

// Font sizes
<p className="text-xs">Extra small</p>
<p className="text-sm">Small</p>
<p className="text-base">Base</p>
<p className="text-lg">Large</p>
<p className="text-xl">Extra large</p>
<p className="text-2xl">2XL</p>
```

---

## 🎯 Component System (Shadcn UI)

### Installed Components

- `button` - Buttons with variants
- `card` - Card containers
- `input` - Form inputs
- `skeleton` - Loading skeletons
- `dropdown-menu` - Dropdown menus
- `dialog` - Modal dialogs
- `badge` - Status badges

### Adding New Shadcn Components

```bash
# Add a single component
pnpm dlx shadcn@latest add [component-name]

# Examples:
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add toast
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add tabs
```

Components will be added to `components/ui/`.

### Using Shadcn Components

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <h2>Title</h2>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button variant="default">Submit</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Ghost</Button>
      </CardContent>
    </Card>
  );
}
```

### Customizing Shadcn Components

All Shadcn components are in `components/ui/` and can be edited directly. They use the color variables from `globals.css`.

---

## 📄 Adding Pages

### Static Pages

Create a new file in the `app/` directory:

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="text-4xl font-bold">About Us</h1>
      <p className="mt-4">Welcome to our store...</p>
    </div>
  );
}
```

Accessible at: `http://localhost:3000/about`

### Dynamic Pages

Create a folder with `[param]` syntax:

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  return (
    <article>
      <h1>Blog Post: {slug}</h1>
    </article>
  );
}
```

Accessible at: `http://localhost:3000/blog/any-slug-here`

### Pages with ISR (Incremental Static Regeneration)

```tsx
// app/products/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProductsPage() {
  const products = await fetchProducts();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🧩 Adding Components

### Where to Add Components

**Server Components (Default):**
- Location: `components/` directory
- No `"use client"` directive needed
- Can fetch data directly
- Examples: `ProductCard`, `Header`, `CartBadge`

```tsx
// components/features/ProductGrid.tsx
import { getProducts } from "@/lib/products";

export async function ProductGrid() {
  const products = await getProducts();
  
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

**Client Components:**
- Add `"use client"` at the top
- Use when you need: hooks, event handlers, browser APIs
- Keep them small and focused
- Examples: `AddToCart`, `SearchBar`, form handlers

```tsx
// components/forms/NewsletterForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
```

### Component Organization

```
components/
├── layout/              # Layout components (Header, Footer, Nav)
├── product/             # Product-related components
├── cart/                # Cart-related components
├── forms/               # Form components (new directory)
├── features/            # Feature-specific components (new)
└── ui/                  # Shadcn UI components (don't modify structure)
```

### Best Practices

1. **Keep Server Components by default** - Only use `"use client"` when necessary
2. **One component per file** - Makes imports cleaner
3. **Use TypeScript** - Always define prop types
4. **Co-locate with features** - Group related components together

```tsx
// Good: TypeScript props
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return <div>{product.name}</div>;
}
```

---

## 🔄 Server Actions

Server Actions are used for form submissions and mutations (like cart operations).

### Creating Server Actions

Location: `lib/` directory with `"use server"` directive

```tsx
// lib/newsletter-actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email
    if (!email.includes("@")) {
      return { success: false, message: "Invalid email" };
    }
    
    // Save to database
    await db.newsletter.create({ email });
    
    // Revalidate if needed
    revalidatePath("/");
    
    return { success: true, message: "Subscribed successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to subscribe" };
  }
}
```

### Using Server Actions

```tsx
// components/forms/NewsletterForm.tsx
"use client";

import { useTransition } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter-actions";

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    
    startTransition(async () => {
      const result = await subscribeToNewsletter(email);
      alert(result.message);
    });
  };
  
  return (
    <form action={handleSubmit}>
      <input name="email" type="email" required />
      <button disabled={isPending}>
        {isPending ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
```

---

## 🛒 Cart System

The cart uses **Server Actions** with **cookie-based storage** (no auth required).

### Cart Functions

```tsx
import { 
  addToCart, 
  removeFromCart, 
  updateCartQuantity,
  getCartItems,
  getCartCount,
  clearCart 
} from "@/lib/cart-actions";

// Add item
await addToCart(productId, name, price, image, quantity);

// Remove item
await removeFromCart(productId);

// Update quantity
await updateCartQuantity(productId, newQuantity);

// Get cart (Server Component)
const items = await getCartItems();

// Get count (Server Component - for badge)
const count = await getCartCount();
```

### Adding to Cart (Client Component)

```tsx
"use client";

import { useTransition } from "react";
import { addToCart } from "@/lib/cart-actions";
import { Button } from "@/components/ui/button";

export function AddToCartButton({ product }) {
  const [isPending, startTransition] = useTransition();
  
  const handleAdd = () => {
    startTransition(async () => {
      await addToCart(
        product.id,
        product.name,
        product.price,
        product.image,
        1
      );
    });
  };
  
  return (
    <Button onClick={handleAdd} disabled={isPending}>
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
```

---

## 🔍 Data Fetching

### Server Components (Recommended)

```tsx
// app/products/page.tsx
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  // Fetch directly in Server Component
  const products = await getProducts();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### With ISR

```tsx
export const revalidate = 60; // Seconds

export default async function ProductsPage() {
  const products = await getProducts();
  // ...
}
```

### API Routes (for client-side fetching)

```tsx
// app/api/products/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}
```

Then fetch from client:

```tsx
"use client";

import { useEffect, useState } from "react";

export function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);
  
  return <div>{/* render products */}</div>;
}
```

---

## 🎨 Styling Guide

### Tailwind Classes

```tsx
// Layout
<div className="container mx-auto px-4">        {/* Container */}
<div className="flex items-center justify-between">  {/* Flexbox */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">  {/* Grid */}

// Spacing
<div className="p-4">      {/* Padding all sides */}
<div className="px-4 py-8"> {/* Padding x and y */}
<div className="mt-4 mb-8"> {/* Margin top and bottom */}

// Typography
<h1 className="text-4xl font-bold">Title</h1>
<p className="text-base text-muted-foreground">Description</p>

// Colors
<div className="bg-primary text-primary-foreground">
<button className="bg-accent hover:bg-accent/90">

// Responsive
<div className="text-sm md:text-base lg:text-lg">
<div className="hidden md:block">           {/* Hide on mobile */}
```

### Custom Styles

If you need custom CSS, add it to `app/globals.css`:

```css
@layer components {
  .custom-button {
    @apply px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors;
  }
}
```

Then use: `<button className="custom-button">Click me</button>`

---

## 🔧 Configuration Files

### Environment Variables

Create `.env.local`:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API
NEXT_PUBLIC_API_URL=https://api.example.com

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Revalidation
REVALIDATION_SECRET=your-secret-key

# Stripe (example)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Access in code:

```tsx
import env from "@/lib/env"; // Validated with Zod

const apiUrl = env.NEXT_PUBLIC_API_URL;
```

### Image Domains

Add allowed image domains in `next.config.ts`:

```ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "your-cdn.com",
      pathname: "/images/**",
    },
  ],
},
```

---

## 📦 Dependencies

### Core
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling

### UI & Forms
- **Shadcn UI** - Component library
- **Lucide React** - Icons
- **React Hook Form** - Form management
- **Zod** - Schema validation

### State Management
- **Zustand** - Client state (if needed)

### Dev Tools
- **Prettier** - Code formatting
- **ESLint** - Code linting

---

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel

```bash
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables in Production

Add all variables from `.env.local` to your hosting platform's environment variables section.

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm typecheck` and `pnpm lint`
4. Format code with `pnpm format`
5. Submit a pull request

---

## 📝 License

MIT License - feel free to use this project for your own purposes.
