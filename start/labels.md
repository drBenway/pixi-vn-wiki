# Label and Game Step

Visual Novels are usually a succession of screenshots with images and text.

In Pixi’VN, you can manage this succession of screens with the "**steps**". The steps they are functions that are executed every time the [Next Step](#next-step) function is called. In these steps you can add images, dialogues etc...

The **labels** are containers of steps, they are used to organize the steps in a more readable way.

Basically the idea of the life cycle of the game is:

* The game starts by [calling a label](#call-a-label). The first step of the label will be executed automatically.
* After that, connecting the function [Next Step](#next-step) to a event (like a button click), every time the function is called, the next step of the label is executed.
Some steps could start other labels.
* The game will end only when all the steps are completed.

## Label

The label is a container of steps. It is used to organize the steps in a more readable way.

For create a label you must use the `newLabel()` function and pass:

* The `id` of the label, must be unique
* The `steps` of the label, an array of functions that will be executed in order. Or a function that returns the steps.

```typescript
import { narration } from '@drincs/pixi-vn'

const START_LABEL_ID = "start_label_id"

export const startLabel = newLabel(START_LABEL_ID,
    [
        () => {
            narration.dialogue = { character: liam, text: "Example of dialogue" }
        },
        (props) => narration.jumpLabel(START_LABEL_ID, props),
    ]
)
```

### Parameters of the label steps

You can pass a type to `newLabel` function for add other parameters in addition to [`StepLabelProps`](#all-steps-parameters).

```typescript
import { narration } from '@drincs/pixi-vn'

const START_LABEL_ID = "start_label_id"

export const startLabel = newLabel<{name: string}>(START_LABEL_ID,
    [
        (props) => {
            console.log(props.name)
        },
    ]
)

narration.callLabel(startLabel, {
    // add StepLabelProps here
    navigate: navigate, // example
    // and the props that will be passed to the label
    name: "John"
})
```

### All Steps Parameters

You can "override" the interface `StepLabelProps` to set required parameters for all steps of all labels.

:::tabs
== pixi-vn.types.ts

```typescript
import { narration } from '@drincs/pixi-vn'

declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelProps {
        navigate: (route: string) => void,
    }
}
```

== startLabel.ts

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        () => {
            return narration.callLabel(testLabel, { // [!code focus]
                navigate: (route) => { // [!code focus]
                    // navigate to route // [!code focus]
                } // [!code focus]
            }) // [!code focus]
        },
    ]
)
```

:::

### All Steps Result

The steps can return a `StepLabelResult` object, by default the `StepLabelResult` object is a `{ [key: string]: any }`.

You can "override" the interface `StepLabelResult` to set your custom properties in the result of the steps.

:::tabs
== pixi-vn.types.ts

```typescript
declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelResult {
        newRoute?: string,
        [key: string]: any
    }
}
```

== startLabel.ts

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        () => {
            return { // [!code focus]
                newRoute: '/new-route', // [!code focus]
                customProperty: 12 // [!code focus]
            } // [!code focus]
        },
    ]
)
```

:::

## Manage game flow with labels

The game flow is managed by functions that `call labels`, `jump labels`, `go back`, `close labels`... These functions are in the `narration` object.

* [Run a label](#run-a-label)
* [Next Step and Go back](#next-step-and-go-back)
* [Close labels](#close-labels)

### Run a label

There are two ways to run a label:

* [Call a label](#call-a-label)
* [Jump to a label](#jump-to-a-label)

#### Call a label

To call a label you must use the `narration.callLabel` function. This function have 2 parameters:

* `label`: the label that will be called
* `props`: the properties that will be passed to the label, if you not want to pass any parameter you can pass an empty object `{}`.

When you call a label, the first step of that label will be started. If before the call was running another label, the remaining steps of the another label will be executed after the steps of the called label.

For example if currently the game is running the step 5 of the label A and you **call** the label B, when all the steps of the label B are executed, the game will continue with the step 6 of the label A.

`narration.callLabel` returns a [result of first step of the called label](#all-steps-result).

```typescript
import { narration } from '@drincs/pixi-vn'

narration.callLabel(startLabel, {})
```

Remember that if you execute the `narration.callLabel` inside a step, you should return the [result of first step of the called label](#all-steps-result) and use `await`. The reason is that it might generate a wrong history.

```typescript
import { narration } from '@drincs/pixi-vn'

export const startLabel = newLabel(START_LABEL_ID,
    [
        async (props) => {
            return await narration.callLabel(TestLabel, props)
        },
        async (props) => await narration.callLabel(TestLabel, props),
    ]
)
```

#### Jump to a label

To jump to a label you must use the `narration.jumpLabel` function and pass the label. This function have 2 parameters:

* `label`: the label that will be called
* `props`: the properties that will be passed to the label, if you not want to pass any parameter you can pass an empty object `{}`.

When you jump to a label, the steps of the current label will be stopped and the steps of the label passed as parameter will be started.

For example if currently the game is running the step 5 of the label A, and **call** the label B, and you **jump** to the label C, when all the steps of the label C are executed, the game will continue with the step 6 of the label A. Because when you jump to the label C, the label B is closed.

`narration.jumpLabel` returns a [result of first step of the called label](#all-steps-result).

```typescript
import { narration } from '@drincs/pixi-vn'

narration.jumpLabel(startLabel, {})
```

Remember that if you execute the `narration.jumpLabel` inside a step, you should return the [result of first step of the called label](#all-steps-result) and use `await`. The reason is that it might not await the first step of the new label.

```typescript
import { narration } from '@drincs/pixi-vn'

export const startLabel = newLabel(START_LABEL_ID,
    [
        async (props) => {
            return await narration.jumpLabel(TestLabel, props)
        },
        async (props) => await narration.jumpLabel(TestLabel, props),
    ]
)
```

### Next Step and Go back

<!-- TODO can go next -->

#### Next Step

To execute the next step you must execute the `narration.goNext()` function. This function have a parameter `props` that will be passed to the next step, if you not want to pass any parameter you can pass an empty object `{}`.

```typescript
import { narration } from '@drincs/pixi-vn'

await narration.goNext({})
```

`narration.goNext()` is asynchronous, so, for example, you can use `then` for disabled a next button until the next step is executed.

```typescript
import { narration } from '@drincs/pixi-vn'

// disable next button
narration.goNext({})
    .then((result) => {
        // enable next button
    })
```

Remember that if you execute the `narration.goNext()` inside a step, you should return the [result of the step](#all-steps-result) and use `await`. The reason is that it might generate a wrong history.

```typescript
import { narration, newLabel } from '@drincs/pixi-vn'

export const startLabel = newLabel(START_LABEL_ID,
    [
        async (props) => {
            await narration.goNext(props)
        },
    ]
)
```

<!-- TODO: canGoNext -->

#### Go back

Every step the system saves the current state of the game. To go back to the previous step you must execute the `narration.goBack()` function.

In parameters you must pass a function `navigate: (path: string) => void` that will be called with the [URL Path or Route](/start/interface.md#what-is-the-url-path-and-routes) of the previous step, so you can to [navigate to the previous UI screen](/start/interface#navigateswitch-between-ui-screens).

For exemple if you use a [React Router Dom](https://reactrouter.com):

```typescript
import { narration } from '@drincs/pixi-vn'
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

if (narration.canGoBack) {
    narration.goBack(navigate).then(() => {
        // ...
    })
}
```

### Close labels

#### Close current label

To close the current label you must execute the `narration.closeCurrentLabel()` function.

```typescript
import { narration } from '@drincs/pixi-vn'

narration.closeCurrentLabel()
```

#### Close all labels

To close all labels you must execute the `narration.closeAllLabels()` function.
**If you call this function and after that you don't call any label, the [game will end](#how-manage-the-end-of-the-game).**

```typescript
import { narration } from '@drincs/pixi-vn'

narration.closeAllLabels()
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

## How manage the end of the game

When all the steps of all labels are executed, the game will block. The developer must manage the end of the game. The reason is that ending management in visual novels can be handled in different ways:

* The game ends when all the steps are executed
* The game has no end, so if the steps are finished, there has been an error, and it needs to be handled
* The game ends when the player reaches a certain point. For example, when the player reaches a certain point in the story you can navigate to a game over screen

The method for managing the end of the game is to set `narration.onGameEnd`. This function is executed when the game ends and have same characteristics of a `step`.

For example, if you want to end the game when the steps are finished:

```typescript
// main.ts
import { narration } from '@drincs/pixi-vn'

narration.onGameEnd = async (props) => {
    props.navigate("/end")
}
```

For example, if the game has no end:

```typescript
// startLabel.ts
export const startLabel = newLabel("start_label_id",
    () => {
        return [
            // ...
        ]
    }
)
```

```typescript
// main.ts
import { narration } from '@drincs/pixi-vn'

narration.onGameEnd = async (props) => {
    narration.callLabel(startLabel, props)
}
```

<!-- TODO: document `onStepStart` -->

## How manage the step error

When an error occurs in a step, the game gives a console error and stops the execution of the steps. The developer must manage the error. The method for managing the error is to set `narration.onStepError`.

For example, if you want to send a notification when an error occurs:

```typescript
// main.ts
import { narration } from '@drincs/pixi-vn'

narration.onStepError = async (error, props) => {
    props.notify("An error occurred")
    // send a notification to GlitchTip, Sentry, etc...
}
```

## How to create the Go Back and Go Next buttons

For example:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

::: sandbox {template=5r7m9z entry=/src/components/NextButton.tsx,/src/components/BackButton.tsx}
:::
