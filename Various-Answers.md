# Various Answers

## How enable the decorators in TypeScript?

In Pixi'VN, in many basic functions, it is necessary to use decorators.

By default, TypeScript does not enable the use of decorators. To enable the use of decorators in TypeScript, you must add the following configuration to the `tsconfig.json` file:

```json
{
    "compilerOptions": {
        // ...
        "experimentalDecorators": true
    }
}
```

## What is the URL Path?

The URL Path is the part of the URL that comes after the domain. For example, in the URL `https://example.com/path/to/page`, the path is `/path/to/page`.

A routering system can be used to manage navigation between URL Paths. For example you can use:

* [React Router](https://reactrouter.com/)
* [Vue Router](https://router.vuejs.org/)
* [Angular Router](https://angular.io/guide/router)
* [TanStack Router](https://tanstack.com/router/latest)

## How to force completion of an Transition/Effect/Animation in the next step?

In Pixi'VN, it is possible to force the completion of a Transition/Effect/Animation in the next step in many cases it can be useful.

Transition/Effect/Animation usually increment a variable until it reaches a target, after which it is closed.

In this case you can simply set the variable equal to the objective to be achieved in the next step.

For example:

```typescript
@labelDecorator()
export class ShowImageTest extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                showImageWithDissolveTransition("alien", 'https://pixijs.com/assets/eggHead.png', 0.01)
            },
            () => {
                let alien = GameWindowManager.getCanvasElement<CanvasImage>("alien")
                if (alien) alien.alpha = 1
            },
        ]
    }
}
```

Also, you can [unlink the Transition/Effect/Animation](Tickers) from the canvas element in the next step.

## Why Pixi'VN?

The reason why Pixi'VN was born is that current systems for creating a visual novel are based on dated systems and have many shortcomings.

## Skip step and Auto Forward

In a visual novel, It's very helpful to have the option to skip a step or auto forward to the next step.

Pixi'VN does not directly implement these 2 features, in order to leave more customization to the developer.

My advice to implement these features is to add a control where `GameStepManager.runNextStep()` is used:

```typescript
// React example
const [skipEnabled, setSkipEnabled] = useState<boolean>(false)
const [autoEnabled, setAutoEnabled] = useState<boolean>(false)
const [recheckSkipAuto, setRecheckSkipAuto] = useState<number>(0)

useEffect(() => {
    if (skipEnabled || autoEnabled) {
        nextOnClick()
    }
}, [skipEnabled, recheckSkipAuto, autoEnabled])

function nextOnClick() {
    GameStepManager.runNextStep()
        .then(() => {
            if (skipEnabled) {
                setTimeout(() => {
                    setRecheckSkipAuto((p) => p + 1)
                }, 200);
            }
            else if (autoEnabled) {
                setTimeout(() => {
                    setRecheckSkipAuto((p) => p + 1)
                }, 2000);
            }
        })
        .catch((e) => {
            // ...
        })
}

// Button for enable skip and auto ...
```

## How translate the visual novel?

It is the developer's job to choose which library to use to translate the game. I recommend using [i18next](https://www.i18next.com/).
