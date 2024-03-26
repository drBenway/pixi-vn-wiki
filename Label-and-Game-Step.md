# Label and Game Step

Visual Novels are usually a succession of screenshots with images and text.

In Pixi'VN, you can manage this succession of screens with the "steps". The steps they are functions that are executed every time the `next()` function is called. In these steps you can add images, dialogues etc...

The labels are containers of steps, they are used to organize the steps in a more readable way.

Basically the idea of the life cycle of the game is which is started at the beginning a label and is executed the first step of the label. After that, connecting the function `next()` to a event (like a button click), every time the function is called, the next step of the label is executed.
Some steps could start other labels. The game will end only when all the steps are completed.

## Label

The label is a container of steps. It is used to organize the steps in a more readable way.

To define the Labels you must define a class that extends the `Label` class and must add a decorator `@labelDecorator` to the class.

`@labelDecorator` is a decorator that save the label in memory. Have a optional parameter that is the id of the label (must be unique). If you don't pass the name, the label will be saved with the class name. ( [How enable the decorators in TypeScript?](/Various-Answers#how-enable-the-decorators-in-typescript) )

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

## Run a label

There are two ways to run a label:

* [Call a label](#call-a-label)
* [Jump to a label](#jump-to-a-label)

### Call a label

To call a label you must use the `GameStepManager.callLabel` function and pass the label class.

When you call a label, the steps of that label will be started and if before the call was running another label, the steps of the label called will be executed after the steps of the current label.

For example if currently the game is running the step 5 of the label A and you call the label B, when all the steps of the label B are executed, the game will continue with the step 6 of the label A.

```typescript
GameStepManager.callLabel(StartLabel)
```

### Jump to a label

To jump to a label you must use the `GameStepManager.jumpLabel` function and pass the label class.

When you jump to a label, the steps of the current label will be stopped and the steps of the label passed as parameter will be started.

For example if currently the game is running the step 5 of the label A and you jump to the label B, when all the steps of the label B are executed, the game will end, also if the label B have a step 6.

```typescript
GameStepManager.jumpLabel(StartLabel)
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
    .then(() => {
        // enable next button
    })
```

## Go back

Every step the system saves the current state of the game. To go back to the previous step you must call the `GameStepManager.goBack()` function.

In parameters you maust pass a function `navigate: (path: string) => void` that will be called with the path of the previous step.

For exemple if you use a [React Router Dom](https://reactrouter.com):

```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

GameStepManager.goBack(navigate)
```
