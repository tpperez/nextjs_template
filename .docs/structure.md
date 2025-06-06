# Project Structure

## 📁 Current Template Structure

This is the **real starter template structure** - exactly what you'll find when cloning:

```
/app
├── (routes)/                    # 🗂️ Application routes
│   ├── (auth)/                  # 🔒 Authenticated routes (not implemented yet)
│   │   └── .gitkeep             # Create when adding authentication
│   ├── api/                     # 🔌 API Routes (not implemented yet)
│   │   └── .gitkeep             # Create when adding endpoints
│   └── (public)/                # 🌐 Public routes
│       ├── (home)/              # 🏠 Homepage
│       │   └── page.tsx         # PageHome (uses ViewHome)
│       ├── sample-1/            # 📄 Sample page
│       │   └── page.tsx         # PageSample1 (uses ViewSample1)
│       └── layout.tsx           # Layout for public pages
├── components/                  # 🧩 Reusable components (prepared for use)
│   ├── structure/              # 🏗️ Structural components
│   │   └── .gitkeep            # Empty folder (ready to use)
│   └── ui/                     # 🎨 Interface components
│       └── .gitkeep            # Empty folder (ready to use)
├── constants/                   # 📊 Application constants
│   └── .gitkeep                # Empty folder (ready to use)
├── hooks/                       # 🎣 Custom hooks
│   └── .gitkeep                # Empty folder (ready to use)
├── services/                    # 🔧 Services and APIs
│   └── .gitkeep                # Empty folder (ready to use)
├── stores/                      # 🗃️ State stores
│   └── .gitkeep                # Empty folder (ready to use)
├── styles/                      # 🎨 Global styles
│   └── globals.css              # Global styles (Tailwind CSS)
├── typings/                     # 📝 Global types
│   └── .gitkeep                # Empty folder (ready to use)
├── utils/                       # 🛠️ Utility functions
│   └── .gitkeep                # Empty folder (ready to use)
├── views/                       # 📱 Implemented views
│   ├── home/                   # 🏠 Homepage view
│   │   ├── home.test.tsx       # View tests
│   │   ├── home.tsx            # ViewHome component
│   │   └── index.ts            # Exports
│   └── sample-1/               # 📄 Sample view
│       ├── index.ts            # Exports
│       ├── sample-1.test.tsx   # View tests
│       └── sample-1.tsx        # ViewSample1 component
├── favicon.ico                  # 🌐 Main favicon (App Router)
└── layout.tsx                   # Root application layout

/public/                         # 📁 Static files (empty in template)
└── .gitkeep                     # Temporary file (remove when using)
```

> 📝 **About `.gitkeep` files**: These are conventional files to keep empty folders in Git. Remove them when you start adding real content to the folders.

## 🎯 What's Implemented

- ✅ **2 functional pages** - Home and Sample-1
- ✅ **Basic layout** - Public routes structure
- ✅ **2 complete views** - With tests and exports
- ✅ **Prepared structure** - Organized folders with `.gitkeep`
- ✅ **Complete configurations** - ESLint, Prettier, Jest, Husky
- ✅ **TypeScript configured** - With path aliases (@/)
- ✅ **Tailwind CSS** - With custom configuration
- ⏳ **Empty /public/ folder** - Ready to add assets as needed
- ⏳ **(auth) and api/ routes** - Structure prepared with gitkeep

## 📋 As Your Project Grows

As you develop your project, you can:

1. **Add components** in `/components/ui/` and `/components/structure/`
2. **Create new views** in `/views/your-view-name/`
3. **Implement global stores** in `/stores/` using Zustand (already configured)
4. **Add services** in `/services/` for APIs
5. **Create specific hooks** using `.hook.ts` suffix in views/components as needed
6. **Add global hooks** in `/hooks/` for reusable logic
7. **Organize static files** in `/public/` creating subfolders like `/images/`, `/icons/`, `/documents/`
8. **Remove `.gitkeep`** as you use the folders

---

## 🚀 Complete Structure (Future Reference)

This is an **advanced reference structure** for when the project is more complete while maintaining scalable organization:

```
/app
├── (routes)/                     # 🗂️ All application routes
│   ├── api/                      # 🔌 API Routes (endpoints)
│   │   └── example/
│   │       └── route.ts
│   ├── (auth)/                   # 🔒 Protected routes (with auth)
│   │   ├── sample-3/             # 📄 Protected pages
│   │   │   ├── page.tsx
│   │   │   └── queries.ts        # 🔍 Route queries
│   │   ├── sample-4/
│   │   │   ├── page.tsx
│   │   │   └── queries.ts        # 🔍 Route queries
│   │   └── layout.tsx            # Layout for authenticated routes
│   └── (public)/                 # 🌐 Public routes (no auth)
│       ├── (home)/               # 🏠 Homepage
│       │   ├── error.tsx         # Error UI
│       │   ├── loading.tsx       # Loading UI
│       │   ├── page.tsx          # Main page
│       │   └── queries.ts        # 🔍 Route-specific queries
│       ├── sample-1/             # 📄 Other public pages
│       │   ├── page.tsx
│       │   └── queries.ts        # 🔍 Route queries
│       ├── sample-2/
│       │   ├── page.tsx
│       │   └── queries.ts        # 🔍 Route queries
│       └── layout.tsx            # Layout for public routes
├── components/                   # 🧩 Reusable components
│   ├── structure/                # 🏗️ Structural components
│   │   ├── footer/
│   │   ├── header/
│   │   └── sidebar/
│   └── ui/                       # 🎨 Interface components
│       ├── button/
│       │   ├── button.test.tsx
│       │   ├── button.tsx
│       │   ├── button.type.ts
│       │   ├── button.hook.ts   # 🎣 Specific hook (optional)
│       │   ├── button.const.ts  # 📊 Constants (optional)
│       │   └── index.ts
│       ├── input/
│       └── modal/
├── constants/                    # 📊 Application constants
├── hooks/                        # 🎣 Reusable custom hooks
│   ├── use-api/
│   │   ├── use-api.test.ts
│   │   ├── use-api.ts
│   │   ├── use-api.type.ts
│   │   ├── use-api.const.ts     # 📊 Constants (optional)
│   │   └── index.ts
│   └── use-local-storage/
├── services/                     # 🔧 Services and API integrations
│   ├── auth/
│   │   ├── auth.test.ts
│   │   ├── auth.ts
│   │   ├── auth.type.ts
│   │   ├── auth.hook.ts         # 🎣 Specific hook (optional)
│   │   ├── auth.const.ts        # 📊 Constants (optional)
│   │   └── index.ts
│   └── api/
├── stores/                       # 🗃️ Global states (Zustand)
│   └── user/
│       ├── user.test.ts
│       ├── user.ts
│       ├── user.type.ts
│       ├── user.hook.ts         # 🎣 Specific hook (optional)
│       ├── user.const.ts        # 📊 Constants (optional)
│       └── index.ts
├── styles/                       # 🎨 Global styles and themes
├── typings/                      # 📝 Global type definitions
├── utils/                        # 🛠️ Utility functions
│   └── format-date/
│       ├── format-date.test.ts
│       ├── format-date.ts
│       ├── format-date.type.ts
│       ├── format-date.const.ts # 📊 Constants (optional)
│       └── index.ts
├── views/                        # 📱 Views/page structures
│   ├── home/                     # 🏠 Homepage (public)
│   │   ├── home.test.tsx
│   │   ├── home.tsx
│   │   ├── home.type.ts
│   │   ├── home.hook.ts         # 🎣 Specific hook (optional)
│   │   ├── home.const.ts        # 📊 Constants (optional)
│   │   └── index.ts
│   ├── sample-1/                 # 📄 Sample 1 (public)
│   ├── sample-2/                 # 📄 Sample 2 (public)
│   ├── sample-3/                 # 🔒 Sample 3 (auth)
│   └── sample-4/                 # 🔒 Sample 4 (auth)
├── favicon.ico                   # 🌐 Main favicon (App Router)
└── layout.tsx                    # Root application layout

/public/                          # 📁 Static files (project root)
├── documents/                    # 📄 PDFs, documents for download
├── icons/                        # 🎯 Icons and favicons
├── images/                       # 🖼️ Images (logos, icons, photos)
├── robots.txt                    # 🤖 Crawler instructions
└── sitemap.xml                   # 🗺️ Site map
```

> 💡 **Note**: This is a complete reference structure. The initial template comes with empty folders and `.gitkeep` files that should be removed as you add real content.

## 🏗️ Module Organization

**All project modules** follow the same standard structure, ensuring complete consistency:

### 📁 Standard Module Structure

```
[module-name]/
├── [name].test.tsx              # 🧪 Unit tests
├── [name].tsx                   # 📄 Main file
├── [name].type.ts               # 📝 Specific types
├── [name].hook.ts               # 🎣 Specific hook (optional)
├── [name].const.ts              # 📊 Module constants (optional)
└── index.ts                     # 📤 Export file
```

This structure applies to:

- 🧩 **components/** (button, modal, card)
- 📱 **views/** (home, profile, dashboard)
- 🔧 **services/** (auth, api, payment)
- 🗃️ **stores/** (user, cart, theme)
- 🎣 **hooks/** (use-api, use-debounce)
- 🛠️ **utils/** (format-date, validate)

### 🧩 Component Example

```
button/
├── button.test.tsx              # 🧪 Button tests
├── button.tsx                   # 📄 React component
├── button.type.ts               # 📝 IButtonProps, TButtonVariant
├── button.hook.ts               # 🎣 useButton (optional)
├── button.const.ts              # 📊 BUTTON_VARIANTS, BUTTON_SIZES (optional)
└── index.ts                     # 📤 Exports
```

### 🔧 Service Example

```
auth/
├── auth.test.ts                 # 🧪 Service tests
├── auth.ts                      # 📄 Authentication logic
├── auth.type.ts                 # 📝 IAuthResponse, TAuthStatus
├── auth.hook.ts                 # 🎣 useAuth (optional)
├── auth.const.ts                # 📊 AUTH_ENDPOINTS, TOKEN_EXPIRY (optional)
└── index.ts                     # 📤 Exports
```

### 🗃️ Store Example (Zustand)

```
user/
├── user.test.ts                 # 🧪 Store tests
├── user.ts                      # 📄 Zustand store
├── user.type.ts                 # 📝 IUserState, TUserActions
├── user.hook.ts                 # 🎣 useUserSelector (optional)
├── user.const.ts                # 📊 USER_ROLES, DEFAULT_USER (optional)
└── index.ts                     # 📤 Exports
```

### 📱 View Structure (with internal components)

```
home/
├── components/                  # 🧩 View-internal components
│   └── hero-section/
│       ├── hero-section.test.tsx
│       ├── hero-section.tsx
│       ├── hero-section.hook.ts # 🎣 Specific hook (optional)
│       ├── hero-section.const.ts # 📊 Component constants (optional)
│       └── index.ts
├── home.test.tsx                # 🧪 Unit tests
├── home.tsx                     # 📄 Main view
├── home.type.ts                 # 📝 Specific types
├── home.hook.ts                 # 🎣 Specific hook (optional)
├── home.const.ts                # 📊 View constants (optional)
└── index.ts                     # 📤 Export file
```

## 📋 Optional Files

- `.hook.ts` - For complex or reusable logic within the module
- `.const.ts` - For module-specific constants (e.g., configurations, enums, default values)
- `/components/` - Only in views, for internal components

> 💡 **When to create `.const.ts`**: When you have 3+ related constants in the module, magic strings, configurations, or values that might change. This improves maintainability and avoids repetition.

> 🔒 **TypeScript tip**: Use `as const` in constants to ensure type safety and allow TypeScript to infer literal types instead of generic types.

> 💡 **Benefits of standardization**: Total predictability - you always know where to find tests, types, hooks, and constants in any part of the project.

## ✅ Benefits of Using `.const.ts`

- **Centralization** - All module constants in one place
- **Type Safety** - TypeScript infers literal types with `as const`
- **Maintenance** - Easy to update values in a single location
- **Documentation** - Constants serve as module documentation
- **Testability** - Easy to import and test expected values

---

## 📂 Static Files Organization

### Suggested Structure for /public/

When you need to add static files, organize like this:

```
/public/
├── documents/     # PDFs, downloads
├── icons/         # Icons and SVGs
├── images/        # Photos and images
├── robots.txt     # SEO
└── sitemap.xml    # SEO
```

> 📝 **Note**: In App Router, `favicon.ico` goes in `/app/favicon.ico`, not `/public/`. The current `.gitkeep` file in `/public/` should be removed when adding real content.

### How to Use Images in Code

```typescript
// ✅ Correct - next/image (recommended)
import Image from 'next/image'

// First, create the folder /public/images/
<Image
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={100}
/>

// For icons, create the folder /public/icons/
<Image
  src="/icons/logo-dark.svg"
  alt="Logo"
  width={40}
  height={40}
/>

// ⚠️ Use <img> only when necessary
<img src="/icons/small-icon.svg" alt="Icon" className="w-4 h-4" />

// ❌ Incorrect - no need for '/public'
<Image src="/public/images/logo.png" alt="Logo" width={200} height={100} />
```

### With Next.js Image (Recommended)

> ⚠️ **Important**: You need to create the folders `/public/images/` and `/public/icons/` before adding files.

```typescript
import Image from 'next/image'

// ✅ Automatic image optimization
<Image
  src="/images/hero-banner.jpg"
  alt="Main banner"
  width={800}
  height={400}
  priority // For above-the-fold images
/>

// ✅ Responsive images
<Image
  src="/images/sample-photo.jpg"
  alt="Sample"
  fill
  className="object-cover"
/>

// ✅ With placeholder
<Image
  src="/images/profile-photo.jpg"
  alt="Profile photo"
  width={150}
  height={150}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```
