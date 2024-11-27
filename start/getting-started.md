# Getting Started

You can start using Pixi’VN by [initializing a new project](#project-initialization) or [installing the package](#package-installation) in an existing project.

## Prerequisites

Before starting, you must have the following tools installed:

* [Node.js](https://nodejs.org/) version 18 or higher.
* Text Editor with TypeScript support.
  * [Visual Studio Code](https://code.visualstudio.com/)
  * [Cursor](https://www.cursor.com/)
* (Recommended) [Git](https://git-scm.com/)
  * Have a [GitHub account](https://github.com/)

## Project Initialization

If you want to start a new project, you can use the following command to initialize a new project with the Pixi’VN template:

:::tabs
== npm

```bash
npm create pixi-vn@latest
```

== yarn

```bash
yarn create pixi-vn@latest
```

== pnpm

```bash
pnpm create pixi-vn@latest
```

== bun

```bash
bun create pixi-vn@latest
```

:::

The supported template presets are:

* **[Visual Novel - React - Typescript - Web page](https://github.com/DRincs-Productions/pixi-vn-react-template)**
* **[Visual Novel - React - Typescript - Web page + Desktop + Mobile](https://github.com/DRincs-Productions/pixi-vn-react-template/tree/tauri)**
* **[Visual Novel - React - Ink + Typescript - Web page](https://github.com/DRincs-Productions/pixi-vn-react-ink-template)**
* **[Visual Novel - React - Ink + Typescript - Web page + Desktop + Mobile](https://github.com/DRincs-Productions/pixi-vn-react-ink-template/tree/tauri)**

( More templates will be added in the future, see this [issue](https://github.com/DRincs-Productions/pixi-vn/issues/162) for more information )

After the project is initialized, you can open the project directory with your text editor (VSCode is recommended) and start developing your visual novel.

Into all templates there is a `README.md` file with more information about the project.

## Package Installation

For installing the Pixi’VN package, you can use the following command:

:::tabs
== npm

```bash
npm install @drincs/pixi-vn
```

== yarn

```bash
yarn add @drincs/pixi-vn
```

== pnpm

```bash
pnpm add @drincs/pixi-vn
```

== bun

```bash
bun add @drincs/pixi-vn
```

:::

Now you must initialize the Pixi’VN window before using the engine.

For example, you add the following code to the `main.ts` or `index.ts` (It depends on your project configuration):

```typescript
import { canvas, narration, clearAllGameDatas } from '@drincs/pixi-vn'
import App from './App'
import './index.css'

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

canvas.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
})

// read more here: https://pixi-vn.web.app/start/labels.html#how-manage-the-end-of-the-game
narration.onGameEnd = async (props) => {
    clearAllGameDatas()
    props.navigate("/")
}
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
