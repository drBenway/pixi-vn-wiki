# FAQ

## How use navigation function in step/label?

It is recommended to overwrite the `StepLabelProps` interface to add the `navigate` function. `navigate` function is a function that will be called with the URL Path or Route of the next step, so you can use it to navigate to the next UI screen.

For example:

::: code-group

```typescript [pixi-vn.d.ts]
declare module '@drincs/pixi-vn' {
    interface StepLabelProps {
        /**
         * function to navigate to a new route.
         * @param route The route to navigate to.
         * @returns 
         */
        navigate: (route: string) => Promise<void>
        // ...
    }
}
```

```typescript [labels/startLabel.ts]
export const startLabel = newLabel("start_label",
    [
        async ({ navigate }) => { // [!code focus]
            await navigate('/new-route') // [!code focus]
        }, // [!code focus]
    ]
)
```

:::

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

### How to link a character to an image to add to the canvas?

Linking a character to an image to add to the canvas is a common feature in visual novels. It can be useful for example for showing the character's expression.

To do this, you just need to create a [custom character](/start/character.md#custom-character) or modify the existing one (it is already present in the templates).
I recommend adding an array of strings containing the links/aliases of the images that make up the character (body, head...), and using an [ImageContainer](/start/canvas-image-container.md) when you need to display the character.

For example:

::: code-group

```ts [models/Character.ts]
import { CharacterInterface, CharacterStoredClass } from "@drincs/pixi-vn";

export class Character extends CharacterStoredClass implements CharacterInterface {
    constructor(id: string | { id: string, emotion: string }, props: CharacterProps) {
        // ...
        this.images = props.images ?? []
    }
    
    // other properties...

    readonly images: string[] = []
}

interface CharacterProps {
    // other properties...
    images?: string[] // is optional
}
```

```ts [pixi-vn.d.ts]
declare module '@drincs/pixi-vn' {
    interface CharacterInterface {
        // other properties...
        readonly images: string[]
    }
}
```

:::

Now you can use the `images` property to show the character on the canvas.

::: code-group

```ts [labels/startLabel.ts]
import { newLabel, showImageContainer } from "@drincs/pixi-vn";
import { alice } from "../values/characters";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImageContainer("alice", alice.images, { // [!code focus]
            xAlign: 0.5, // [!code focus]
            yAlign: 1, // [!code focus]
        }); // [!code focus]
    },
]);
```

```ts [values/characters.ts]
import { Character } from "../models/Character";

const alice = new Character('alice_id', {
    // other properties...
    images: ['alice-body', 'alice-head', 'alice-eyes']
})
RegisteredCharacters.add(alice)
```

:::

**If you are using *ink***:

You can create a [custom hashtag script](/ink/ink-hashtag.md) to use this feature.
For example you can add a script with the following syntax and convert it to a [show imagecontainer script](/ink/ink-canvas.md#show-a-image-container-in-ink):

`#` + `show` + `character` + `[character id]` + `[parameters]`

::: code-group

```ts [utils/ink-utility.ts]
import { onInkHashtagScript } from '@drincs/pixi-vn-ink'
import { getCharacterById } from '@drincs/pixi-vn'

onInkHashtagScript((script, convertListStringToObj) => {
    // ...
    if (script[0] === "show" && script[1] === "character" && script.length > 2) {
        let character = getCharacterById(script[2])
        if (character) {
            console.error('Character not found')
            return false 
        }
        let characterId: string = script[2].split('@')[0] // to remove the emotion
        let oltherProps: string = script.slice(3).join(' ')
        let images = character.images.join(' ')
        let newScript: string = `show imagecontainer ${characterId} [${images}] ${oltherProps}`
        return newScript
    }
    return false
})
```

```ink [start.ink]
=== start ===
# show character alice xAlign 0.8 yAlign 1 with dissolve
-> DONE
```

:::
