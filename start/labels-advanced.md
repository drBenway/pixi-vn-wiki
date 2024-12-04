# Advanced label features

In this section, we will cover advanced [label](/start/labels.md) features. These features are not necessary to create a game, but they can help you to create a more complex and interactive game.

## onLoadingLabel

`onLoadingLabel` is a function that will be executed in `onStepStart` if the index of the step is 0 and when the user laods a save file. When you load a save file, will be executed all onLoadingLabel functions of the `narration.openedLabels` (current label and all labels that are in the stack).

It is useful for example to make sure all images used have been cached before the label starts.

You can intercept this function by passing a function to the `onLoadingLabel` property of the label options. This function will receive 2 parameters:

* `stepIndex`: The index of the step that is being executed
* `label`: The label that is being executed

```ts
newLabel("start", [
    () => {
        await showImage("image1", "path/to/image1.png")
        await showImage("image2", "path/to/image2.png")
    }
], {
    onLoadingLabel: async (stepIndex, label) => { // [!code focus]
        await Assets.load("path/to/image1.png") // [!code focus]
        await Assets.load("path/to/image2.png") // [!code focus]
    } // [!code focus]
})
```

## onStepStart

`onStepStart` is a function that will be executed before each step of the label. You can intercept this function by passing a function to the `onStepStart` property of the label options. This function will receive 2 parameters:

* `stepIndex`: The index of the step that is being executed
* `label`: The label in which it is the step

```ts
newLabel("start", [
    () => {
        narration.dialogue = "Step 1"
    },
    () => {
        narration.dialogue = "Step 2"
    }
], {
    onStepStart: (stepIndex, label) => { // [!code focus]
        console.log(`Step ${stepIndex} started`) // [!code focus]
    } // [!code focus]
})
```

## onStepEnd

`onStepEnd` is a function that will be executed after each step of the label. You can intercept this function by passing a function to the `onStepEnd` property of the label options. This function will receive 2 parameters:

* `stepIndex`: The index of the step that is ended
* `label`: The label in which it is the step

```ts
newLabel("start", [
    () => {
        narration.dialogue = "Step 1"
    },
    () => {
        narration.dialogue = "Step 2"
    }
], {
    onStepEnd: (stepIndex, label) => { // [!code focus]
        console.log(`Step ${stepIndex} ended`) // [!code focus]
    } // [!code focus]
})
```

## How to return different step lists based on a condition

When you create a new label you can pass a function that returns the steps of the label.

```ts
// /labels/startLabel.ts
import { getFlag, narration, newLabel, setFlag } from "@drincs/pixi-vn"

const START_LABEL_ID = "start_label"
export const startLabel = newLabel(START_LABEL_ID,
    () => {
        let condition = getFlag("condition")
        if (condition) {
            return [
                () => {
                    narration.dialogue = "Step 2"
                },
                () => {
                    narration.dialogue = "Restart";
                },
            ]
        } else {
            return [
                () => {
                    narration.dialogue = "Step 1"
                },
                async (props) => {
                    setFlag("condition", true)
                    return await narration.jumpLabel(START_LABEL_ID, props)
                }
            ]
        }
    }
)
```

::: sandbox {template=5jtwrt entry=/src/labels/startLabel.ts}
:::
