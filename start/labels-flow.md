# Manage game flow with labels

The game flow is managed by functions that `call labels`, `jump labels`, `go back`, `close labels`... These functions are in the `narration` object.

* [Run a label](#run-a-label)
* [Next Step and Go back](#next-step-and-go-back)
* [Close labels](#close-labels)

## Run a label

There are two ways to run a label:

* [Call a label](#call-a-label)
* [Jump to a label](#jump-to-a-label)

### Call a label

To call a label you must use the `narration.callLabel` function. This function have 2 parameters:

* `label`: the label that will be called
* `props`: the properties that will be passed to the label, if you not want to pass any parameter you can pass an empty object `{}`.

When you call a label, the first step of that label will be started. If before the call was running another label, the remaining steps of the another label will be executed after the steps of the called label.

For example if currently the game is running the step 5 of the label A and you **call** the label B, when all the steps of the label B are executed, the game will continue with the step 6 of the label A.

`narration.callLabel` returns a [result of first step of the called label](/start/labels.md#all-steps-result).

```typescript
import { narration } from '@drincs/pixi-vn'

narration.callLabel(startLabel, {})
```

Remember that if you execute the `narration.callLabel` inside a step, you should return the [result of first step of the called label](/start/labels.md#all-steps-result) and use `await`. The reason is that it might generate a wrong history.

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

### Jump to a label

To jump to a label you must use the `narration.jumpLabel` function and pass the label. This function have 2 parameters:

* `label`: the label that will be called
* `props`: the properties that will be passed to the label, if you not want to pass any parameter you can pass an empty object `{}`.

When you jump to a label, the steps of the current label will be stopped and the steps of the label passed as parameter will be started.

For example if currently the game is running the step 5 of the label A, and **call** the label B, and you **jump** to the label C, when all the steps of the label C are executed, the game will continue with the step 6 of the label A. Because when you jump to the label C, the label B is closed.

`narration.jumpLabel` returns a [result of first step of the called label](/start/labels.md#all-steps-result).

```typescript
import { narration } from '@drincs/pixi-vn'

narration.jumpLabel(startLabel, {})
```

Remember that if you execute the `narration.jumpLabel` inside a step, you should return the [result of first step of the called label](/start/labels.md#all-steps-result) and use `await`. The reason is that it might not await the first step of the new label.

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

## Next step and go back

<!-- TODO can go next -->

### Next step

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

Remember that if you execute the `narration.goNext()` inside a step, you should return the [result of the step](/start/labels.md#all-steps-result) and use `await`. The reason is that it might generate a wrong history.

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

### Go back

Every step the system saves the current state of the game. To go back to the previous step you must execute the `narration.goBack()` function.

In parameters you must pass a function `navigate: (path: string) => void` that will be called with the [URL Path or Route](/start/interface.md#what-is-the-url-path-and-routes) of the previous step, so you can to [navigate to the previous UI screen](/start/interface-navigate.md).

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

## Close labels

### Close current label

To close the current label you must execute the `narration.closeCurrentLabel()` function.

```typescript
import { narration } from '@drincs/pixi-vn'

narration.closeCurrentLabel()
```

### Close all labels

To close all labels you must execute the `narration.closeAllLabels()` function.
**If you call this function and after that you don't call any label, the [game will end](/start/other-narrative-features#how-manage-the-end-of-the-game).**

```typescript
import { narration } from '@drincs/pixi-vn'

narration.closeAllLabels()
```

## How to create the go back and go next buttons

For example:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

::: sandbox {template=5r7m9z entry=/src/components/NextButton.tsx,/src/components/BackButton.tsx}
:::
