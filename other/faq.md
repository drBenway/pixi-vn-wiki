# FAQ

## How use navigation function in step/label?

It is recommended to overwrite the `StepLabelProps` interface to add the `navigate` function. `navigate` function is a function that will be called with the URL Path or Route of the next step, so you can use it to navigate to the next UI screen.

For example:

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn' {
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
export const startLabel = newLabel("start_label",
    [
        ({ navigate }) => navigate('/new-route'),
    ]
)
```

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

To do this, you just need to create a [custom character](/start/character.md#custom-character) or modify the existing one (it is already present in the templates), and add the image to the character's properties. I recommend adding an array of strings containing the links/aliases of the images that make up the character (body, head...), and using an ImageContainer when you need to display the character.

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
