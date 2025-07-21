# Code Quality Standards

Code standards enforcement including linting configurations, formatting rules, pre-commit automation, and code review criteria.

## eslint configuration

### comprehensive linting rules

eslint configuration extends multiple rulesets for thorough code quality:

```javascript
// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
  recommendedConfig: js.configs.recommended,
})

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'prefer-arrow-functions': preferArrowFunctions,
      'simple-import-sort': simpleImportSort,
      prettier: prettier,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // typescript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',

      // react rules
      'react/prop-types': 'off', // typescript handles this
      'react/react-in-jsx-scope': 'off', // next.js handles this
      'react/display-name': 'warn',
      'react/jsx-key': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',

      // react hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // arrow function preference
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],

      // import sorting
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // react imports first
            ['^react', '^@?\\w'],
            // internal imports
            ['^@/'],
            // relative imports
            ['^\\.\\./', '^\\./'],
            // type imports
            ['^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // general code quality
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-unused-vars': 'off', // handled by typescript
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // prettier integration
      'prettier/prettier': 'error',
    },
  },
]
```

### typescript-specific rules

enhanced typescript linting with type-aware rules:

```javascript
// typescript-specific configuration
export const typescriptRules = {
  // strict type checking
  '@typescript-eslint/strict-boolean-expressions': [
    'error',
    {
      allowString: false,
      allowNumber: false,
      allowNullableObject: false,
    },
  ],

  // naming conventions
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'interface',
      format: ['PascalCase'],
      prefix: ['I'],
    },
    {
      selector: 'typeAlias',
      format: ['PascalCase'],
      prefix: ['T'],
    },
    {
      selector: 'enum',
      format: ['PascalCase'],
    },
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      filter: {
        regex: '^(React|Component|_).*$',
        match: false,
      },
    },
  ],

  // function and method rules
  '@typescript-eslint/explicit-function-return-type': [
    'warn',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    },
  ],
  '@typescript-eslint/prefer-readonly': 'error',
  '@typescript-eslint/prefer-readonly-parameter-types': 'off',

  // import rules
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: true,
    },
  ],

  // promise handling
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
}
```

## prettier configuration

### consistent formatting rules

prettier ensures consistent code formatting across the project:

```javascript
// prettier.config.mjs
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',

  // plugin configurations
  plugins: ['prettier-plugin-tailwindcss'],

  // tailwind class sorting
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn', 'cva'],

  // file-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
}
```

### formatting integration

prettier integrates with development workflow:

```javascript
// format script examples
const formatCommands = {
  // format all files
  formatAll: 'prettier . --write',

  // check formatting without changes
  formatCheck: 'prettier . --check',

  // format specific file types
  formatTypeScript: 'prettier "**/*.{ts,tsx}" --write',
  formatMarkdown: 'prettier "**/*.md" --write',

  // format staged files only
  formatStaged: 'lint-staged',
}

// ide integration settings
const vscodeSettings = {
  'editor.formatOnSave': true,
  'editor.defaultFormatter': 'esbenp.prettier-vscode',
  'editor.codeActionsOnSave': {
    'source.fixAll.eslint': true,
  },
  '[typescript]': {
    'editor.formatOnSave': true,
  },
  '[typescriptreact]': {
    'editor.formatOnSave': true,
  },
}
```

## pre-commit automation

### husky git hooks

automated quality checks before commits:

```bash
#!/usr/bin/env sh
# .husky/pre-commit

# type checking
echo "🔍 running type check..."
npm run tsc

if [ $? -ne 0 ]; then
  echo "❌ typescript compilation failed"
  exit 1
fi

# test execution
echo "🧪 running tests..."
npm run test

if [ $? -ne 0 ]; then
  echo "❌ tests failed"
  exit 1
fi

# lint-staged processing
echo "🎨 running lint-staged..."
npx lint-staged

if [ $? -ne 0 ]; then
  echo "❌ linting or formatting failed"
  exit 1
fi

echo "✅ pre-commit checks passed"
```

### lint-staged configuration

process only staged files for efficiency:

```javascript
// .lintstagedrc.mjs
import { relative } from 'path'

const buildFormatCommand = (filenames) => {
  return `prettier --write ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(' ')}`
}

const buildLintCommand = (filenames) => {
  return `next lint --fix --no-cache --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(' --file ')}`
}

const buildTestCommand = (filenames) => {
  // run tests related to changed files
  const testFiles = filenames
    .filter((f) => f.includes('.test.') || f.includes('.spec.'))
    .map((f) => relative(process.cwd(), f))

  if (testFiles.length > 0) {
    return `vitest run ${testFiles.join(' ')}`
  }

  // if no test files changed, run all tests
  return 'npm run test'
}

export default {
  // typescript and javascript files
  '*.{js,jsx,ts,tsx}': [buildFormatCommand, buildLintCommand, buildTestCommand],

  // markdown files
  '*.md': ['prettier --write'],

  // json files
  '*.json': ['prettier --write'],

  // css and styling files
  '*.{css,scss,sass}': ['prettier --write'],

  // yaml configuration files
  '*.{yml,yaml}': ['prettier --write'],
}
```

### commit message standards

conventional commits with validation:

```javascript
// commitlint.config.mjs
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // build system or external dependencies
        'chore', // maintenance tasks
        'ci', // ci configuration changes
        'docs', // documentation changes
        'feat', // new features
        'fix', // bug fixes
        'perf', // performance improvements
        'refactor', // code refactoring
        'revert', // reverts previous commit
        'style', // formatting changes
        'test', // test additions or modifications
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
}

// example commit messages
const commitExamples = {
  feature: 'feat(auth): add jwt token refresh mechanism',
  bugfix: 'fix(pokemon): resolve species data fetching error',
  documentation: 'docs(readme): update installation instructions',
  refactoring: 'refactor(components): simplify spinner component logic',
  performance: 'perf(cache): optimize query cache invalidation',
  testing: 'test(hooks): add comprehensive pokemon species hook tests',
  maintenance: 'chore(deps): update react to version 19.1.0',
  styling: 'style(components): apply consistent formatting',
}
```

## code review standards

### review checklist

comprehensive code review criteria:

```markdown
## code review checklist

### functionality

- [ ] code fulfills requirements and acceptance criteria
- [ ] edge cases are handled appropriately
- [ ] error handling is comprehensive and user-friendly
- [ ] performance impact is acceptable

### code quality

- [ ] code follows established patterns and conventions
- [ ] functions are focused and have single responsibility
- [ ] variable and function names are descriptive and clear
- [ ] code is DRY (don't repeat yourself) where appropriate
- [ ] magic numbers and strings are extracted to constants

### typescript usage

- [ ] proper type definitions without excessive use of `any`
- [ ] interfaces and types follow naming conventions
- [ ] generic types are used appropriately
- [ ] type assertions are justified and safe

### react best practices

- [ ] components have clear, focused responsibility
- [ ] hooks are used correctly and follow rules of hooks
- [ ] prop types are properly defined and documented
- [ ] component re-rendering is optimized where necessary
- [ ] accessibility requirements are met

### testing

- [ ] new functionality includes appropriate tests
- [ ] tests cover happy path and error scenarios
- [ ] test names are descriptive and follow conventions
- [ ] mocks are used appropriately and don't over-mock

### security

- [ ] user inputs are validated and sanitized
- [ ] sensitive data is handled securely
- [ ] authentication and authorization are properly implemented
- [ ] no hardcoded secrets or credentials

### performance

- [ ] unnecessary re-renders are avoided
- [ ] large lists are virtualized if needed
- [ ] images are optimized and properly sized
- [ ] network requests are optimized and cached appropriately

### documentation

- [ ] complex logic is explained with comments
- [ ] public apis are documented with jsdoc
- [ ] readme and documentation are updated if needed
- [ ] breaking changes are clearly documented
```

### automated code analysis

static analysis tools integration:

```typescript
// code metrics monitoring
interface ICodeMetrics {
  complexity: number
  maintainability: number
  testCoverage: number
  duplicatedLines: number
  codeSmells: number
}

// complexity thresholds
const COMPLEXITY_THRESHOLDS = {
  LOW: 5,
  MEDIUM: 10,
  HIGH: 15,
  CRITICAL: 20,
}

// automated analysis configuration
const analysisConfig = {
  // sonarqube configuration
  sonarqube: {
    projectKey: 'pokemon-app',
    coverage: {
      exclusions: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/test/**',
        '**/*.config.*',
        '**/coverage/**',
      ],
    },
    rules: {
      'typescript:S1541': 'error', // cognitive complexity
      'typescript:S138': 'error', // function length
      'typescript:S1067': 'error', // expression complexity
      'typescript:S3776': 'error', // cognitive complexity
    },
  },

  // codeclimate configuration
  codeclimate: {
    version: '2',
    plugins: {
      eslint: {
        enabled: true,
        config: './eslint.config.mjs',
      },
      duplication: {
        enabled: true,
        config: {
          languages: ['typescript', 'javascript'],
        },
      },
    },
    exclude_patterns: [
      'coverage/**',
      'node_modules/**',
      '**/*.test.*',
      '**/*.spec.*',
    ],
  },
}
```

## continuous quality monitoring

### quality gates

quality criteria for deployment:

```yaml
# quality gates configuration
quality_gates:
  coverage:
    minimum: 80

  duplication:
    maximum: 5

  maintainability:
    minimum: A

  reliability:
    minimum: A

  security:
    minimum: A

  complexity:
    maximum: 15

  technical_debt:
    maximum: 30min
```

### quality metrics tracking

monitor code quality trends over time:

```typescript
// quality metrics dashboard
interface IQualityMetrics {
  timestamp: string
  coverage: {
    lines: number
    branches: number
    functions: number
    statements: number
  }
  complexity: {
    cyclomatic: number
    cognitive: number
  }
  maintainability: {
    score: number
    grade: string
  }
  duplication: {
    percentage: number
    lines: number
  }
  issues: {
    bugs: number
    vulnerabilities: number
    codeSmells: number
  }
}

// quality trends analysis
const analyzeQualityTrends = (metrics: IQualityMetrics[]) => {
  const latest = metrics[metrics.length - 1]
  const previous = metrics[metrics.length - 2]

  return {
    coverage: {
      trend: latest.coverage.lines - previous.coverage.lines,
      status: latest.coverage.lines >= 80 ? 'passing' : 'failing',
    },
    complexity: {
      trend: latest.complexity.cyclomatic - previous.complexity.cyclomatic,
      status: latest.complexity.cyclomatic <= 15 ? 'passing' : 'failing',
    },
    maintainability: {
      trend: latest.maintainability.score - previous.maintainability.score,
      status: latest.maintainability.grade === 'A' ? 'passing' : 'failing',
    },
  }
}
```

## performance standards

### bundle size monitoring

track and optimize application bundle size:

```javascript
// bundle analyzer configuration
const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true',
  analyzeMode: 'static',
  reportFilename: 'bundle-analysis.html',
  defaultSizes: 'gzip',
  openAnalyzer: false,
  generateStatsFile: true,
  statsFilename: 'bundle-stats.json',
}

// bundle size thresholds
const BUNDLE_THRESHOLDS = {
  maxAssetSize: 512000, // 500kb
  maxEntrypointSize: 1024000, // 1mb
  maxChunkSize: 256000, // 250kb
}

// performance budgets
const performanceBudgets = {
  chunks: {
    vendor: '300kb',
    main: '250kb',
    runtime: '50kb',
  },
  assets: {
    js: '400kb',
    css: '100kb',
    images: '200kb',
    fonts: '100kb',
  },
}
```

### core web vitals monitoring

track key performance metrics:

```typescript
// web vitals tracking
interface IWebVitals {
  FCP: number // first contentful paint
  LCP: number // largest contentful paint
  FID: number // first input delay
  CLS: number // cumulative layout shift
  TTFB: number // time to first byte
}

// performance thresholds
const WEB_VITALS_THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
}

// performance monitoring
const trackWebVitals = (metric: IWebVitals) => {
  const performance = Object.keys(metric).map((key) => ({
    name: key,
    value: metric[key],
    rating: getRating(key, metric[key]),
  }))

  // send to analytics
  if (typeof window !== 'undefined') {
    window.gtag?.('event', 'web_vitals', {
      custom_map: { metric_name: 'custom_parameter' },
    })
  }
}
```
