# Next.js Project Documentation

> 📦 **Base template for creating new Next.js applications.** Pre-configured with TypeScript, Tailwind CSS, testing setup, and development tools.

---

## 📋 Table of Contents

- [📋 Overview](#-overview)
- [⚡ Quick Start](#-quick-start)
- [💻 Development](#-development)
- [🔄 Git](#-git)
- [🤝 Contributing](#-contributing)
- [📚 Reference](#-reference)

---

## 📋 Overview

### Tech Stack

**Core Framework**

- Next.js
- React
- TypeScript
- Tailwind CSS

**State Management**

- Zustand
- React Hooks

**Quality & Testing**

- ESLint
- Prettier
- Jest
- React Testing Library

**Development Tools**

- Husky
- Commitizen
- Lint-staged

---

## ⚡ Quick Start

### Prerequisites

- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
- Node.js
- npm
- git

### Setup & Run

```bash
# 1. Clone and setup
git clone git@github.com:username/repository-name.git
cd [your-new-project-name]
nvm use

# 2. Install dependencies
npm install

# 3. Start development
npm run dev
# Access: http://localhost:3000
```

### Environment Configuration

Create `.env.local`:

```env
# public variables (accessible in browser)
NEXT_PUBLIC_API_URL = "https://api.example.com"
NEXT_PUBLIC_APP_NAME = "My App"

# private variables (accessible only in server)
MY_SECRET_KEY = "your-secret-here"
MY_DATABASE_URL = "your-database-connection-string"
```

---

## 💻 Development

### Available Scripts

**Development**

```bash
npm run dev   # start dev server with turbopack
npm run build # production build
npm start     # start production server
```

**Code Quality**

```bash
npm run lint       # check linting issues
npm run lint:fix   # fix linting issues automatically
npm run format     # check code formatting
npm run format:fix # format code automatically
npm run tsc        # typescript type checking
```

**Testing**

```bash
npm test              # run all tests
npm run test:watch    # run tests in watch mode
npm run test:coverage # generate coverage report
```

### Essential Documentation

| Guide                                                          | Description                                                        |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| **[📁 Project Organization](./.docs/project-organization.md)** | **WHERE** to place files, folder structure, architectural overview |
| **[📝 Code Standards](./.docs/code-standards.md)**             | **HOW** to write code, naming patterns, quality standards          |

---

## 🔄 Git

### Branch Naming

Use descriptive names with prefix:

```bash
card-123_user-authentication
card-456_dashboard-ui
card-789_payment-integration
```

**Pattern:** `card-xx_descriptive-name` (always lowercase)

> 💡 **No card?** Use initials: `jq_feature-name` (Jose Quispe)

### Development Workflow

```bash
# 1. Create feature branch
git checkout -b card-123_your-feature-name

# 2. Make changes and commit (Commitizen opens automatically)
git add .
git commit  # Interactive wizard opens via Husky

# 3. Push and create PR
git push origin card-123_your-feature-name
```

---

## 🤝 Contributing

**Improve this template:**

```bash
# 1. Fork and clone
git clone https://github.com/your-username/your-fork.git
cd your-fork && nvm use && npm install

# 2. Create feature branch
git checkout -b card-456_your-contribution

# 3. Make changes and commit
git add . && git commit  # Commitizen opens
git push origin card-456_your-contribution
```

**Pull Request Guidelines:**

- Update documentation when adding new features or changing existing behavior

Every commit automatically runs automated quality checks:

- ✅ **typescript** type checking
- ✅ **all tests** must pass
- ✅ **eslint** fixes and validates code
- ✅ **prettier** formats code
- ✅ **commitlint** validates commit messages

---

## 📚 Reference

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Support

- 🐛 **[Report bugs](https://github.com/your-repo/issues)**
- 💡 **[Suggest features](https://github.com/your-repo/issues)**
- 🔧 **[Submit PRs](https://github.com/your-repo/pulls)**
