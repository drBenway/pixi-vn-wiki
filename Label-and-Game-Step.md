# Label and Game Step

Visual Novels are usually a succession of screenshots with images and text.

In Pixi'VN, you can manage this succession of screens with the "steps". The steps they are functions that are executed every time the `next()` function is called. In these functions you can add images, dialogues etc...

While labels are containers of steps, they are used to organize the steps in a more readable way.

Basically the idea of the life cycle of the game is which is started at the beginning a label and is executed the first step of the label. After that, connecting the function `next()` to a event (like a button click), every time the function is called, the next step of the label is executed.
Some steps could start other labels. The game will end only when all the steps are completed.

## Label

The label is a container of steps. It is used to organize the steps in a more readable way.

To define the Labels you must define a class that extends the `Label` class and add a decorator `@labelDecorator` to the class.

`@labelDecorator` is a decorator that save the label in memory. For parameters you can pass the label name (the name mast be unique), if you don't pass the name, the label will be saved with the class name.

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

* Call a label
* Jump to a label

### Call a label

To call a label you must use the `GameStepManager.callLabel` function and pass the label class.

When you call a label, the steps of that label will be started and the remaining steps will be queued. For example if currently the game is running the step 5 of the label A and you call the label B, will be executed before the steps of the label B, after the step 6 (if exists) of the label A.

```typescript
GameStepManager.callLabel(StartLabel)
```

### Jump to a label

To jump to a label you must use the `GameStepManager.jumpLabel` function and pass the label class.

When you jump to a label, the steps of the current label will be stopped and the steps of the label passed as parameter will be started.

```typescript
GameStepManager.jumpLabel(StartLabel)
```

## Next Step

To execute the next step you must call the `GameStepManager.runNextStep()` function.

```typescript
GameStepManager.runNextStep()
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
