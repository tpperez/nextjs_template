# Workflows & Best Practices

## 🌿 Git Flow

This template follows a **feature branch workflow** with conventional commits and automated quality checks.

### Branch Strategy

```bash
main
├── feature/ABC-123_user-authentication    # New features
├── bugfix/ABC-456_login-validation        # Bug fixes
├── hotfix/ABC-789_critical-security       # Critical fixes
└── chore/ABC-101_update-dependencies      # Maintenance
```

### Workflow Steps

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b ABC-123_user-authentication

# 2. Make changes and commit (Commitizen opens automatically)
git add .
git commit  # Commitizen wizard opens via Husky

# 3. Push and create PR
git push origin ABC-123_user-authentication
# Create PR on GitHub/GitLab
```

---

## 📋 Branch Naming Convention

### Format (Mandatory)

```
[CARD-ID]_[description-kebab-case]
```

### Examples

```bash
# Features
PROJ-123_add-user-profile
PROJ-456_implement-search
PROJ-789_create-dashboard

# Bug fixes
PROJ-234_fix-login-redirect
PROJ-567_resolve-memory-leak

# Hotfixes
PROJ-890_security-vulnerability
PROJ-345_critical-api-fix

# Chores/Maintenance
PROJ-678_update-dependencies
PROJ-234_refactor-components
PROJ-567_improve-documentation
```

### Why Use Underscore?

- ✅ **Clear separation** - Distinguishes card ID from description
- ✅ **Readability** - Easy to identify where card ends
- ✅ **Consistency** - Description follows same pattern as file names
- ✅ **Kebab-case preserved** - Description maintains file naming convention

### Branch Types

| Type        | Prefix    | Purpose                   | Example                       |
| ----------- | --------- | ------------------------- | ----------------------------- |
| **Feature** | No prefix | New functionality         | `ABC-123_user-authentication` |
| **Bug Fix** | No prefix | Fix existing issues       | `ABC-456_fix-login-bug`       |
| **Hotfix**  | No prefix | Critical production fixes | `ABC-789_security-patch`      |
| **Chore**   | No prefix | Maintenance, refactoring  | `ABC-101_update-eslint`       |

---

## 🎯 Commit Convention

This template uses **Conventional Commits** with **Commitizen** for consistency.

### Automated Process

```bash
# When you commit, Commitizen opens automatically
git commit

# Commitizen wizard guides you through:
# 1. Select commit type
# 2. Enter scope (optional)
# 3. Write description
# 4. Add body (optional)
# 5. Add breaking changes (optional)
```

### Commit Types

| Type         | Description                  | Example                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| **feat**     | New feature                  | `feat(auth): add user login functionality`   |
| **fix**      | Bug fix                      | `fix(button): resolve click handler issue`   |
| **docs**     | Documentation                | `docs(readme): update installation steps`    |
| **style**    | Code style (no logic change) | `style(button): fix formatting and spacing`  |
| **refactor** | Code refactoring             | `refactor(auth): simplify token validation`  |
| **test**     | Adding/updating tests        | `test(button): add missing test cases`       |
| **chore**    | Maintenance                  | `chore(deps): update next.js to 15.3.3`      |
| **perf**     | Performance improvements     | `perf(api): optimize user data fetching`     |
| **ci**       | CI/CD changes                | `ci(github): add automated testing workflow` |

### Commit Format

```
type(scope): description

[optional body]

[optional footer(s)]
```

### Examples

```bash
# Simple feature
feat(auth): add user registration

# Feature with scope and body
feat(components): add new Button component

Add reusable Button component with multiple variants:
- Primary, secondary, and danger variants
- Small, medium, and large sizes
- Loading and disabled states

# Breaking change
feat(api): update user authentication flow

BREAKING CHANGE: API endpoints changed from /auth/* to /api/auth/*

# Bug fix with issue reference
fix(login): resolve token expiration handling

Fixes #123
```

---

## 🔄 Development Workflow

### 1. Setting Up New Work

```bash
# Always start from updated main
git checkout main
git pull origin main

# Create feature branch with proper naming
git checkout -b PROJ-123_implement-user-dashboard

# Verify Node.js version
nvm use

# Install any new dependencies
npm install
```

### 2. Development Process

```bash
# Start development server
npm run dev

# Make changes following conventions
# - Use arrow functions (ESLint enforced)
# - Follow naming conventions
# - Create tests for new functionality
# - Update documentation if needed

# Run quality checks during development
npm run lint        # Check for issues
npm run tsc         # Check TypeScript
npm test           # Run tests
```

### 3. Pre-Commit Checklist

Before committing, ensure:

- ✅ **Code quality** - No ESLint errors
- ✅ **Type safety** - No TypeScript errors
- ✅ **Tests passing** - All tests green
- ✅ **Functionality** - Feature works as expected
- ✅ **Documentation** - Updated if needed

### 4. Commit and Push

```bash
# Stage changes
git add .

# Commit (Commitizen opens automatically via Husky)
git commit

# Push to remote
git push origin PROJ-123_implement-user-dashboard
```

### 5. Pull Request Process

```bash
# Create PR with template
# PR title should match: [CARD-ID] Description
# Example: [PROJ-123] Implement user dashboard

# PR should include:
# - Clear description of changes
# - Screenshots if UI changes
# - Testing instructions
# - Link to card/issue
```

---

## 🔒 Quality Gates

### Automated Checks (Husky Hooks)

#### Pre-commit Hook

```bash
# .husky/pre-commit
npm run tsc          # TypeScript check
npm run test         # Run tests
npx lint-staged      # Lint staged files
```

#### Commit-msg Hook

```bash
# .husky/commit-msg
npx --no -- commitlint --edit "${1}"
```

#### Prepare-commit-msg Hook

```bash
# .husky/prepare-commit-msg
exec < /dev/tty && npx --no -- cz --hook || true
```

### Lint-staged Configuration

```javascript
// .lintstagedrc.mjs
const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': [
    'prettier --write', // Format code
    'next lint --fix --no-cache --file', // Lint and fix
  ],
}
```

---

## 📋 Pull Request Template

### PR Checklist

```markdown
## Describe your changes

- [ ] Implemented user dashboard with analytics
- [ ] Added responsive design for mobile devices
- [ ] Created comprehensive tests for all components

## Checklist before requesting a review

- [ ] I have performed a self-review of my code
- [ ] If it is a core feature, I have added thorough tests
- [ ] All tests passed on development environment
- [ ] Linked card from board to PR (if applicable)
- [ ] Update ENVs (if applicable)
- [ ] Update Feature Toggles (if applicable)
- [ ] Applied proper tags to PR
- [ ] Assigned PR for review

## Test scenarios if applicable

- [ ] Dashboard loads correctly with mock data
- [ ] Charts render properly on different screen sizes
- [ ] User can filter data by date range
- [ ] Error states display appropriate messages
```

### PR Template Structure

```markdown
## [CARD-ID] Feature/Fix Description

### What changed?

Brief description of the changes made.

### Why was this change needed?

Context about the problem being solved.

### How to test?

Step-by-step instructions for reviewers.

### Screenshots (if applicable)

Before/after images for UI changes.

### Breaking changes?

Any breaking changes and migration steps.
```

---

## 🧪 Testing Workflow

### Test-Driven Development (TDD)

```bash
# 1. Write failing test first
npm run test:watch

# 2. Write minimal code to make test pass
# 3. Refactor while keeping tests green
# 4. Repeat cycle
```

### Testing Strategy

```typescript
// 1. Unit tests - Individual components/functions
describe('Button', () => {
  it('should render with correct text', () => {
    // Test implementation
  })
})

// 2. Integration tests - Component interactions
describe('LoginForm', () => {
  it('should submit form with valid data', () => {
    // Test user flow
  })
})

// 3. View tests - Complete page functionality
describe('ViewUserProfile', () => {
  it('should display and edit user information', () => {
    // Test complete view behavior
  })
})
```

### Continuous Testing

```bash
# Run tests continuously during development
npm run test:watch

# Run specific test file
npm test -- button.test.tsx

# Run tests with coverage
npm test -- --coverage
```

---

## 🚀 Deployment Workflow

### Environment Strategy

```bash
# Development
NODE_ENV=development
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Staging
NODE_ENV=production
NEXT_PUBLIC_API_URL="https://api-staging.example.com"

# Production
NODE_ENV=production
NEXT_PUBLIC_API_URL="https://api.example.com"
```

### Build and Deploy

```bash
# Local production build test
npm run build
npm start

# Check build output
npm run build -- --debug

# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

---

## 🔧 Code Review Guidelines

### For Authors

**Before requesting review:**

- ✅ **Self-review** - Read through your own changes
- ✅ **Test locally** - Verify everything works
- ✅ **Clean commits** - Squash unnecessary commits
- ✅ **Clear description** - Explain what and why
- ✅ **Screenshots** - For visual changes

**During review:**

- ✅ **Respond promptly** - Address feedback quickly
- ✅ **Ask questions** - If feedback is unclear
- ✅ **Be open** - Accept constructive criticism
- ✅ **Update tests** - If implementation changes

### For Reviewers

**What to look for:**

- 🎯 **Functionality** - Does it work as intended?
- 📝 **Code quality** - Follows conventions?
- 🧪 **Tests** - Adequate test coverage?
- 🏗️ **Architecture** - Fits with existing patterns?
- 🔒 **Security** - No vulnerabilities introduced?
- 📚 **Documentation** - Clear and up-to-date?

**Review checklist:**

- ✅ **Run the code** - Test it locally
- ✅ **Check tests** - Do they pass and make sense?
- ✅ **Verify conventions** - Naming, structure, imports
- ✅ **Look for edge cases** - What could go wrong?
- ✅ **Consider performance** - Any bottlenecks?

---

## 🏷️ Release Management

### Version Strategy

```bash
# Semantic versioning
MAJOR.MINOR.PATCH

# Examples
1.0.0    # Initial release
1.0.1    # Bug fix
1.1.0    # New feature
2.0.0    # Breaking change
```

### Release Process

```bash
# 1. Update version
npm version patch|minor|major

# 2. Generate changelog
npx conventional-changelog -p angular -i CHANGELOG.md -s

# 3. Create release PR
git checkout -b release/1.2.0
git commit -m "chore(release): 1.2.0"
git push origin release/1.2.0

# 4. Merge to main after review
# 5. Tag release
git tag v1.2.0
git push origin v1.2.0
```

---

## 📊 Monitoring and Maintenance

### Performance Monitoring

```bash
# Bundle analysis
npm run build
npx @next/bundle-analyzer

# Lighthouse audits
npx lighthouse http://localhost:3000

# Core Web Vitals monitoring
# Add to components for real user monitoring
```

### Dependency Management

```bash
# Check for outdated packages
npm outdated

# Update dependencies safely
npx npm-check-updates -i

# Security audit
npm audit
npm audit fix
```

### Code Quality Monitoring

```bash
# Test coverage report
npm test -- --coverage

# ESLint report
npm run lint -- --format=html --output-file=lint-report.html

# TypeScript strict checks
npx tsc --noEmit --strict
```

---

## 🎯 Team Collaboration

### Onboarding New Developers

```bash
# 1. Repository setup
git clone [repository-url]
cd [project-name]
nvm use
npm install

# 2. Development environment
cp .env.local.example .env.local
npm run dev

# 3. Run tests to verify setup
npm test

# 4. Read documentation
# - README.md for quick start
# - .docs/ for detailed guides
```

### Code Style Enforcement

The template automatically enforces style through:

- ✅ **ESLint** - Code quality and conventions
- ✅ **Prettier** - Code formatting
- ✅ **Husky** - Pre-commit hooks
- ✅ **TypeScript** - Type safety
- ✅ **Commitizen** - Commit message format

### Knowledge Sharing

- 📚 **Documentation** - Keep `.docs/` updated
- 🧪 **Tests** - Tests serve as usage examples
- 💬 **Code comments** - For complex business logic
- 📋 **ADRs** - Architecture Decision Records for major choices

---

## 🚨 Troubleshooting Workflow

### Common Issues and Solutions

**Husky hooks not working:**

```bash
# Reinstall Husky
rm -rf .husky
npm run prepare
```

**ESLint/Prettier conflicts:**

```bash
# Check configuration
npm run lint
npm run format

# Fix conflicts
npm run lint:fix
npm run format:fix
```

**TypeScript errors:**

```bash
# Clean TypeScript cache
rm -rf .next .turbo
npm run tsc
```

**Test failures:**

```bash
# Clear Jest cache
npm test -- --clearCache

# Update snapshots if needed
npm test -- --updateSnapshot
```

**Git issues:**

```bash
# Reset to last working state
git checkout main
git branch -D problematic-branch
git checkout -b new-branch
```

---

## ✅ Best Practices Summary

### Development

- 🎯 **Follow conventions** - Naming, structure, imports
- 🧪 **Write tests first** - TDD when possible
- 📝 **Document as you go** - Don't leave it for later
- 🔄 **Commit frequently** - Small, focused commits
- 🧹 **Keep it clean** - Regular refactoring

### Collaboration

- 💬 **Communicate clearly** - PRs, commits, comments
- 🔍 **Review thoroughly** - Both giving and receiving
- 📚 **Share knowledge** - Document decisions and patterns
- 🤝 **Help teammates** - Code reviews are learning opportunities
- 🎯 **Stay consistent** - Follow established patterns

### Quality

- ✅ **Automate quality checks** - Let tools catch issues
- 🧪 **Maintain test coverage** - Keep tests up to date
- 🔒 **Security first** - Regular audits and updates
- 📊 **Monitor performance** - Keep app fast and efficient
- 🔄 **Continuous improvement** - Regularly update practices

### Long-term Success

- 🏗️ **Think architecture** - Plan for scale
- 📈 **Measure impact** - Use data to guide decisions
- 🔄 **Iterate regularly** - Small improvements compound
- 🧠 **Learn continuously** - Stay updated with best practices
- 🎯 **Focus on value** - Every change should add user value

---

**Following these workflows ensures consistent, high-quality development that scales with your team and project growth.** 🚀
