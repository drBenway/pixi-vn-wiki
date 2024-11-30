# Make your first game in Pixi’VN

This tutorial will guide you through the process of creating your first Visual Novel.

For testing purposes we will recreate the visual novel Breakdown with Pixi’VN in this guide. Breakdown is a short story that has all the features that a visual novel should have. Breakdown was created by Josh Powlison (<https://joshpowlison.itch.io/breakdown>)

Since Pixi’VN gives you the ability to write your [narration in different types of languages](/start/narration.md), it will be explained at each step how to do it with each language.

## Create a new project

The first step is to create a new project. You can find more information on how to create a new project starting from a template [here](/start/getting-started.md#project-initialization). We will use the "Visual Novel - React Template".

## Character creation

Now we will define the characters of this story. To do this we will define in the `/values/characters.ts` file the characters that we will be using. For more information on how to create and use characters you can consult: [Characters](/start/character.md) & [Use the characters in *ink*](/ink/ink-character.md)

:::tabs

== /values/characters.ts

```ts
import { saveCharacter } from "@drincs/pixi-vn";
import Character from "../models/Character";

export const mc = new Character('mc', {
    name: 'Me',
});

export const james = new Character('james', {
    name: 'James',
    color: "#0084ac"
});

export const steph = new Character('steph', {
    name: 'Steph',
    color: "#ac5900"
});

export const sly = new Character('sly', {
    name: 'Sly',
    color: "#6d00ac"
});

saveCharacter([mc, james, steph, sly]);
```

== App.tsx

```ts
// Remember to import the character file at least once into your project. // [!code focus]
import "./values/characters"; // [!code focus]

export default function App() {
return // ...
}
```

:::

## First draft of the narrative

## Edit character information and use it as variables

## Use Markdown in the narrative

## Using the canvas

## Add a background and character images

## Add music and sound effects
