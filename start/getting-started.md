# Getting Started

If you have already initialized a new project for your visual novel, you can jump to the [installation](#installation) section.

## Prerequisites

* [Node.js](https://nodejs.org/) version 18 or higher.
* Text Editor with TypeScript support.
  * VSCode is recommended.

## Initialize a new project

If you want create a new project from scratch it is recommended initialize a new project with [Vite](https://vitejs.dev/). Otherwise you can use one of the following templates.

### Pivi'VN Templates

**[Pixi’VN template (React + Vite + MUI joy)](https://github.com/DRincs-Productions/pixi-vn-react-template)** is a template for creating visual novels in React, contains basic functionality inspired by Ren'Py. (you can try this template [here](https://pixi-vn-react-template.web.app/))

This template uses the following libraries:

* [Pixi'VN](https://www.npmjs.com/package/@drincs/pixi-vn)
* [Vite](https://vitejs.dev/)
* [Vite Checker](https://www.npmjs.com/package/vite-plugin-checker)
* [PWA Vite Plugin](https://vite-pwa-org.netlify.app)
* [Recoil](https://recoiljs.org/)
* [React Router](https://reactrouter.com/)
* [Mui Joy](https://mui.com/joy-ui/getting-started/)
* [Framer Motion](https://www.framer.com/motion/)
* [Notistack](https://iamhosseindhv.com/notistack)
* [i18next](https://www.i18next.com/)
* [Reacr Markdown](https://www.npmjs.com/package/react-markdown)

## Installation

For installing the Pixi’VN package, you can use the following command:

```bash
# for npm
npm install @drincs/pixi-vn
# for yarn
yarn add @drincs/pixi-vn
```

## Usage

Now you must initialize the Pixi’VN window before using the engine.

For example, you add the following code to the `main.ts` or `index.ts` (It depends on your project configuration):

```typescript
import { GameWindowManager } from '@drincs/pixi-vn'
import App from './App'
import './index.css'

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

GameWindowManager.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
})
```

### How enable the decorators in TypeScript?

In Pixi’VN, in some advanced features, it is necessary to use decorators.

By default, TypeScript does not enable the use of decorators. To enable the use of decorators in TypeScript, you must add the following configuration to the `tsconfig.json` file:

```json
{
    "compilerOptions": {
        // ...
        "experimentalDecorators": true
    }
}
```
