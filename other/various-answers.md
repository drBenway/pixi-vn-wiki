# Various Answers

## How enable the decorators in TypeScript?

In Pixi’VN, in many basic functions, it is necessary to use decorators.

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

In Pixi’VN, it is possible to force the completion of a Transition/Effect/Animation in the next step in many cases it can be useful.

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

Also, you can [unlink the Transition/Effect/Animation](/advanced/tickers) from the canvas element in the next step.

## Skip step and Auto Forward

In a visual novel, It's very helpful to have the option to skip a step or auto forward to the next step.

Pixi’VN does not directly implement these 2 features, in order to leave more customization to the developer.

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

It is the developer's job to choose which library to use to translate the game. It recommend using [i18next](https://www.i18next.com/).

For you want use i18next args in dialogues, you can use the following code:

```typescript
export class DialogueModel extends DialogueBaseModel {
    constructor(
        character: CharacterModel | string,
        text: string,
        i18nArgs: { key: string }
    ) {
        super(character, text);
        this.i18nArgs = i18nArgs;
    }
    i18nArgs: { key: string } = { key: "" }
}
// or better
export class DialogueModel extends DialogueBaseModel {
    constructor(
        text: string,
        character: CharacterModel | string,
        i18nArgs: { [key: string]: string } = {}
    ) {
        super(text, character);
        this.oltherParams = {
            i18nArgs: i18nArgs
        }
    }
    oltherParams: { // oltherParams is a param of DialogueBaseModel
        [key: string | number | symbol]: StorageElementType,
        i18nArgs: { [key: string]: string }
    }

    get i18nArgs() {
        return this.oltherParams.i18nArgs;
    }
}
```

```typescript
let dial = getDialogue<DialogueModel>()
if (dial) {
    setText(t(dial.text, dial.i18nArgs))
}
```

## How implement Speed text or Typewriter effect?

In a visual novel, it is very useful to have a typewriter effect.

For implement this effect, you can use the following code:

```typescript
// react example
import { useEffect, useState } from 'react';

type ITypewriterProps = {
    text: string;
    delay: number;
};

export default function Typewriter({ text, delay }: ITypewriterProps) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    useEffect(() => {
        setCurrentText('');
        setCurrentIndex(0);
    }, [text]);

    return <span>{currentText}</span>;
};
```

## Where can I store the images?

You are completely free to store images however you want.

The main possibilities are the following:

* Inside the project: You can insert the images inside the project and use the relative path. It recommend this method if you plan to create a desktop/mobile application.
* Inside the project, but download them upon installation: You can insert the images inside the project and download them upon installation. It recommend t this method if you plan to create a desktop/mobile application.
* Public URL: There are more sites that allow you to upload images for free, for example [imgur](https://imgur.com/). You can use the public URL of the image. It recommend t this method if you plan to create a web application.
* Private URL: You can use a private URL of the image, you can use a private server or a cloud service, for example [Amazon S3](https://aws.amazon.com/s3/) or [Firebase](https://firebase.google.com/). It recommend t this method if you plan to create a web application.
