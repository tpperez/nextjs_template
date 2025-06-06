# Next.js Project Documentation

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-cyan?logo=tailwindcss)
![Jest](https://img.shields.io/badge/Jest-red?logo=jest)
![License](https://img.shields.io/badge/license-MIT-green)

> 📦 **See exact versions in [`package.json`](./package.json)**

## 📋 Table of Contents

- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation-and-setup)
- [Documentation](#-complete-documentation)
- [Scripts](#-available-scripts)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-basic-project-structure)
- [What's Included](#-whats-included-in-this-template)
- [Getting Started](#-getting-started-with-your-new-project)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🎯 Overview

A **Next.js starter template** that eliminates boilerplate setup and provides a scalable foundation with best practices built-in.

**Perfect for:**

- 🚀 **Rapid project kickoff** - Skip configuration, start building
- 👥 **Team development** - Consistent patterns and conventions
- 📈 **Scalable applications** - Architecture designed for growth

Focus on your features, not infrastructure setup.

### Key Features

- ⚡ **Next.js** with App Router and Turbopack pre-configured
- 🎨 **Tailwind CSS** ready for styling
- 📱 **TypeScript** with robust typing setup
- 🗃️ **Zustand** configured for global state management
- 🧪 **Jest + Testing Library** ready for testing
- 📏 **ESLint + Prettier** for code quality enforcement
- 🎯 **Conventional Commits** with Commitizen setup
- 🏗️ **Scalable structure** - Template prepared for growth

---

## ✅ Prerequisites

- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- node.js
- npm
- git

---

## 🚀 Installation and Setup

### 1. Clone and Initial Setup

```bash
# Clone this template
git clone [template-repository-url]
cd [your-new-project-name]

# Use the correct Node.js version
nvm use
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Public variables (accessible in browser) - must start with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_APP_NAME="My App"

# Private variables (server-only) - no prefix needed
MY_SECRET_KEY="your-secret-here"
MY_DATABASE_URL="your-database-connection-string"
```

> 📖 **[Learn more about Next.js Environment Variables →](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)**

### 4. Start Development

```bash
# Start the development server
npm run dev

# Access: http://localhost:3000
```

---

## 📋 Complete Documentation

| File                                                   | Description                                                    |
| ------------------------------------------------------ | -------------------------------------------------------------- |
| **[Project Structure](./.docs/structure.md)**          | 📁 Current vs future structure, folder and module organization |
| **[Code Conventions](./.docs/conventions.md)**         | 📝 Naming, arrow functions, custom hooks, patterns             |
| **[Architecture & Concepts](./.docs/architecture.md)** | 🏗️ Components vs Views, data flow, technologies                |
| **[Practical Examples](./.docs/examples.md)**          | 📚 Complete implementations of components, services, stores    |
| **[Testing](./.docs/testing.md)**                      | 🧪 Jest configuration, strategies and test examples            |
| **[Workflows & Best Practices](./.docs/workflows.md)** | 🔄 Git flow, conventional commits, best practices              |

---

## 🔧 Available Scripts

### 🚀 Development

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Generate production build
npm start           # Start production server
```

### 🧹 Code Quality

```bash
npm run lint         # Check code issues
npm run lint:fix     # Fix issues automatically
npm run format       # Check formatting
npm run format:fix   # Format code automatically
npm run tsc         # Check TypeScript types
```

### 🧪 Testing

```bash
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode (development)
```

### 🔄 Git and Commits

```bash
git commit          # Commitizen opens automatically via Husky
```

---

## 🛠 Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **State Management:** Zustand (global), React Hooks (local)
- **Testing:** Jest, Testing Library
- **Code Quality:** ESLint, Prettier
- **Workflow:** Husky, Commitizen
- **Tooling:** Turbopack, npm, nvm

> 📚 **[See complete technology details →](./.docs/architecture.md)**

---

## 📁 Basic Project Structure

```
/app
├── (routes)/                    # 🗂️ Application routes
│   ├── (auth)/                  # 🔒 Authenticated routes
│   ├── api/                     # 🔌 API Routes
│   └── (public)/                # 🌐 Public routes
├── components/                  # 🧩 Reusable components
│   ├── structure/              # 🏗️ Structural components
│   └── ui/                     # 🎨 Interface components
├── services/                    # 🔧 Services and APIs
├── stores/                      # 🗃️ Global state stores
├── views/                       # 📱 Views/page structures
├── hooks/                       # 🎣 Global custom hooks
├── utils/                       # 🛠️ Utility functions
└── styles/                      # 🎨 Global styles

/public/                         # 📁 Static files
```

> 📚 **[See complete and detailed structure →](./.docs/structure.md)**

---

## 🎯 What's Included in This Template

- ✅ **2 sample pages** - Home and Sample-1 as examples
- ✅ **Basic layout structure** - Public routes setup
- ✅ **2 complete views** - With tests and exports as examples
- ✅ **Prepared folder structure** - Organized folders with `.gitkeep`
- ✅ **Complete configurations** - ESLint, Prettier, Jest, Husky pre-configured
- ✅ **TypeScript setup** - With path aliases (@/) configured
- ✅ **Tailwind CSS** - With custom configuration ready

### 📋 Getting Started with Your New Project

1. **Remove sample content** and `.gitkeep` files as you add your own content
2. **Create your pages** in `/app/(routes)/(public)/your-page-name/page.tsx` for new routes
3. **Build your views** in `/views/your-view-name/` for your page structures
4. **Create your components** in `/components/ui/` and `/components/structure/`
5. **Implement global stores** in `/stores/` using the pre-configured Zustand
6. **Add your services** in `/services/` for API integrations
7. **Organize your assets** in `/public/` with proper subfolders
8. **Update this README.md** with your project-specific information

> 📚 **[See detailed implementation guides →](./.docs/examples.md)**

---

## 🤝 Development

This starter template enforces **strict conventions** to maintain quality and consistency in your new projects:

- 🏹 **Mandatory arrow functions** (pre-configured in ESLint)
- 📝 **Standardized naming** (kebab-case, PascalCase, I/T prefixes)
- 🎣 **Custom hooks recommended** for business logic
- 🧪 **Unit tests** for components and views
- 🔄 **Conventional commits** via Commitizen (ready to use)
- 🌿 **Git flow** with branches named `[CARD-ID]_[description]`

> 📝 **[See all conventions →](./.docs/conventions.md)**
> 🔄 **[See complete workflow →](./.docs/workflows.md)**

---

## 🔧 Troubleshooting

### Common Issues

**Node version problems:**

```bash
# Make sure you're using the correct version
nvm use
```

**Permission/cache issues:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next .turbo
npm run dev
```

**Port already in use:**

```bash
# Use different port
npm run dev -- -p 3001
```

**TypeScript errors:**

```bash
# Check types
npm run tsc
```

> 💡 **Still having issues?** [Open an issue](https://github.com/your-repo/issues) and we'll help you out.

---

## 🤝 Contributing

Found an issue or want to improve this template?

- 🐛 **[Report bugs](https://github.com/your-repo/issues)**
- 💡 **[Suggest features](https://github.com/your-repo/issues)**
- 🔧 **[Submit pull requests](https://github.com/your-repo/pulls)**

**Before contributing:**

1. Read our [conventions](./.docs/conventions.md)
2. Follow our [workflows](./.docs/workflows.md)
3. Add tests for new features

---

**Starter template created for agile and scalable development** ⚡
