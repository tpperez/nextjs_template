# Development Tools

Available npm scripts for development workflow.

## environment setup

```bash
# install node version from .nvmrc
nvm install && nvm use

# install dependencies
npm install
```

## development

```bash
# start development server with turbopack
npm run dev

# create production build
npm run build

# create production build with bundle analysis
npm run analyze

# start production server
npm run start
```

## code quality

```bash
# typescript type check
npm run tsc

# lint code
npm run lint

# lint with auto-fix
npm run lint:fix

# format code
npm run format:fix

# check formatting
npm run format
```

## testing

```bash
# run tests
npm run test

# test watch mode
npm run test:watch

# test coverage report
npm run test:coverage

# test interactive ui
npm run test:ui
```
