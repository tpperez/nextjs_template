# Technology Stack

Core architectural decisions and technologies defining the project foundation.

## Table of Contents

- [Framework and Language](#framework-and-language)
- [Styling and Design](#styling-and-design)
- [State and Data Management](#state-and-data-management)
- [Forms and Validation](#forms-and-validation)
- [API Clients](#api-clients)
- [Testing Framework](#testing-framework)
- [Code Quality](#code-quality)

## Related Documentation

- [Contributing](./contributing.md) - Development environment setup and technology requirements
- [Support](./support.md) - Browser compatibility and technology support matrix
- [Testing](./testing.md) - Testing framework implementation and configuration
- [Code Quality](./code-quality.md) - Quality tools and enforcement standards

---

## Framework and Language

- **Next.js** - [Full-stack React framework](https://nextjs.org/docs) with SSR, SSG, and file-based routing
- **TypeScript** - [Static type checking](https://www.typescriptlang.org/docs/) for enhanced developer experience and code reliability

#### Benefits

- Server-side rendering for improved performance and SEO
- Static type checking reduces runtime errors and improves maintainability
- Modern development tooling with excellent IDE support

---

## Styling and Design

- **Tailwind CSS** - [Utility-first CSS framework](https://tailwindcss.com/docs) for rapid UI development and design system consistency

#### Benefits

- Consistent design language through utility classes
- Smaller bundle sizes with unused CSS elimination
- Rapid prototyping and development workflow

---

## State and Data Management

- **TanStack Query** - [Server state management](https://tanstack.com/query/latest/docs/react/overview) with intelligent caching and synchronization
- **Zustand** - [Lightweight client-side state management](https://zustand-demo.pmnd.rs/) for global application state

#### Benefits

- Automatic background data synchronization and caching
- Optimistic updates and error handling for server state
- Simple, unopinionated client state management without boilerplate

---

## Forms and Validation

- **React Hook Form** - [Performant form library](https://react-hook-form.com/get-started) with minimal re-renders
- **Zod** - [Runtime schema validation](https://zod.dev/) with TypeScript type inference

#### Benefits

- Uncontrolled components for better performance
- Type-safe form validation with runtime checks
- Seamless integration between validation schema and TypeScript types

---

## API Clients

- **Fetch API** - Native browser API for HTTP requests with modern async/await patterns
- **GraphQL Request** - [Minimal GraphQL client](https://github.com/jasonkuhrt/graphql-request) for GraphQL API integration

#### Benefits

- Standardized HTTP client without additional dependencies
- Lightweight GraphQL integration without complex caching layers
- Framework-agnostic HTTP abstractions

---

## Testing Framework

- **Vitest** - [Fast testing framework](https://vitest.dev/guide/) with native TypeScript support and ESM compatibility
- **Testing Library** - [User-centric testing utilities](https://testing-library.com/docs/) for component behavior validation

#### Benefits

- Native ES modules support without additional configuration
- User-focused testing approach that promotes accessibility
- Fast test execution with intelligent watch mode

---

## Code Quality

- **ESLint** - [Code linting](https://eslint.org/docs/latest/) and quality enforcement with extensible rule sets
- **Prettier** - [Automatic code formatting](https://prettier.io/docs/en/) for consistent style standards

#### Benefits

- Automated code quality enforcement through IDE integration
- Consistent formatting eliminates style discussions
- Extensible rule configuration for team-specific standards

---

## References

| Technology          | Resource                                                                | Description                                                      |
| ------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Next.js**         | [Documentation](https://nextjs.org/docs)                                | Full-stack React framework with SSR, SSG, and file-based routing |
| **TypeScript**      | [Documentation](https://www.typescriptlang.org/docs/)                   | Static type checking for enhanced developer experience           |
| **Tailwind CSS**    | [Documentation](https://tailwindcss.com/docs)                           | Utility-first CSS framework for rapid UI development             |
| **TanStack Query**  | [React Overview](https://tanstack.com/query/latest/docs/react/overview) | Server state management with intelligent caching                 |
| **Zustand**         | [Demo & Docs](https://zustand-demo.pmnd.rs/)                            | Lightweight client-side state management                         |
| **React Hook Form** | [Getting Started](https://react-hook-form.com/get-started)              | Performant form library with minimal re-renders                  |
| **Zod**             | [Documentation](https://zod.dev/)                                       | Runtime schema validation with TypeScript inference              |
| **GraphQL Request** | [GitHub](https://github.com/jasonkuhrt/graphql-request)                 | Minimal GraphQL client for API integration                       |
| **Vitest**          | [Guide](https://vitest.dev/guide/)                                      | Fast testing framework with TypeScript support                   |
| **Testing Library** | [Documentation](https://testing-library.com/docs/)                      | User-centric testing utilities                                   |
| **ESLint**          | [Documentation](https://eslint.org/docs/latest/)                        | Code linting and quality enforcement                             |
| **Prettier**        | [Documentation](https://prettier.io/docs/en/)                           | Automatic code formatting for consistent style                   |
