# Make your first Visual Novel

This tutorial will guide you through the process of creating your first Visual Novel.

**What is a Visual Novel?** A visual novel is a type of video game that is similar to an interactive story. It is a game that is mostly text-based and has a lot of dialogue. Visual novels are popular in Japan and are often used to tell stories that are too complex for a traditional video game.

For testing purposes we will recreate the visual novel [Breakdown](https://joshpowlison.itch.io/breakdown) with Pixi’VN in this guide. Breakdown is a short story that has all the features that a visual novel should have. Josh Powlison, the creator of Breakdown, has given us permission to use his narration for educational purposes❤️.

Since Pixi’VN gives you the ability to write your [narration in different types of languages](/start/narration.md), it will be explained at each step how to do it with each language.

## Create a new project

The first step is to create a new project. You can find more information on how to create a new project starting from a template [here](/start/getting-started.md#project-initialization). We will use the "Visual Novel - React Template".

After the creation is complete, it is very important to read the `README.md` file that is in the root of the project. This file contains important information about the project and how to use it.

In our case, to start the project we will simply need to execute the following commands:

```bash
npm install
npm start
```

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

After that we can write the [dialogues](/start/dialogue.md) that will follow in our visual novel. The template we have chosen supports the [markup language markdown](/start/markup-markdown.md) ([Markup language in ink](/ink/ink-markup.md)) so we will use it for our narration.

This is the example:

:::tabs

== ink example

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

== Typescript example

```ts
const startLabel = newLabel("start", [
    () => narration.dialogue = { character: james, text: `You're my roommate's replacement, huh?` },
    () => narration.dialogue = { character: james, text: `Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!` },
    () => narration.dialogue = { character: mc, text: `...` },
    () => { narration.dialogue = "He thrusts out his hand." },
    () => narration.dialogue = { character: james, text: `James!` },
    () => narration.dialogue = { character: mc, text: `...Peter.` },
    () => { narration.dialogue = "I take his hand and shake." },
    () => narration.dialogue = { character: james, text: `Ooh, Peter! Nice, firm handshake! The last quy always gave me the dead fish. I already think we'r gonna get along fine.` },
    () => narration.dialogue = { character: james, text: `Come on in and...` },
    () => narration.dialogue = { character: james, text: `...` },
    () => narration.dialogue = { character: james, text: `I know you're both watching, come on out already!` },
    () => narration.dialogue = { character: james, text: `I just wanted to see what the new guy was like. Hey, you, Peter- be nice to our little brother, or you'll have to deal with *us*.` },
    () => narration.dialogue = { character: mc, text: `...` },
    () => narration.dialogue = { character: james, text: `Peter, this is Sly. Yes, that is her real name.` },
    () => { narration.dialogue = "I put out my hand." },
    () => narration.dialogue = { character: james, text: `I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy.` },
    () => narration.dialogue = { character: mc, text: `Fair enough, I'm a pretty scary guy, or so l've been told.` },
    () => narration.dialogue = { character: james, text: `The redhead behind her is Stephanie.` },
    () => narration.dialogue = { character: steph, text: `Hey! Everyone calls me Steph. I'll shake your hand.` },
    // ...
]);
export default startLabel;
```

:::

### Split the narrative into labels

It is not recommended to create very long labels (even for linear visual novels), but it is recommended to create many small labels and open them as needed with pixi's [features to control the flow of the game](/start/labels-flow.md) ([ink knot (or label)](/ink/ink-label.md)).

For this reason, even if in our case our story is linear, it will be divided into two labels, the first one will be the one we have already created, and the second one will be called `second_part`.

This is the example:

:::tabs

== ink example

```ink
=== start ===
james: You're my roommate's replacement, huh?
james: Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!
mc: ...

He thrusts out his hand.

james: James!
mc: ...Peter.

// ...

-> second_part

=== second_part ===

She enters my room before I'VE even had a chance to. \\n\\n...I could've just come back and gotten the platter later...
She sets it on a desk. I throw my two paper bags down beside the empty bed.

steph: They got you a new mattress, right? That last guy was a druggie, did James tell you that?
sly: *We're* the reason he got expelled!
steph: Sly! If word gets out about that... well, actually, it wouldn't matter, *he's* the one who shot himself up.

I'm fumbling for a new subject.

// ...

-> DONE
```

== Typescript example

```ts
const startLabel = newLabel("start", [
    () => narration.dialogue = { character: james, text: `You're my roommate's replacement, huh?` },
    () => narration.dialogue = { character: james, text: `Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!` },
    () => narration.dialogue = { character: mc, text: `...` },
    () => { narration.dialogue = "He thrusts out his hand." },
    () => narration.dialogue = { character: james, text: `James!` },
    () => narration.dialogue = { character: mc, text: `...Peter.` },
    // ...
    async (props) => await narration.jumpLabel(secondPart, props),
]);
export default startLabel;

const secondPart = newLabel("second_part", [
    () => { narration.dialogue = `She enters my room before I'VE even had a chance to. \n\n...I could've just come back and gotten the platter later...` },
    () => { narration.dialogue = `She sets it on a desk. I throw my two paper bags down beside the empty bed.` },
    () => narration.dialogue = { character: steph, text: `They got you a new mattress, right? That last guy was a druggie, did James tell you that?` },
    () => narration.dialogue = { character: sly, text: `*We're* the reason he got expelled!` },
    () => narration.dialogue = { character: steph, text: `Sly! If word gets out about that... well, actually, it wouldn't matter, *he's* the one who shot himself up.` },
    () => { narration.dialogue = `I'm fumbling for a new subject.` },
    // ...
]);
```

:::

## Choice Menus

Now we would ask the player if he wants to continue with the second part of the visual novel.

To do this we will use the [choice menus](/start/choices.md).

This is the example:

:::tabs

== ink example

```ink
=== start ===

// ...

You want continue to the next part?
* Yes, I want to continue
-> second_part
* No, I want to stop here
-> END

=== second_part ===

// ...

-> DONE
```

== Typescript example

```ts
const startLabel = newLabel("start", [
    // ...
    async () => {
        narration.dialogue = `You want continue to the next part?`
        narration.choiceMenuOptions = [
            new ChoiceMenuOption("Yes, I want to continue", secondPart, {}, { type: "jump" }),
            new ChoiceMenuOptionClose("No, I want to stop here"),
        ]
    },
]);
export default startLabel;

const secondPart = newLabel("second_part", [
    // ...
]);
```

:::

## Edit character information and use it as variables

Now I give the player the opportunity to choose the name of the `mc`.

To do this, I request the player to [enter an inputs using Pixi’VN's features](/start/input.md) ([Use input in *ink*](/ink/ink-input.md)).

After obtaining the value of the input you can [set the name of the character](/start/character.md#edit-characters-in-the-game) equal to the value obtained ([Edit character name in *ink*](/ink/ink-character.md#edit-character-name-in-dialogues)).

This is the example:

:::tabs

== ink example

```ink
VAR _input_value_ = ""

=== start ===
// ...

He thrusts out his hand.
# request input type string default Peter
What is your name?
# rename mc { _input_value_ }

// ...

-> DONE
```

== Typescript example

```ts
const startLabel = newLabel("start", [
    // ...
    () => { narration.dialogue = `He thrusts out his hand.` },
    () => {
        narration.requestInput({ type: "string" }, "Peter")
        narration.dialogue = `What is your name?`
    },
    () => {
        mc.name = narration.inputValue as string
    },
    // ...
]);
export default startLabel;
```

:::

Now we could use character names within dialogues ([Use character name in dialogues in *ink*](/ink/ink-character.md#use-character-name-in-dialogues)).

This is the example:

:::tabs

== ink example

```ink
VAR steph_fullname = "Stephanie"

=== start ===
// ...

sly: I just wanted to see what the new guy was like. Hey, you, [mc]- be nice to our little brother, or you'll have to deal with *us*.
mc: ...
james: [mc], this is [sly]. Yes, that is her real name.

I put out my hand.

sly: I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy.
mc: Fair enough, I'm a pretty scary guy, or so l've been told.
james: The redhead behind her is [steph_fullname].
steph: Hey! Everyone calls me [steph]. I'll shake your hand.

She puts out her hand, and I take it.

mc: Thanks, good to meet you, [steph_fullname].
steph: WOW, that is, like, the most perfect handshake I've ever had! Firm, but also gentle. [sly], you *gotta* shake his hand!

// ...

-> DONE
```

== Typescript example

```ts
const steph_fullname = "Stephanie";

const startLabel = newLabel("start", [
    // ...
    () => narration.dialogue = { character: sly, text: `I just wanted to see what the new guy was like. Hey, you, ${mc.name}- be nice to our little brother, or you'll have to deal with *us*.` },
    () => narration.dialogue = { character: mc, text: `...` },
    () => narration.dialogue = { character: james, text: `${mc.name}, this is ${sly.name}. Yes, that is her real name.` },
    () => { narration.dialogue = `I put out my hand.` },
    () => narration.dialogue = { character: sly, text: `I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy.` },
    () => narration.dialogue = { character: mc, text: `Fair enough, I'm a pretty scary guy, or so I've been told.` },
    () => narration.dialogue = { character: james, text: `The redhead behind her is ${steph_fullname}.` },
    () => narration.dialogue = { character: steph, text: `Hey! Everyone calls me ${steph.name}. I'll shake your hand.` },
    () => { narration.dialogue = `She puts out her hand, and I take it.` },
    () => narration.dialogue = { character: mc, text: `Thanks, good to meet you, ${steph_fullname}.` },
    () => narration.dialogue = { character: steph, text: `WOW, that is, like, the most perfect handshake I've ever had! Firm, but also gentle. ${sly.name}, you *gotta* shake his hand!` },
    // ...
]);
export default startLabel;
```

:::

## Use dialogue glue

To improve the narrative, it can be useful to break up a dialogue and continue it in the next step. To do this we can use the [glue functionality](/start/dialogue.md#dialogue-glue).

This is the example:

:::tabs

== ink example

```ink
=== start ===
// ...

james: Ooh, [mc]! Nice, firm handshake!
<> The last guy always gave me the dead fish.
<> I already think we're gonna get along fine.
james: Come on in and...

// ...

-> DONE
```

== Typescript example

```ts
const startLabel = newLabel("start", [
    // ...
    async () => narration.dialogue = { character: james, text: `Ooh, ${mc.name}! Nice, firm handshake!` },
    async () => {
        narration.dialogGlue = true
        narration.dialogue = ` The last guy always gave me the dead fish.`
    },
    async () => {
        narration.dialogGlue = true
        narration.dialogue = ` I already think we're gonna get along fine.`
    },
    async () => narration.dialogue = { character: james, text: `Come on in and...` },
    // ...
]);
export default startLabel;
```

:::

## Define assets and load them

This page is under construction.

This is the example:

:::tabs

== ink example

```ink
```

== Typescript example

```ts
```

:::

## Add a background and character images

This page is under construction.

This is the example:

:::tabs

== ink example

```ink
```

== Typescript example

```ts
```

:::

## Use transitions

This page is under construction.

This is the example:

:::tabs

== ink example

```ink
```

== Typescript example

```ts
```

:::

## Use animations and effects or create your ticker

This page is under construction.

## Add music and sound effects

This page is under construction.
