# Our Products Section Documentation

## Overview

The "Our Products" section is a key component of the Lucky Blinds homepage that showcases featured window covering products. It features an interactive grid layout with product cards and an advanced quick-look modal for detailed product exploration.

## Architecture

### Main Component: `FeaturedProducts`

**File:** `components/featured-products.tsx`

The `FeaturedProducts` component serves as the container and orchestrator for the products section. It handles:

- Product data management
- Modal state (quick-look modal visibility)
- Animation orchestration for staggered card entrance

#### Key Features:

- **Product Data**: Static array of 3 featured products
- **State Management**:
    - `selectedProduct`: Tracks which product's quick-look modal is open
    - `isModalOpen`: Controls modal visibility
- **Animations**: Framer Motion staggered animations for cards

### How It's Rendered

The `FeaturedProducts` component is imported and rendered in `app/page.tsx`:

```tsx
export default function HomePage() {
    return (
        <main className="min-h-screen">
            <Header />
            <HeroSection />
            <FeaturedProducts /> // ← Our Products section
            <MaterialsSection />
            <NewsletterSection />
            <Footer />
        </main>
    );
}
```

## Component Hierarchy

```
FeaturedProducts
├── Section Title & Description (with Reveal animation)
├── Product Grid (with Framer Motion staggered animation)
│   ├── ProductCard (×3)
│   │   ├── Badge (New, Popular, Best Seller, etc.)
│   │   ├── Product Image
│   │   └── Product Info Overlay
│   └── Each card has motion animations on hover
└── QuickLookModal (overlay when opened)
    ├── Image Gallery with navigation
    ├── Product Details
    ├── Material Swatches (color selections)
    ├── Features List
    └── Add to Cart Button
```

## Component Details

### 1. Product Data Structure

Each product in the `featuredProducts` array contains:

```tsx
{
  id: string              // Unique identifier
  name: string            // Product name (e.g., "Classic Roller Blinds")
  price: string           // Price display (e.g., "From $149")
  image: string           // Main product image path
  badge: string           // Badge type: "New" | "Popular" | "Best Seller" | "Smart Home"
  materials: string[]     // Product features/materials list
  swatches: array         // Color options with hex codes
    - name: string        // Color name (e.g., "Pure White")
    - color: string       // Hex color code
  quickLookImages: string[] // Array of product detail images for modal
  dimensions: string      // Dimension info (e.g., "Custom sizes available")
}
```

### 2. ProductCard Component

**File:** `components/product-card.tsx`

Displays individual product in the grid.

**Props:**

- `product`: Product data object
- `onQuickLook`: Callback function when "Quick Look" is triggered

**Features:**

- Badge display with color-coded styling based on product type
- Responsive image container with 25:36 aspect ratio
- Overlay gradient effect for product info
- Product name, materials, and price displayed at bottom
- Smooth opacity animation on load

**Styling:**

- Border radius: 24px
- Shadow: `rgba(0, 0, 0, 0.1) 0px 10px 50px`
- Grid layout: responsive (1 col mobile, 2 col tablet, 3 col desktop)

### 3. QuickLookModal Component

**File:** `components/quick-look-modal.tsx`

Full-screen modal for detailed product exploration.

**Features:**

- **Image Gallery**:
    - Displays product detail images from `quickLookImages` array
    - Navigation arrows for browsing images
    - Thumbnail preview strip below main image

- **Product Details**:
    - Product name, materials, and price
    - Dimensions information
    - Color swatches (interactive, with hover tooltips)

- **Features List**: Placeholder list of product features

- **Add to Cart Button**: Call-to-action button

**Animation:**

- Backdrop blur with smooth fade-in/fade-out
- Modal scales in/out smoothly
- Uses Framer Motion's `AnimatePresence` for smooth unmounting

### 4. Supporting Components

#### Reveal Component

**File:** `components/reveal.tsx`

Provides fade-in animation effect for the section title and cards.

#### BlurPanel Component

**File:** `components/blur-panel.tsx`

Provides frosted glass effect (backdrop blur) to the modal background.

#### Parallax Image Component

**File:** `components/parallax-image.tsx`

Optional parallax scrolling effect (not currently used in products section).

## Current Featured Products

1. **Classic Roller Blinds**
    - Price: From $149
    - Badge: Popular
    - Materials: Light Filtering, Easy Clean Fabric
    - Colors: Pure White, Linen, Charcoal

2. **Faux Wood Venetians**
    - Price: From $199
    - Badge: Best Seller
    - Materials: Moisture Resistant, 2" Slats
    - Colors: White Oak, Espresso, Gray Wash

3. **Motorized Cellular**
    - Price: From $349
    - Badge: Smart Home
    - Materials: Energy Efficient, Cordless Safety
    - Colors: Snow, Champagne, Slate

## Styling & Layout

### CSS Classes Used:

- **Section**: `py-20 lg:py-32` (vertical padding responsive)
- **Container**: `container-custom` (custom container class)
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **Typography**:
    - Heading: `text-4xl lg:text-6xl` with italic "Products" styling
    - Description: `text-lg max-w-2xl`

### Colors Used:

- Badge colors: `clover-600` (Lucky Blinds green) for Popular/New, `amber-500` for Best Seller, `blue-500` for Smart Home
- Text: `foreground` (main text), `muted-foreground` (secondary text)
- White backgrounds with shadow effects

## Animation Details

### Section Title Animation:

- Uses `Reveal` component for fade-in effect

### Product Cards Animation:

- **Entrance**: Staggered animation with 0.3s delay between cards
- **Individual card**:
    - Initial state: opacity 0, translate Y +30px
    - Animated state: opacity 1, translate Y 0
    - Duration: 0.8s with easing `[0.21, 0.47, 0.32, 0.98]`

### Modal Animation:

- Scale: 0.9 → 1
- Opacity: 0 → 1
- Duration: 0.3s
- Easing: `[0.21, 0.47, 0.32, 0.98]` (same as cards)

## Dependencies

### External Libraries:

- **framer-motion**: Animation framework for React
- **next/image**: Optimized image component for Next.js
- **lucide-react**: Icon library (used for navigation arrows and close button)

### Internal Utilities:

- `@/lib/utils`: Contains `cn()` function for class name merging

## Interaction Flow

1. **User views section**: Title and cards fade in with staggered animation
2. **User hovers over card**: Card responds to hover (visual feedback via motion animations)
3. **User clicks "Quick Look" (if button exists)**:
    - `handleQuickLook()` is called with product data
    - Modal state updates: `selectedProduct` is set, `isModalOpen` becomes true
4. **Modal opens**: Quick-look modal displays with product details
5. **User interacts in modal**:
    - Can browse product images using arrows or thumbnails
    - Can select color swatches (visual feedback)
6. **User closes modal**:
    - Click X button or backdrop triggers `closeModal()`
    - Modal state resets

## Adding New Products

To add a new featured product:

1. Add new object to `featuredProducts` array in `featured-products.tsx`
2. Include all required fields (id, name, price, image, badge, materials, swatches, quickLookImages, dimensions)
3. Ensure images exist in `/public` directory
4. Grid will automatically display new product (supports up to any number, but layout is optimized for 3)

## Accessibility Considerations

- Images have alt text for screen readers
- Color swatches have hover tooltips showing color names
- Modal has proper focus management with close button
- Backdrop click closes modal (user-friendly dismiss)

## Performance Optimizations

- Uses Next.js `Image` component with responsive sizes attribute
- Framer Motion uses optimized animations with proper easing functions
- Images are lazy-loaded when using Next.js Image component
- Modal uses `AnimatePresence` for efficient unmounting

## Future Enhancement Opportunities

- Add real "Quick Look" button to product cards
- Integrate with shopping cart system
- Add product filtering or category selection
- Include customer reviews/ratings
- Add "View Full Details" link to dedicated product pages
- Implement wishlist functionality
- Add inventory status display

actual code:
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

const featuredProducts = [
{
id: "1",
name: "Classic Roller Blinds",
price: "From $149",
image: "/elegant-white-roller-blinds-in-modern-living-room-.jpg",
badge: "Popular" as const,
materials: ["Light Filtering", "Easy Clean Fabric"],
swatches: [
{ name: "Pure White", color: "#FFFFFF" },
{ name: "Linen", color: "#E8E4D9" },
{ name: "Charcoal", color: "#36454F" },
],
quickLookImages: [
"/white-roller-blinds-close-up.jpg",
"/roller-blinds-mechanism-detail.jpg",
"/roller-blinds-in-bedroom.jpg",
],
dimensions: "Custom sizes available",
},
{
id: "2",
name: "Faux Wood Venetians",
price: "From $199",
image: "/elegant-faux-wood-venetian-blinds-in-warm-kitchen.jpg",
badge: "Best Seller" as const,
materials: ["Moisture Resistant", '2" Slats'],
swatches: [
{ name: "White Oak", color: "#D4C4A8" },
{ name: "Espresso", color: "#3C2415" },
{ name: "Gray Wash", color: "#9E9E9E" },
],
quickLookImages: [
"/faux-wood-blinds-detail.jpg",
"/venetian-blinds-tilted-open.jpg",
"/faux-wood-blinds-bathroom.jpg",
],
dimensions: "Custom sizes available",
},
{
id: "3",
name: "Motorized Cellular",
price: "From $349",
image: "/modern-motorized-cellular-honeycomb-shades-in-luxu.jpg",
badge: "Smart Home" as const,
materials: ["Energy Efficient", "Cordless Safety"],
swatches: [
{ name: "Snow", color: "#FFFAFA" },
{ name: "Champagne", color: "#F7E7CE" },
{ name: "Slate", color: "#708090" },
],
quickLookImages: [
"/honeycomb-cellular-shade-close-up.jpg",
"/motorized-blinds-remote-control.jpg",
"/cellular-shades-energy-efficient.jpg",
],
dimensions: "Custom sizes available",
},
]

export function FeaturedProducts() {
const [selectedProduct, setSelectedProduct] = useState<any>(null)
const [isModalOpen, setIsModalOpen] = useState(false)

const handleQuickLook = (product: any) => {
setSelectedProduct(product)
setIsModalOpen(true)
}

const closeModal = () => {
setIsModalOpen(false)
setSelectedProduct(null)
}

return (
<section className="py-20 lg:py-32" id="featured-products">
<div className="container-custom">
<Reveal>
<div className="text-left mb-16">
<h2 className="text-4xl text-foreground mb-4 lg:text-6xl">
Our <span className="italic font-light">Products</span>
</h2>
<p className="text-lg text-muted-foreground max-w-2xl">
Discover our most requested window coverings, each crafted for style, durability, and the Okanagan
lifestyle.
</p>
</div>
</Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>

)
}
