( the wiki is under development )

# Pixi'VN - Pixi Visual Novel Engine

Pixi'VN is a npm package that provides various features for creating visual novels.

Pixi'VN has functions to manage story steps, saving and loading, variable storage, dialogues, and character creation.

Pixi'VN is based on [Pixi.js](https://pixijs.com/), a modern 2D rendering engine, expanding the features by adding a save and load system, and functions to simplify the addition of images and animations.

## Use Pivi'VN Template

( Coming soon )

## Get Started

### Installation

```bash
npm install pixi-vn
```

### Usage

For the following example we will use TypeScript, but you can use JavaScript as well.

```typescript
// main.ts
import { GameWindowManager } from '@drincs/pixi-vn'
import App from './App'
import './index.css'

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

await GameWindowManager.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
})
```

## First steps

After setting up the interface, you can start creating the visual novel using Pixi'VN functions.

* [Add JavaScript framework for interface](Add-JavaScript-framework-for-interface)
* [Characters](Characters)
* [Dialogue and Narration](Dialogue-and-Narration)
* [Menus or Game Choice](Menus-or-Game-Choice)
* [Label and Game Step](Label-and-Game-Step)
* [Game Storage](Game-Storage)
* [Save and Load](Save-and-Load)
* [Images](Images)

## Advanced topics

* [Canvas Elements](Canvas-Elements)
* [Animations and Effects](Animations-and-Effects)
* [Stored Classes](Stored-Classes)

```{toctree}
:hidden:
:caption: Introduction
index
```

```{toctree}
:hidden:
:caption: First steps
Add-JavaScript-framework-for-interface
Characters
Dialogue-and-Narration
Menus-or-Game-Choice
Label-and-Game-Step
Game-Storage
Save-and-Load
Images
```

```{toctree}
:hidden:
:caption: Advanced topics
Canvas-Elements
Animations-and-Effects
Stored-Classes
```
