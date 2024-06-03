# Label and Game Step

Visual Novels are usually a succession of screenshots with images and text.

In Pixi’VN, you can manage this succession of screens with the "**steps**". The steps they are functions that are executed every time the [Next Step](#next-step) function is called. In these steps you can add images, dialogues etc...

The **labels** are containers of steps, they are used to organize the steps in a more readable way.

Basically the idea of the life cycle of the game is which is started at the beginning a label and is executed the first step of the label. After that, connecting the function [Next Step](#next-step) to a event (like a button click), every time the function is called, the next step of the label is executed.
Some steps could start other labels. The game will end only when all the steps are completed.

## Label

The label is a container of steps. It is used to organize the steps in a more readable way.

For create a label you must use the `newLabel()` function and pass:

* the `id` of the label, must be unique
* the `steps` of the label, an array of functions that will be executed in order

```typescript
const START_LABEL_ID = "StartLabel"

export const startLabel = newLabel(START_LABEL_ID,
    [
        () => {
            setDialogue({ character: liam, text: "Example of dialogue" })
        },
        (props) => GameStepManager.jumpLabel(START_LABEL_ID, props),
    ]
)
```

### Parameters of the label steps

You can pass a type to `newLabel` function for add other parameters in addition to [`StepLabelProps`](#all-steps-parameters) for all steps of the label.

```typescript
const START_LABEL_ID = "StartLabel"

export const startLabel = newLabel<{name: string}>(START_LABEL_ID,
    [
        (props) => {
            console.log(props.name)
        },
    ]
)

GameStepManager.callLabel(startLabel, {
    // add StepLabelProps here
    navigate: navigate, // example
    // and the props that will be passed to the label
    name: "John"
})
```

### All Steps Parameters

You can "override" the interface `StepLabelProps` to set required parameters for all steps of all labels.

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelProps {
        navigate: (route: string) => void,
    }
}

return GameStepManager.callLabel(TestLabel, {
    navigate: (route) => {
        // navigate to route
    }
})
```

### All Steps Result

The steps can return a `StepLabelResult` object, by default the `StepLabelResult` object is a `{ [key: string]: any }`.

You can "override" the interface `StepLabelResult` to set your custom properties in the result of the steps.

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelResult {
        newRoute?: string,
        [key: string]: any
    }
}

export const startLabel = newLabel(START_LABEL_ID,
    [
        () => {
            return {
                newRoute: '/new-route',
                customProperty: 12
            }
        },
    ]
)
```

## Run a label

There are two ways to run a label:

* [Call a label](#call-a-label)
* [Jump to a label](#jump-to-a-label)

### Call a label

To call a label you must use the `GameStepManager.callLabel` function. This function have 2 parameters:

* `label`: the label that will be called
* `props`: the properties that will be passed to the label, if you not want to pass any parameter you can pass an empty object `{}`.

When you call a label, the steps of that label will be started. If before the call was running another label, the remaining steps of the another label will be executed after the steps of the called label.

For example if currently the game is running the step 5 of the label A and you call the label B, when all the steps of the label B are executed, the game will continue with the step 6 of the label A.

`GameStepManager.callLabel` returns a [result of first step of the called label](#all-steps-result).

```typescript
GameStepManager.callLabel(StartLabel, {})
```

Remember that if you execute the `GameStepManager.callLabel` inside a step, you should return the [result of first step of the called label](#all-steps-result) and pass the [parameters](#all-steps-parameters).

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        (props) => {
            return GameStepManager.callLabel(TestLabel, props).then((result) => {
                return result
            })
        },
        // or in one line
        (props) => GameStepManager.callLabel(TestLabel, props),
    ]
)
```

### Jump to a label

To jump to a label you must use the `GameStepManager.jumpLabel` function and pass the label. This function have 2 parameters:

* `label`: the label that will be called
* `props`: the properties that will be passed to the label, if you not want to pass any parameter you can pass an empty object `{}`.

When you jump to a label, the steps of the current label will be stopped and the steps of the label passed as parameter will be started.

For example if currently the game is running the step 5 of the label A and you jump to the label B, when all the steps of the label B are executed, the game will end, also if the label B have a step 6.

`GameStepManager.jumpLabel` returns a [result of first step of the called label](#all-steps-result).

```typescript
GameStepManager.jumpLabel(StartLabel, {})
```

Remember that if you execute the `GameStepManager.jumpLabel` inside a step, you should return the [result of first step of the called label](#all-steps-result) and pass the [parameters](#all-steps-parameters).

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        (props) => {
            return GameStepManager.jumpLabel(TestLabel, props).then((result) => {
                return result
            })
        },
        // or in one line
        (props) => GameStepManager.jumpLabel(TestLabel, props),
    ]
)
```

## Next Step

To execute the next step you must execute the `GameStepManager.runNextStep()` function. This function have a parameter `props` that will be passed to the next step, if you not want to pass any parameter you can pass an empty object `{}`.

```typescript
GameStepManager.runNextStep({})
```

`GameStepManager.runNextStep()` is asynchronous, so, for example, you can use `then` for disabled a next button until the next step is executed.

```typescript
// disable next button
GameStepManager.runNextStep({})
    .then((result) => {
        // enable next button
    })
```

## Close current label

To close the current label you must execute the `GameStepManager.closeCurrentLabel()` function.

```typescript
GameStepManager.closeCurrentLabel()
```

## Clase all labels

To close all labels you must execute the `GameStepManager.closeAllLabels()` function.
If you call this function and after that you don't call any label, the game will end.

```typescript
GameStepManager.closeAllLabels()
```

## Go back

Every step the system saves the current state of the game. To go back to the previous step you must execute the `GameStepManager.goBack()` function.

In parameters you must pass a function `navigate: (path: string) => void` that will be called with the [URL Path or Route](/other/various-answers#what-is-the-url-path-and-routes-and-routes) of the previous step, so you can use it to navigate to the previous [Interface](/start/interface#how-navigateswitch-between-interface-screens).

For exemple if you use a [React Router Dom](https://reactrouter.com):

```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

if (GameStepManager.canGoBack) {
    GameStepManager.goBack(navigate)
}
```

## How determinate if current step is the last step in the game (end of the game)

To determinate if the current step is the last step in the game you must use the `GameStepManager.isLastGameStep` property.

```typescript
if (GameStepManager.isLastGameStep) {
    // end of the game
}
```

## How navigate in new route/path in the Game Step

In some cases it is not possible to navigate to a new route/path in the step.

The solution is [override the `StepLabelProps`](#all-steps-parameters) interface and add a `navigate` function that will be called in the step.

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelProps {
        navigate: (route: string) => void,
    }
}
```

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        ({ navigate }) => navigate('/new-route'),
    ]
)
```
