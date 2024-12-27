# Transition

In Pixi’VN provides various transition effect to show and remove an [canvas component](/start/canvas-components.md) and the possibility to [create your own transitions](#create-your-own-transitions).

[( More are on the way )](https://github.com/DRincs-Productions/pixi-vn/issues/20)

## Dissolve transition

The dissolve transition when:
* shows a component, gradually increases `alpha`. If a component with the same alias exists, the component will be removed when the new component transition is complete.
* removes a component, gradually decreases `alpha`.

This transition is created with the [`FadeAlphaTicker`](/start/animations-effects.md#fade).

The `showWithDissolveTransition` function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image`: The imageUrl or the canvas component. If imageUrl is a video, then the VideoSprite is added to the canvas.
* `props`: The properties of the effect
* `priority`: ( optional ) The priority of the effect

```typescript
import { showWithDissolveTransition } from '@drincs/pixi-vn'

showWithDissolveTransition('image1', 'path/to/image.png', { duration: 2 })
```

```typescript
import { showWithDissolveTransition } from '@drincs/pixi-vn'

let sprite = new Sprite(yourTexture)
// you can pass a canvas component
showWithDissolveTransition('image1', sprite, { duration: 2 })
```

For remove an image with a fade-out effect, you can use the `removeWithDissolveTransition` function.

```typescript
import { removeWithDissolveTransition } from '@drincs/pixi-vn'

removeWithDissolveTransition('image1', { duration: 2 })
```

## Fade transition

Fade Transition means that the image will be shown with a fade-in effect. If exist a image with the same alias, the existing image will be removed with a fade-out effect before the new image is shown.

( This transition is created with the [`FadeAlphaTicker`](/start/animations-effects.md#fade) )

The `showWithFadeTransition` function has the following parameters:

* `alias`: The unique alias of the image. You can use this alias to refer to this image
* `image`: The imageUrl or the canvas component. If imageUrl is a video, then the VideoSprite is added to the canvas.
* `props`: The properties of the effect
* `priority`: ( optional ) The priority of the effect

```typescript
import { showWithFadeTransition } from '@drincs/pixi-vn'

showWithFadeTransition('image1', 'path/to/image.png', { duration: 2 })
```

```typescript
import { showWithFadeTransition } from '@drincs/pixi-vn'

let sprite = new Sprite(yourTexture)
// you can pass a canvas component
showWithFadeTransition('image1', sprite, { duration: 2 })
```

For remove an image with a fade-out effect, you can use the `removeWithFadeTransition` function.

```typescript
import { removeWithFadeTransition } from '@drincs/pixi-vn'

removeWithFadeTransition('image1', { duration: 2 })
```

## Move in/out transition

This page is under construction.

## Zoom in/out transition

This page is under construction.

## Push in/out transition

This page is under construction.

## Create your own transitions

Create a transition is very simple, you can combine more [Animations and Effects](/start/animations-effects) to create your own transition.

For example, the function `showWithDissolveTransition` is a combination of the [`FadeAlphaTicker`](/start/animations-effects.md#fade) and the `showImage` functions.

```typescript
export async function showWithDissolveTransition<T extends CanvasBase<any> | string = string>(
    alias: string,
    image: T,
    props: Omit<FadeAlphaTickerProps, "type" | aliasToRemoveAfterType | "startOnlyIfHaveTexture"> = {},
    priority?: UPDATE_PRIORITY,
): Promise<void> {
    let oldCanvasAlias: string | undefined = undefined
    // if exist a canvas component with the same alias, then the image is replaced and the first image is removed after the effect is done
    if (canvas.find(alias)) {
        oldCanvasAlias = alias + "_temp_disolve"
        // so is necessary to change the alias of the old canvas component
        // and remove the old canvas component after the effect is done
        canvas.editAlias(alias, oldCanvasAlias)
    }

    let canvasElement: CanvasBase<any>
    if (typeof image === "string") {
        canvasElement = addImage(alias, image)
    }
    else {
        canvasElement = image
        canvas.add(alias, canvasElement)
    }
    if (canvasElement instanceof ImageSprite && canvasElement.texture?.label == "EMPTY") {
        await canvasElement.load()
    }
    canvasElement.alpha = 0

    let effect = new FadeAlphaTicker({
        ...props,
        type: "show",
        // After the effect is done, the old canvas component is removed
        aliasToRemoveAfter: oldCanvasAlias,
        startOnlyIfHaveTexture: true,
    }, 10, priority)
    canvas.addTicker(alias, effect)
    return
}
```

The Pixi’VN Team welcomes new proposals/sharing to make this library more and more complete. So you can create a [issue](https://github.com/DRincs-Productions/pixi-vn/issues) to share/propose it.

## How to force completion of an Transition in the next step?

[Read this](/other/various-answers#how-to-force-completion-of-an-transition-effect-animation-in-the-next-step)
