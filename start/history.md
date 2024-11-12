# History

Pixi’VN save all dialogues, choices and responses that have been displayed in the game and all label and step opened.

## Check if the label has already been completed

To check if a label has already been completed, you can use the `narration.isLabelAlreadyCompleted` function.

The function takes the following parameters:

* `label`: The [label](/start/labels) to check if it is already completed.

```typescript
const isLabelCompleted = narration.isLabelAlreadyCompleted(startLabel)
const isLabelCompleted = narration.isLabelAlreadyCompleted("labelid")
```

## Get already been made choices of current step

To get the already been made choices of the current step, you can use the `narration.alreadyCurrentStepMadeChoices`.

```typescript
const choices = narration.alreadyCurrentStepMadeChoices
```

## Check if current step is already been opened

To check if the current step is already been opened, you can use the `narration.isCurrentStepAlreadyOpened`.

```typescript
const isCurrentStepOpened = narration.isCurrentStepAlreadyOpened;
```

## Counter of execution times of the current step

To get the counter of execution times of the current step, you can use the `narration.currentStepTimesCounter`. **Important**: The counter will be incremented only if `narration.currentStepTimesCounter` is called at least once in a step.

```typescript
export const label = newLabel("id",
    () => {
        if (narration.currentStepTimesCounter === 0) { // ✅ will be incremented
            // ...
        } else {
            // ...
        }
    }
)
```

```typescript
export const label = newLabel("id",
    () => {
        if (narration.currentStepTimesCounter === 0) { // ✅ will be incremented
            // ...
        } else if (narration.currentStepTimesCounter === 1) { // ✅ It will not be incremented, because it has already been incremented in this step
            // ...
        }
    }
)
```

```typescript
export const label = newLabel("id",
    () => {
        if (flag) {
            if (narration.currentStepTimesCounter === 1) { // ❌ It will be incremented only if "flag" is true
                // ...
            }
        }
    }
)
```

To restart the counter of execution times of the current step, you can use the `narration.currentStepTimesCounter = 0`.

```typescript
narration.currentStepTimesCounter = 0;
```

## Get Narrative History

The Narration timeline of the game is a list of all dialogues that have been displayed. It is useful to show the history of dialogues and choices to the player.

To get the narrative history of the game, you can use the `narration.narrativeHistory`. It returns a list of `NarrativeHistory<T>[]`.

```typescript
const dialogues: NarrativeHistory<Dialogue>[] = narration.narrativeHistory;
```

## Delete Narrative History

To delete all the narrative history, use the `narration.removeNarrativeHistory`.

```typescript
narration.removeNarrativeHistory();
```

To delete a part of the narrative history, use the `narration.removeNarrativeHistory`.

```typescript
// delete the first 2 elements
narration.removeNarrativeHistory(2);
```

## How to create the history UI screen

For example:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

<!-- ::: react-sandbox {template=vite-react-ts previewHeight=400 coderHeight=512}

<<< @/snippets/react/index.css{#hidden}
<<< @/snippets/react/index.tsx{#hidden}

```tsx /App.tsx [hidden]
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import GoNextTimeout from "./screens/GoNextTimeout";
import HistoryScreen from "./screens/HistoryScreen";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

export default function App() {
    return (
        <>
            <HistoryScreen />
            <GoNextTimeout />
        </>
    )
}
```

<<< @/snippets/react/components/NextButton.tsx{prefix=#hidden/components/}
<<< @/snippets/react/components/BackButton.tsx{prefix=#hidden/components/}
<<< @/snippets/react/screens/NarrationScreen.tsx{prefix=#hidden/screens/}
<<< @/snippets/react/screens/modals/TextInput.tsx{prefix=#hidden/screens/modals/}
<<< @/snippets/react/screens/ChoiceMenu.tsx{prefix=#hidden/screens/}
<<< @/snippets/react/screens/HistoryScreen.tsx{prefix=#active/screens/}

```ts /labels/startLabel.ts
import { narration, newLabel } from "@drincs/pixi-vn"
import { eggHead, flower } from "../values/characters"

export const startLabel = newLabel("start_label",
    [
        () => {
            narration.dialogue = {
                character: eggHead,
                text: "Hello, I am Egg Head. I am a character in this game.",
            }
        },
        () => {
            narration.dialogue = {
                character: flower,
                text: "Hello, I am Flower Top. I am another character in this game.",
            }
        },
        () => {
            narration.dialogue = {
                character: eggHead,
                text: "This is a dialogue. It is a conversation between characters.",
            }
        },
        () => {
            narration.dialogue = {
                character: flower,
                text: "This is a dialogue too.",
            }
        },
    ],
)
```

```ts /values/characters.ts [hidden]
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const eggHead = new CharacterBaseModel('egg-head', {
    name: 'Egg',
    surname: 'Head',
    icon: "https://pixijs.com/assets/eggHead.png",
    color: "#9e2e12"
});

export const flower = new CharacterBaseModel('flower-top', {
    name: 'Flower',
    surname: 'Top',
    icon: "https://pixijs.com/assets/flowerTop.png",
    color: "#12959e"
});

saveCharacter([eggHead, flower]);
```

```tsx /screens/GoNextTimeout.ts [hidden]
import { narration } from '@drincs/pixi-vn';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { INTERFACE_DATA_USE_QUEY_KEY } from '../use_query/useQueryInterface';

export default function GoNextTimeout() {
    const queryClient = useQueryClient()
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            if (narration.canGoNext) {
                narration.goNext({}).then(() => {
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                })
                setUpdate((item) => item + 1)
            }
        }, 2000)
    }, [update])
    return null
}
```

<<< @/snippets/react/use_query/useQueryInterface.ts{prefix=#readOnly/use_query/}

::: -->

::: sandbox {template=ryzljv entry=/src/screens/HistoryScreen.tsx}
:::
