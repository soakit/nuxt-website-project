# nuxt-website-project

## 1.搭建

```bash
npx create-nuxt-app nuxt-website-project
```

> create-nuxt-app v3.6.0
  ✨  Generating Nuxt.js project in nuxt-website-project
  ? Project name: nuxt-website-project
  ? Programming language: TypeScript
  ? Package manager: Yarn
  ? UI framework: Ant Design Vue
  ? Nuxt.js modules: Axios - Promise based HTTP client, Progressive Web App (PWA)
  ? Linting tools: ESLint, Prettier, Lint staged files, StyleLint, Commitlint
  ? Testing framework: Nightwatch
  ? Rendering mode: Universal (SSR / SSG)
  ? Deployment target: Server (Node.js hosting)
  ? Development tools: jsconfig.json (Recommended for VS Code if you\'re not using typescript)
  ? Continuous integration: None
  ? Version control system: Git

## 2.添加less支持

```bash
# https://github.com/nuxt-community/style-resources-module
yarn add -D @nuxtjs/style-resources
yarn add less-loader@7.3.0 less
```

## 3.i18n和cookie-universal-nuxt

```bash
yarn add cookie-universal-nuxt vue-i18n
```

## 命令

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
