# Label and Game Step

Visual Novels are usually a succession of screenshots with images and text.

In Pixi'VN, you can manage this succession of screens with the "steps". The steps they are functions that are executed every time the [Next Step](#next-step) function is called. In these steps you can add images, dialogues etc...

The labels are containers of steps, they are used to organize the steps in a more readable way.

Basically the idea of the life cycle of the game is which is started at the beginning a label and is executed the first step of the label. After that, connecting the function [Next Step](#next-step) to a event (like a button click), every time the function is called, the next step of the label is executed.
Some steps could start other labels. The game will end only when all the steps are completed.

## Label

The label is a container of steps. It is used to organize the steps in a more readable way.

To define the Labels you must define a class that extends the `Label` class and must add a decorator `@labelDecorator` to the class.

`@labelDecorator` is a decorator that save the label in memory. It have a optional parameter that is the id of the label (must be unique). If you don't pass the id, the label will be saved with the class name. ( [How enable the decorators in TypeScript?](/Various-Answers.md#how-enable-the-decorators-in-typescript) )

Also to add steps to the label you must override the `steps` property and return an array of functions.

```typescript
@labelDecorator() // or @labelDecorator('StartLabel')
export class StartLabel extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                setDialogue({ character: liam, text: "Example of dialogue" })
            },
            () => GameStepManager.jumpLabel(StartLabel),
        ]
    }
}
```

### Step Result

The steps can return a `StepResult` that is undefined or a object with the following properties:

* `newRoute`: The new [route](/Various-Answers.md#what-is-the-url-path) to navigate.
* you property: You can add any property that you want.

```typescript
@labelDecorator() // or @labelDecorator('StartLabel')
export class StartLabel extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                return {
                    newRoute: '/new-route',
                    customProperty: 12
                }
            },
        ]
    }
}
```

## Run a label

There are two ways to run a label:

* [Call a label](#call-a-label)
* [Jump to a label](#jump-to-a-label)

### Call a label

To call a label you must use the `GameStepManager.callLabel` function and pass the label class.

When you call a label, the steps of that label will be started and if before the call was running another label, the steps of the label called will be executed after the steps of the current label.

For example if currently the game is running the step 5 of the label A and you call the label B, when all the steps of the label B are executed, the game will continue with the step 6 of the label A.

`GameStepManager.callLabel` returns a [result of first step of the called label](#step-result).

```typescript
GameStepManager.callLabel(StartLabel)
```

Remember that if I call the `GameStepManager.callLabel` inside a step, the [result of first step of the called label](#step-result) will be returned. So you then you should return the result of the called step.

```typescript
return GameStepManager.callLabel(StartLabel).then((result) => {
    return result
})
```

### Jump to a label

To jump to a label you must use the `GameStepManager.jumpLabel` function and pass the label class.

When you jump to a label, the steps of the current label will be stopped and the steps of the label passed as parameter will be started.

For example if currently the game is running the step 5 of the label A and you jump to the label B, when all the steps of the label B are executed, the game will end, also if the label B have a step 6.

`GameStepManager.jumpLabel` returns a [result of first step of the called label](#step-result).

```typescript
GameStepManager.jumpLabel(StartLabel)
```

Remember that if I call the `GameStepManager.jumpLabel` inside a step, the [result of first step of the called label](#step-result) will be returned. So you then you should return the result of the called step.

```typescript
return GameStepManager.jumpLabel(StartLabel).then((result) => {
    return result
})
```

## Next Step

To execute the next step you must call the `GameStepManager.runNextStep()` function.

```typescript
GameStepManager.runNextStep()
```

`GameStepManager.runNextStep()` is asynchronous, so, for example, you can use `then` for disabled a next button until the next step is executed.

```typescript
// disable next button
GameStepManager.runNextStep()
    .then((result) => {
        // enable next button
    })
```

## Close current label

To close the current label you must call the `GameStepManager.closeCurrentLabel()` function.

```typescript
GameStepManager.closeCurrentLabel()
```

## Clase all labels

To close all labels you must call the `GameStepManager.closeAllLabels()` function.
If you call this function and after that you don't call any label, the game will end.

```typescript
GameStepManager.closeAllLabels()
```

## Go back

Every step the system saves the current state of the game. To go back to the previous step you must call the `GameStepManager.goBack()` function.

In parameters you must pass a function `navigate: (path: string) => void` that will be called with the [URL Path](/Various-Answers.md#what-is-the-url-path) of the previous step, so you can use it to navigate to the previous [Interface](/Interface-with-JavaScript-Framework.md#how-navigateswitch-between-interface-screens).

For exemple if you use a [React Router Dom](https://reactrouter.com):

```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

if (GameStepManager.canGoBack) {
    GameStepManager.goBack(navigate)
}
```

## How determinate if current step is the last step in the game (end of the game)

To determinate if the current step is the last step in the game you must call the `GameStepManager.isLastGameStep` function.

```typescript
if (GameStepManager.isLastGameStep) {
    // end of the game
}
```

## How navigate in new route/path in the Game Step

In some cases it is not possible to navigate to a new route/path in the step, for example if you are using a [React Router Dom](https://reactrouter.com) and you want to navigate to a new route/path in the step.

The solution is to return a [`StepResult`](#step-result) with the `newRoute` property, and after the step is executed, the game will navigate to the new route/path.

```typescript
@labelDecorator() // or @labelDecorator('StartLabel')
export class StartLabel extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                return {
                    newRoute: '/new-route',
                }
            },
        ]
    }
}
```

```typescript
GameStepManager.runNextStep()
    .then((result) => {
        if (result?.newRoute) {
            // navigate to new route
        }
    })
```
