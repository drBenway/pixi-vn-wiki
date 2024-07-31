# Getting Started

You can start using Pixi’VN by [initializing a new project](#project-initialization) or [installing the package](#package-installation) in an existing project.

## Prerequisites

* [Node.js](https://nodejs.org/) version 18 or higher.
* Text Editor with TypeScript support.
  * [Visual Studio Code](https://code.visualstudio.com/) is recommended.

## Project Initialization

To initialize a new project, you can use the following command:

```bash
# npm
npm create pixi-vn@latest

# yarn
yarn create pixi-vn@latest

# pnpm
pnpm create pixi-vn@latest

# bun
bun create pixi-vn@latest
```

The supported template presets are:

**[Basic Visual Novel - Web page (Vite + React + MUI joy)](https://github.com/DRincs-Productions/pixi-vn-react-template)**

( More templates will be added in the future, see this [issue](https://github.com/DRincs-Productions/pixi-vn/issues/162) for more information )

After the project is initialized, you can open the project directory with your text editor (VSCode is recommended) and start developing your visual novel.

Into all templates there is a `README.md` file with more information about the project.

## Package Installation

For installing the Pixi’VN package, you can use the following command:

```bash
# npm
npm install @drincs/pixi-vn

# yarn
yarn add @drincs/pixi-vn

# pnpm
pnpm add @drincs/pixi-vn

# bun
bun add @drincs/pixi-vn
```

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
