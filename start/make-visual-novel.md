# Make your first game in Pixi’VN

This tutorial will guide you through the process of creating your first Visual Novel.

For testing purposes we will recreate the visual novel Breakdown with Pixi’VN in this guide. Breakdown is a short story that has all the features that a visual novel should have. Breakdown was created by Josh Powlison (<https://joshpowlison.itch.io/breakdown>)

Since Pixi’VN gives you the ability to write your [narration in different types of languages](/start/narration.md), it will be explained at each step how to do it with each language.

## Create a new project

The first step is to create a new project. You can find more information on how to create a new project starting from a template [here](/start/getting-started.md#project-initialization). We will use the "Visual Novel - React Template".

## Character creation

Now we will define the characters of this story. To do this we will define in the `/values/characters.ts` file the characters that we will be using. For more information on how to create and use characters you can consult: [Characters](/start/character.md) & [Use the characters in *ink*](/ink/ink-character.md)

What does `mc` mean? `mc` is a common abbreviation for "Main Character". It is a common practice in visual novels to use `mc` as the main character's name.

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

Now we can start drafting the [narrative](/start/narration.md) of the visual novel.
We will create the first ["label"](/start/labels.md) called `start`, which will be the beginning of the game.

After that we can write the [dialogues](/start/dialogue.md) that will follow in our visual novel. The template we have chosen supports the [markup language markdown](/start/markdown.md) so we will use it for our narration.

This is the example in Typescript:

:::tabs

== /labels/startLabel.ts

```ts
const startLabel = newLabel("start", [
    () => narration.dialogue = { character: james, text: "You're my roommate's replacement, huh?" },
    () => narration.dialogue = { character: james, text: "Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!" },
    () => narration.dialogue = { character: mc, text: "..." },
    () => { narration.dialogue = "He thrusts out his hand." },
    () => narration.dialogue = { character: james, text: "James!" },
    () => narration.dialogue = { character: mc, text: "...Peter." },
    () => { narration.dialogue = "I take his hand and shake." },
    () => narration.dialogue = { character: james, text: "Ooh, Peter! Nice, firm handshake! The last quy always gave me the dead fish. I already think we'r gonna get along fine." },
    () => narration.dialogue = { character: james, text: "Come on in and..." },
    () => narration.dialogue = { character: james, text: "..." },
    () => narration.dialogue = { character: james, text: "I know you're both watching, come on out already!" },
    () => narration.dialogue = { character: james, text: "I just wanted to see what the new guy was like. Hey, you, Peter- be nice to our little brother, or you'll have to deal with *us*." },
    () => narration.dialogue = { character: mc, text: "..." },
    () => narration.dialogue = { character: james, text: "Peter, this is Sly. Yes, that is her real name." },
    () => { narration.dialogue = "I put out my hand." },
    () => narration.dialogue = { character: james, text: "I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy." },
    () => narration.dialogue = { character: mc, text: "Fair enough, I'm a pretty scary guy, or so l've been told." },
    () => narration.dialogue = { character: james, text: "The redhead behind her is Stephanie." },
    () => narration.dialogue = { character: steph, text: "Hey! Everyone calls me Steph. I'll shake your hand." },
    // ...
]);
export default startLabel;
```

:::

This is the example in *ink*:

:::tabs

== /ink/start.ink

```ink
=== start ===
james: You're my roommate's replacement, huh?
james: Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!
mc: ...

He thrusts out his hand.

james: James!
mc: ...Peter.

I take his hand and shake.

james: Ooh, Peter! Nice, firm handshake! The last quy always gave me the dead fish. I already think we'r gonna get along fine.
james: Come on in and...
james: ...
james: I know you're both watching, come on out already!

sly: I just wanted to see what the new guy was like. Hey, you, Peter- be nice to our little brother, or you'll have to deal with *us*.
mc: ...
james: Peter, this is Sly. Yes, that is her real name.

I put out my hand.

sly: I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy.
mc: Fair enough, I'm a pretty scary guy, or so l've been told.
james: The redhead behind her is Stephanie.
steph: Hey! Everyone calls me Steph. I'll shake your hand.

// ...

-> DONE
```

:::

### Split the narrative into labels

## Edit character information and use it as variables

## Use Markdown in the narrative

## Using the canvas

## Add a background and character images

## Add music and sound effects
