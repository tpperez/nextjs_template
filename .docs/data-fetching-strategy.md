# Data Fetching Strategy

> 📊 **Complete guide for data fetching strategies to optimize performance, user experience, and SEO.** Defining WHEN and WHY to use server-side vs client-side data fetching.

---

## 📋 Table of Contents

- [🏗️ Fundamentals](#️-fundamentals)
  - [🎯 Core Principles](#-core-principles)
  - [📊 Decision Matrix](#-decision-matrix)
- [🖥️ Server-Side Strategy](#️-server-side-strategy)
  - [✅ When to Use](#-when-to-use)
  - [🎯 Cache Strategies](#-cache-strategies)
  - [🚀 Optimization Patterns](#-optimization-patterns)
- [💻 Client-Side Strategy](#-client-side-strategy)
  - [✅ When to Use](#-when-to-use-1)
  - [🎯 Implementation Patterns](#-implementation-patterns)
- [🔄 Hybrid Strategies](#-hybrid-strategies)
  - [🎯 Server + Background Revalidation](#-server--background-revalidation)
  - [🎯 Progressive Enhancement](#-progressive-enhancement)
- [⚡ Performance Optimization](#-performance-optimization)
  - [🚀 Avoiding Request Waterfalls](#-avoiding-request-waterfalls)
  - [🎯 Smart Prefetching](#-smart-prefetching)
  - [🔄 Cache Strategy](#-cache-strategy)
- [🛡️ Error Handling](#️-error-handling)
  - [🎯 Server-Side Errors](#-server-side-errors)
  - [🔄 Client-Side Recovery](#-client-side-recovery)
- [📊 Monitoring & Metrics](#-monitoring--metrics)
  - [🎯 Performance Tracking](#-performance-tracking)
  - [📈 Business Impact](#-business-impact)
- [✅ Implementation Checklist](#-implementation-checklist)

---

## 🏗️ Fundamentals

### 🎯 Core Principles

#### **Server-First, Client-Smart**

**Always prioritize server-side requests**, moving to client-side only when there's clear benefit for UX or performance.

**Benefits:**

- ✅ **Better SEO** - Data indexable by search engines
- ✅ **Initial performance** - Reduces excessive loading states
- ✅ **Core Web Vitals** - Better performance metrics
- ✅ **User experience** - Content available immediately
- ✅ **Stability** - Less dependency on client JavaScript

#### **Progressive Enhancement Philosophy**

Build a solid foundation on the server and add progressive improvements on the client:

1. **Base functionality** → Server-side rendering with essential data
2. **Enhancement layer** → Client-side for advanced interactivity
3. **Optimization layer** → Caching, prefetching, background updates

### 📊 Decision Matrix

| Scenario                          | Server | Client | Primary Justification                        |
| --------------------------------- | :----: | :----: | -------------------------------------------- |
| **🔍 SEO-critical data**          |   ✅   |   ❌   | Indexation, crawling, initial performance    |
| **🏠 Above-the-fold content**     |   ✅   |   ❌   | Core Web Vitals, first impression            |
| **📊 Initial dashboard data**     |   ✅   |   ❌   | Reduce loading states, perceived performance |
| **🛍️ Product listings**           |   ✅   |   ❌   | SEO, performance, efficient caching          |
| **📰 Static/semi-static content** |   ✅   |   ❌   | Long cache, stability                        |
| **🎯 Landing pages**              |   ✅   |   ❌   | Conversion, marketing, performance           |
| **💬 Real-time data**             |   ❌   |   ✅   | WebSockets, polling, reactivity              |
| **🎮 User interactions**          |   ❌   |   ✅   | Responsiveness, immediate feedback           |
| **📄 Pagination/filtering**       |   ❌   |   ✅   | Local state, smooth navigation               |
| **📝 Complex forms**              |   ❌   |   ✅   | Dynamic validation, auto-save, UX            |
| **🔄 Frequent updates**           |   ❌   |   ✅   | Constantly changing data                     |
| **📊 Secondary data**             |   ❌   |   ✅   | Performance, conditional loading             |

---

## 🖥️ Server-Side Strategy

### ✅ When to Use

**Mandatory scenarios for server-side:**

#### 🏠 **Above-the-fold Content**

- Hero sections, main banners
- Navigation menus, headers
- Content visible immediately
- Critical path rendering

#### 🔍 **SEO-Critical Data**

- Meta tags, titles, descriptions
- Structured data (JSON-LD)
- Indexable content
- Open Graph data

#### 📊 **Initial Dashboard Data**

- Main page metrics
- Overview/summary data
- Context information
- Application initial state

#### 🛍️ **Product & Content Listings**

- Product catalogs
- Article/post lists
- Directories and indexes
- Main search results

### 🎯 Cache Strategies

#### **By Data Type**

```typescript
const CACHE_STRATEGIES = {
  // Marketing content - long cache
  marketing: {
    revalidate: 86400, // 24 hours
    rationale: 'Planned content, changes rarely',
  },

  // Product data - medium cache
  products: {
    revalidate: 3600, // 1 hour
    rationale: 'Balance fresh data vs performance',
  },

  // Dynamic pricing - short cache
  pricing: {
    revalidate: 300, // 5 minutes
    rationale: 'Critical data for conversion',
  },

  // Personalized data - no cache
  personalized: {
    revalidate: false,
    rationale: 'User-specific content',
  },
}
```

#### **By Business Context**

| Context        | Products | Pricing | Inventory | Analytics |
| -------------- | -------- | ------- | --------- | --------- |
| **E-commerce** | 1h       | 5min    | 2min      | 1h        |
| **Blog/CMS**   | 6h       | 30min   | N/A       | 1h        |
| **Dashboard**  | 5min     | 1min    | Real-time | 5min      |
| **Marketing**  | 24h      | 1h      | N/A       | 30min     |

### 🚀 Optimization Patterns

#### **Smart Parallelization**

```typescript
// ✅ GOOD: Identify real dependencies
async function OptimizedPage() {
  // Parallel: independent data
  const [essentialData, userPreferences, navigationData] = await Promise.all([
    getEssentialData(), // Always needed
    getUserPreferences(), // Independent
    getNavigationData(), // Independent
  ])

  // Sequential: only when truly dependent
  const personalizedContent = await getPersonalizedContent(
    userPreferences.theme,
  )

  // Optional: doesn't block rendering
  const optionalData = await getOptionalData().catch(() => null)
}
```

#### **Graceful Degradation Levels**

| Level | Strategy                                         | Example                                  |
| ----- | ------------------------------------------------ | ---------------------------------------- |
| **1** | Full functionality with cached data              | Show stale product data if API down      |
| **2** | Partial functionality, disable affected features | Disable reviews if review service down   |
| **3** | Basic functionality with static fallback         | Show static error page with contact info |
| **4** | Complete fallback to static site                 | CDN serves static version during outage  |

---

## 💻 Client-Side Strategy

### ✅ When to Use

**Use client-side ONLY when there's clear UX value:**

#### 💬 **Real-time & Live Data**

- Chat messages, notifications
- Live scores, stock prices
- Collaborative editing
- System status, health checks

#### 🎮 **User Interactions**

- Likes, favorites, bookmarks
- Comments, ratings, reviews
- Form submissions with feedback
- Drag & drop, sortable lists

#### 📄 **Pagination & Filtering**

- Infinite scroll
- Dynamic search/filtering
- Sorting without page reload
- Table pagination

#### 📝 **Complex Forms**

- Multi-step wizards
- Real-time validation
- Auto-complete, typeahead
- Dependent field updates

#### 📊 **Secondary/Enhancement Data**

- Non-critical recommendations
- Analytics tracking
- A/B test variants
- User behavior tracking

### 🎯 Implementation Patterns

#### **Optimistic Updates**

```typescript
// Pattern: Update UI → Call API → Sync/Rollback
const optimisticPattern = {
  1: 'Update UI immediately (perceived performance)',
  2: 'Make request in background',
  3: 'Synchronize with real response',
  4: 'Rollback if fails',
}

// Ideal for: likes, favorites, simple toggles
// Avoid for: financial transactions, critical data
```

#### **Background Revalidation**

```typescript
// Pattern: Show cached → Update background → Refresh UI
const backgroundPattern = {
  1: 'Show cached data (stale-while-revalidate)',
  2: 'Fetch new data in background',
  3: 'Update UI when fresh data arrives',
  4: 'Graceful error handling if fails',
}

// Ideal for: dashboard updates, social feeds
// Avoid for: form submissions, user actions
```

#### **Progressive Loading**

```typescript
// Pattern: Essential first → Secondary later → Optional last
const progressivePattern = {
  1: 'Load critical data first (skeleton)',
  2: 'Load secondary data (populate)',
  3: 'Load optional enhancements (polish)',
  4: 'Prefetch likely next needs',
}

// Ideal for: complex dashboards, profile pages
```

---

## 🔄 Hybrid Strategies

### 🎯 Server + Background Revalidation

**Best of both worlds**: Initial performance + updated data

#### **When to Use:**

- Dashboards with moderately changing data
- Profile pages with dynamic stats
- Product pages with pricing updates
- Social feeds with engagement metrics

#### **Implementation Pattern:**

```typescript
const hybridStrategy = {
  server: {
    purpose: 'Initial render + SEO',
    cache: 'Medium TTL (5-30min)',
    fallback: 'Static fallback if fails',
  },
  client: {
    purpose: 'Background updates',
    frequency: 'Based on data volatility',
    trigger: 'Window focus, interval, user action',
  },
}
```

### 🎯 Progressive Enhancement

**Functional baseline + interactive enhancements**

#### **Enhancement Layers:**

1. **Baseline** (Server): Core functionality always available
2. **Interactive** (Client): UX improvements with JavaScript
3. **Advanced** (Client): Advanced features, experimental

```typescript
// Example: Product list
const progressiveEnhancement = {
  baseline: 'Product grid with URL-based pagination',
  interactive: 'Client-side filters + infinite scroll',
  advanced: 'Real-time stock updates + AI recommendations',
}
```

---

## ⚡ Performance Optimization

### 🚀 Avoiding Request Waterfalls

#### **Identify Real Dependencies**

```typescript
// ❌ BAD: Unnecessary waterfall
const badFlow = {
  1: 'Fetch user → wait',
  2: 'Fetch user posts → wait',
  3: 'Fetch user friends → wait',
  4: 'Render (3x slower)',
}

// ✅ GOOD: Parallel when possible
const goodFlow = {
  1: 'Fetch [user, posts, friends] in parallel',
  2: 'Render with all data',
  3: '3x faster',
}
```

#### **Dependency Analysis**

| Independent Data          | Dependent Data                          |
| ------------------------- | --------------------------------------- |
| User profile + User posts | User preferences → Personalized content |
| Navigation + Footer       | Cart items → Shipping options           |
| Product info + Reviews    | User location → Local recommendations   |

### 🎯 Smart Prefetching

#### **Behavioral Triggers**

| Trigger        | Use Case                              | Implementation           |
| -------------- | ------------------------------------- | ------------------------ |
| **Hover**      | Desktop hover = likely navigation     | Mouse enter events       |
| **Viewport**   | Intersection observer = scroll intent | IntersectionObserver API |
| **Prediction** | User behavior patterns                | Analytics-based          |
| **Preload**    | Critical next-page resources          | Link prefetch            |

#### **Business Logic Prefetching**

| Context        | Strategy                             |
| -------------- | ------------------------------------ |
| **E-commerce** | Product details on category hover    |
| **Blog**       | Next article on reading scroll       |
| **Dashboard**  | Drill-down data on chart interaction |
| **Forms**      | Dependent options on field change    |

### 🔄 Cache Strategy

#### **Multi-level Caching**

| Level           | Technology                   | Purpose                 |
| --------------- | ---------------------------- | ----------------------- |
| **Browser**     | HTTP cache, service worker   | Client-side performance |
| **CDN**         | Edge locations               | Geographic distribution |
| **Server**      | Redis, in-memory             | Database query cache    |
| **Application** | React Query, component state | Runtime optimization    |

---

## 🛡️ Error Handling

### 🎯 Server-Side Errors

#### **Recovery Strategy**

| Error Type    | Strategy               | Timeline            |
| ------------- | ---------------------- | ------------------- |
| **Immediate** | Retry transient errors | Network blips       |
| **Delayed**   | Exponential backoff    | Service errors      |
| **Scheduled** | Periodic health checks | Recovery monitoring |
| **Manual**    | User-triggered retry   | Critical errors     |

#### **Graceful Degradation Implementation**

```typescript
async function ResilientPage() {
  try {
    // Critical data - MUST work
    const essentialData = await getCriticalData({
      timeout: 5000, // Lower timeout for critical data
    })

    // Optional data - can fail gracefully
    const [reviews, recommendations, relatedItems] = await Promise.allSettled([
      getReviews().catch(() => null),
      getRecommendations().catch(() => []),
      getRelatedItems().catch(() => []),
    ])

    return {
      essentialData,
      reviews: extractData(reviews),
      recommendations: extractData(recommendations),
      relatedItems: extractData(relatedItems),
    }
  } catch (error) {
    // Log for monitoring
    console.error('Critical data fetch failed:', error)

    // Return error page or fallback
    return { error, fallback: true }
  }
}
```

### 🔄 Client-Side Recovery

#### **Smart Retry Logic**

| Error Type         | Retry Strategy                       |
| ------------------ | ------------------------------------ |
| **Network errors** | Retry with exponential backoff       |
| **Server errors**  | Limited retries, then graceful fail  |
| **Client errors**  | No retry, show user-friendly message |
| **Timeout errors** | Retry with longer timeout            |

#### **User Communication Patterns**

| Pattern         | Use Case                                         |
| --------------- | ------------------------------------------------ |
| **Optimistic**  | Show success immediately, handle errors silently |
| **Progressive** | Show loading → success/error → recovery options  |
| **Contextual**  | Error messages relevant to user's current task   |
| **Actionable**  | Clear next steps for user resolution             |

---

## 📊 Monitoring & Metrics

### 🎯 Performance Tracking

#### **Core Web Vitals**

| Metric  | Target  | Impact                               |
| ------- | ------- | ------------------------------------ |
| **LCP** | < 2.5s  | Above-fold server rendering critical |
| **FID** | < 100ms | Minimize JavaScript blocking         |
| **CLS** | < 0.1   | Skeleton loaders, reserve space      |

#### **Business Metrics**

| Metric              | Impact                                  |
| ------------------- | --------------------------------------- |
| **Conversion Rate** | Loading speed effect on sales           |
| **Bounce Rate**     | Users leaving due to slow loading       |
| **Engagement**      | Time spent waiting vs consuming content |
| **Retention**       | Return visits affected by performance   |

### 📈 Business Impact

#### **Performance Thresholds**

| Level        | Server Response | Client Error Rate | Cache Hit Ratio |
| ------------ | --------------- | ----------------- | --------------- |
| **Critical** | > 1s            | > 5%              | < 70%           |
| **Warning**  | > 500ms         | > 2%              | < 85%           |
| **Good**     | < 200ms         | < 1%              | > 90%           |

#### **Alerting Strategy**

| Alert Type          | Trigger                                   |
| ------------------- | ----------------------------------------- |
| **Revenue Impact**  | Performance affecting conversion funnel   |
| **User Experience** | High error rates on critical journeys     |
| **SEO Impact**      | Core Web Vitals affecting search rankings |
| **Competitive**     | Performance gap with competitors          |

---

## ✅ Implementation Checklist

### 🎯 Strategic Assessment

- [ ] **Data criticality analysis**

  - [ ] Identify SEO-critical data
  - [ ] Map above-the-fold requirements
  - [ ] Define optional vs essential data
  - [ ] Establish real vs imaginary dependencies

- [ ] **Performance requirements**
  - [ ] Core Web Vitals targets defined
  - [ ] Business metrics established
  - [ ] User journey performance mapped
  - [ ] Competitive benchmarks analyzed

### 🖥️ Server-Side Implementation

- [ ] **Data fetching strategy**

  - [ ] Server-first for critical data implemented
  - [ ] Cache strategy based on data volatility
  - [ ] Parallelization where data is independent
  - [ ] Graceful degradation for optional data

- [ ] **Performance optimization**
  - [ ] Request waterfalls identified and eliminated
  - [ ] Appropriate timeouts configured
  - [ ] Error boundaries with fallbacks implemented
  - [ ] Cache invalidation strategy defined

### 💻 Client-Side Implementation

- [ ] **Selective usage**

  - [ ] Client-side only for justified cases
  - [ ] Real-time requirements implemented
  - [ ] User interaction patterns optimized
  - [ ] Progressive enhancement applied

- [ ] **Performance patterns**
  - [ ] Optimistic updates for better UX
  - [ ] Background revalidation implemented
  - [ ] Smart prefetching based on behavior
  - [ ] Error recovery with user feedback

### 🔄 Hybrid Strategies

- [ ] **Server-to-client transition**

  - [ ] Initial server data utilized
  - [ ] Background updates configured
  - [ ] Progressive enhancement layers defined
  - [ ] Fallback strategies implemented

- [ ] **Monitoring & metrics**
  - [ ] Performance tracking active
  - [ ] Business impact monitoring
  - [ ] Error rate tracking per strategy
  - [ ] User experience metrics collected

### 📊 Validation & Testing

- [ ] **Performance validation**

  - [ ] Core Web Vitals within targets
  - [ ] Business metrics improvement demonstrated
  - [ ] Error scenarios tested
  - [ ] Cache effectiveness measured

- [ ] **User experience validation**
  - [ ] Loading states minimized
  - [ ] Error states are user-friendly
  - [ ] Progressive enhancement works
  - [ ] Accessibility maintained in all cases

---

### Related Documentation

- 📁 **[Project Organization](./project-organization.md)** - WHERE to organize files and folders
- 📝 **[Code Standards](./code-standards.md)** - HOW to write code, naming patterns, quality standards
- 🔧 **[HTTP Service Guide](./http-service.md)** - HOW to use REST and GraphQL clients (technical implementation)
- 📚 **[README](../README.md)** - Project setup and overview
