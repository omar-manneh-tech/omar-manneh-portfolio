# Modern Portfolio Website - Folder Structure

## Project Organization

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with fonts and metadata
│   │   ├── page.tsx                  # Main homepage component
│   │   └── globals.css               # Global styles with animations
│   │
│   ├── components/
│   │   ├── layout/                   # Layout components
│   │   │   ├── Navbar.tsx            # Modern animated navigation bar
│   │   │   └── Footer.tsx            # Footer component
│   │   │
│   │   └── sections/                 # Page sections
│   │       ├── Hero.tsx              # Hero section with animations
│   │       ├── About.tsx             # About section with stats
│   │       ├── Projects.tsx          # Projects showcase
│   │       ├── Skills.tsx            # Skills with progress bars
│   │       └── Contact.tsx          # Contact form section
│   │
│   └── lib/                          # Utilities (if needed)
│
├── public/
│   └── images/                       # Organized image folders
│       ├── hero/                     # Hero section images
│       ├── about/                     # About section images
│       ├── projects/                  # Project screenshots/thumbnails
│       └── skills/                    # Skills section images
│
├── package.json                       # Dependencies
├── tailwind.config.ts                 # Tailwind configuration
├── next.config.js                    # Next.js configuration
└── tsconfig.json                      # TypeScript configuration
```

## Image Organization

All images are organized by category:

- **`hero/`**: Landing page hero images, backgrounds, graphics
- **`about/`**: Profile pictures, personal photos
- **`projects/`**: Project screenshots, thumbnails, mockups
- **`skills/`**: Icons, logos, technology images

## Components Structure

### Layout Components
- **Navbar**: Sticky navigation with scroll effects, mobile menu, social links
- **Footer**: Footer with copyright and links

### Section Components
- **Hero**: Animated hero section with typing effect, tech icons
- **About**: Personal info, statistics, profile image
- **Projects**: Project cards with hover effects, iframe support, links
- **Skills**: Skill categories with progress bars and icons
- **Contact**: Contact form with social media links

## Features

✅ **Modern Design**: Glassmorphism, gradients, dark theme
✅ **Animations**: Framer Motion for smooth animations
✅ **Icons**: React Icons library (Font Awesome, Simple Icons)
✅ **Responsive**: Mobile-first, fully responsive
✅ **Performance**: Optimized with Next.js Image component
✅ **Accessibility**: Semantic HTML, keyboard navigation
✅ **Interactive**: Hover effects, scroll animations, smooth transitions

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **3D Graphics**: Three.js, React Three Fiber
- **Type Safety**: TypeScript

