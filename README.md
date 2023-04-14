I have implemented basic functionality + additional task with "when hovering, play video without sound." and "Buttons W and S can change speed of your player"

I have used vue3 (composition api) + typescript. 
About typescript, I need more time to configure types and interfaces. And last 2 years  I was using vue2 + option api, and I am not sure, so I am glad to receive some feedback and recommendations : )

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
