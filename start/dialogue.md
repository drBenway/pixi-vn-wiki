# Dialogue

The dialogue/narration is the core of the visual novel.

In Pixi’VN, is possible to set/get a current dialogue and get the history of dialogues.
A dialogue can link to a [character](/start/character#use-characters-in-the-game) or a string and will be used to indicate who is speaking.

## Set the current Dialogue

To set the current dialogue, you can use the `narration.dialogue`.

::: react-sandbox {template=vite-react-ts coderHeight=749}

<<< @/snippets/react/index.css{#hidden}
<<< @/snippets/react/index.tsx{#hidden}
<<< @/snippets/react/App.tsx{#hidden}
<<< @/snippets/react/components/NextButton.tsx{prefix=#hidden/components/}
<<< @/snippets/react/screens/NarrationScreen.tsx{prefix=#hidden/screens/}
<<< @/snippets/react/screens/modals/TextInput.tsx{prefix=#hidden/screens/modals/}
<<< @/snippets/react/screens/ChoiceMenu.tsx{prefix=#hidden/screens/}
<<< @/snippets/react/use_query/useQueryInterface.ts{prefix=#hidden/use_query/}

```ts /labels/startLabel.ts [active]
import { Dialogue, narration, newLabel } from "@drincs/pixi-vn"
import { eggHead } from "../values/characters"

// What is a Label? https://pixi-vn.web.app/start/labels.html
export const startLabel = newLabel("start_label",
    [
        () => {
            // in this example, not exists a character with id 'Alice'
            // so when you get the current dialogue, the character is a fake character with the name 'Alice'
            narration.dialogue = {
                character: "Alice",
                text: "Hello, world!"
            }
        },
        () => {
            // in this example, exists a character with id 'egg-head'
            // so when you get the current dialogue, the character is the character with id 'egg-head'
            narration.dialogue = {
                character: 'egg-head',
                text: "Hello, world!"
            }
            // or better
            narration.dialogue = {
                character: eggHead,
                text: "Hello, world!"
            }
            // or
            narration.dialogue = new Dialogue("Hello, world!", eggHead)
        },
        // if don't want to set a character, you can set a string
        () => narration.dialogue = "Hello, world!",
    ],
)
```

```ts /values/characters.ts
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const eggHead = new CharacterBaseModel('egg-head', {
    name: 'Egg',
    surname: 'Head',
    age: 25,
    icon: "https://pixijs.com/assets/eggHead.png",
    color: "#9e2e12"
});

saveCharacter(eggHead);
```

:::

## Get the current Dialogue

To get the current dialogue, you can use `narration.dialogue`. The return is a `Dialogue`.

```typescript
const currentDialogue: Dialogue = narration.dialogue;
```

## Clear the current Dialogue

To clear the current dialogue, you can use `narration.dialogue = undefined`.

```typescript
narration.dialogue = undefined;
```

## How to create the narrative dialogue UI screen

For example:

::: react-sandbox {template=vite-react-ts coderHeight=512}

<<< @/snippets/react/index.css{#hidden}
<<< @/snippets/react/index.tsx{#hidden}
<<< @/snippets/react/App.tsx{#hidden}
<<< @/snippets/react/screens/NarrationScreen.tsx{prefix=#active/screens/}
<<< @/snippets/react/screens/modals/TextInput.tsx{prefix=#hidden/screens/modals/}
<<< @/snippets/react/screens/ChoiceMenu.tsx{prefix=#hidden/screens/}
<<< @/snippets/react/components/NextButton.tsx{prefix=/components/}

```ts /labels/startLabel.ts [readonly]
import { canvas, ChoiceMenuOption, narration, newLabel, showImage, Assets } from "@drincs/pixi-vn"

export const startLabel = newLabel("start_label",
    [
        () => {
            narration.dialogue = {
                character: eggHead,
                text: "Hello, world!"
            }
        },
    ]
)
```

<<< @/snippets/react/use_query/useQueryInterface.ts{prefix=#readOnly/use_query/}

:::
