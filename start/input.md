# Input

In Visual Novels it may be necessary to ask the user to enter text, number, date, etc.

Pixi’VN provides functions to manage this possibility. In short, through the functions provided by Pixi’VN, you can enable the game to request input from the player, while the [UI](/start/interface.md) must manage the information obtained from this variable.

## Requesting input

To request input from the player, you must use the `narration.requestInput()` function. This function receives an object with the following properties:

- `type` (optional): The type of input to be requested (It is a string).

```typescript
narration.requestInput()
narration.requestInput({ type: "text" })
narration.requestInput({ type: "date" })
```

## Getting input information

To get the input information, you must use:

- `narration.isRequiredInput`: Returns a boolean indicating whether the player must enter a value.
- `narration.inputType`: Returns a string indicating the type of input requested.

```typescript
if (narration.isRequiredInput) {
    openInputModal(narration.inputType)
}
```

## Removing input request

To remove the input request, you must use the `narration.removeInputRequest()` function.

```typescript
narration.removeInputRequest()
```

## How to create the input dialog UI

For example:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

<!-- ::: react-sandbox {template=vite-react-ts previewHeight=400 coderHeight=512}

<<< @/snippets/react/index.css{#hidden}
<<< @/snippets/react/index.tsx{#hidden}
<<< @/snippets/react/App.tsx{#hidden}
<<< @/snippets/react/components/NextButton.tsx{prefix=#hidden/components/}
<<< @/snippets/react/components/BackButton.tsx{prefix=#hidden/components/}
<<< @/snippets/react/screens/NarrationScreen.tsx{prefix=#hidden/screens/}
<<< @/snippets/react/screens/modals/TextInput.tsx{prefix=#active/screens/modals/}
<<< @/snippets/react/screens/ChoiceMenu.tsx{prefix=#hidden/screens/}

```ts /labels/startLabel.ts
import { narration, newLabel } from "@drincs/pixi-vn"

export const startLabel = newLabel("start_label",
    [
        () => {
            narration.dialogue = "What is your name?"
            narration.requestInput({ type: "string" })
        },
        () => {
            narration.dialogue = `Nice to meet you, ${narration.inputValue}!`
        }
    ]
)
```

<<< @/snippets/react/use_query/useQueryInterface.ts{prefix=#readOnly/use_query/}

::: -->

::: sandbox {template=mjn5c8 entry=/src/screens/modals/TextInput.tsx}
:::
