# Various Answers

## How use navigation function in step/label?

It is recommended to overwrite the `StepLabelProps` interface to add the `navigate` function. `navigate` function is a function that will be called with the URL Path or Route of the next step, so you can use it to navigate to the next Interface.

For example:

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelProps {
        /**
         * function to navigate to a new route.
         * @param route The route to navigate to.
         * @returns 
         */
        navigate: (route: string) => void
        // ...
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

## How to force completion of an Transition/Effect/Animation in the next step?

In Pixi’VN, it is possible to force the completion of a Transition/Effect/Animation in the next step in many cases it can be useful.

Transition/Effect/Animation usually increment a variable until it reaches a target, after which it is closed.

In this case you can simply set the variable equal to the objective to be achieved in the next step.

For example:

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        () => {
            showWithDissolveTransition("alien", 'https://pixijs.com/assets/eggHead.png', 0.01)
        },
        () => {
            let alien = canvas.find<CanvasImage>("alien")
            if (alien) alien.alpha = 1
        },
    ]
)
```

Also, you can [unlink the Transition/Effect/Animation](/start/tickers) from the canvas element in the next step.

## Skip step and Auto Forward

In a visual novel, It's very helpful to have the option to skip a step or auto forward to the next step.

Pixi’VN does not directly implement these 2 features, in order to leave more customization to the developer.

My advice to implement these features is to add a control where `narration.goNext()` is used:

```tsx
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
    narration.goNext({})
        .then(() => {
            if (skipEnabled) {
                setTimeout(() => {
                    setRecheckSkipAuto((p) => p + 1)
                }, 0.2);
            }
            else if (autoEnabled) {
                setTimeout(() => {
                    setRecheckSkipAuto((p) => p + 1)
                }, 2);
            }
        })
        .catch((e) => {
            // ...
        })
}

// Button for enable skip and auto ...
```

## How translate the visual novel?

It is the developer's job to choose which library to use to translate the game. It recommend using [i18next](https://www.i18next.com/).

It is recommended to overwrite the `StepLabelProps` interface to add the `t` function. `t` function is a function that will be called with the key of the translation, so you can use it to translate the text.

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelProps {
        /**
         * Translate a key to a string.
         * @param key The key to translate.
         * @returns The translated string.
         */
        t: TFunction<[string], undefined>
        // ...
    }
}
```

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        ({ t }) => narration.dialogue = { character: liam, text: t("hello_my_name_is", { name: "Liam" }) },
    ]
)
```

```json
{
    "hello_my_name_is": "Hello, my name is {{name}}"
}
```

## Where can I store the images?

You are completely free to store images however you want.

The main possibilities are the following:

* Inside the project: You can insert the images inside the project and use the relative path. It recommend this method if you plan to create a desktop/mobile application.
* Inside the project, but download them upon installation: You can insert the images inside the project and download them upon installation. It recommend t this method if you plan to create a desktop/mobile application.
* Public URL: There are more sites that allow you to upload images for free, for example [imgur](https://imgur.com/). You can use the public URL of the image. It recommend t this method if you plan to create a web application.
* Private URL: You can use a private URL of the image, you can use a private server or a cloud service, for example [Amazon S3](https://aws.amazon.com/s3/) or [Firebase](https://firebase.google.com/). It recommend t this method if you plan to create a web application.
