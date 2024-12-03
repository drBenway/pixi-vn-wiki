# Advanced label features

In this section, we will cover advanced [label](/start/labels.md) features. These features are not necessary to create a game, but they can help you to create a more complex and interactive game.

<!-- TODO: document `onStepStart` -->
<!-- TODO: document `onLoadStep` -->
<!-- TODO: document `onStepEnd` -->

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
