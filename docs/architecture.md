# Architecture

Application architecture patterns and design principles for scalable development.

## Table of Contents

- [Overview](#overview)
- [Guidelines](#guidelines)

---

## Overview

Architecture follows a coordinator pattern with Views as central orchestrators, where each page route has a corresponding view component:

```
Routes (page.tsx)
  ↓
Queries ←→ Services
  ↓
Views
  ├→ Components
  ├→ Stores
  ├→ Hooks
  ├→ Utils
  └→ Services
```

**Route-View Relationship:**

- Each page route has a corresponding view component
- Routes handle server-side setup and pass initial data to Views
- Views implement page behavior and coordinate user interactions

**Layer Responsibilities:**

- **Routes**: Server-side rendering and initial data fetching for each page
- **Queries**: Data fetching, transformation, and validation using Services
- **Views**: Page implementations that orchestrate all other layers
- **Components**: UI rendering and user interactions (primarily presentational)
- **Services**: External API communication used by both server (Queries) and client (Views)
- **Stores**: Application state management and persistence
- **Utils**: Pure helper functions and shared utilities (dependency-free)

## Guidelines

- Each page requires a Route and a View
- Views manage all page functionality: component composition, state, and user interactions
- Data flows from Routes through Queries to Views, then to Components as props
