# Images

To make adding and managing images on the canvas easier than pixi.js methods, Pixi’VN it has very basic functions for showing an image.

## Show Image

The simplest and fastest method to show an image on the canvas is to use the `showImage` function.

This function has the following parameters:

* `tag`: Is a tag (or id) for the image. There can only be one item in the canvas with that id, if you add an image with the same tag, the previous image will be removed.
* `imageUrl`: The URL or path of the image.

```typescript
import { showImage } from '@drincs/pixi-vn'

showImage('image1', 'path/to/image.png')
```

This function is a combination of the [`addImage`](#add-image) and [`load`](#load-image) functions. It is very simple to use, but in cases where you want to manipulate the image before showing it, it is better to use the [`addImage`](#add-image) and [`load`](#load-image) functions separately.

## Add image

To add an image to the canvas, you can use the `addImage` function. This function will return a `CanvasImage` object that you can use to manipulate the image. `CanvasImage` is a class the extends [`CanvasSprite`](/start/canvas-elements#base-elements), so you can use all the methods and properties of [`CanvasSprite`](/start/canvas-elements#base-elements).

It is important to take into account that this function only adds the element to the canvas but does **not show it and does not load its texture**.

`addImage` function has the following parameters:

* `tag`: Is a tag (or id) for the image. There can only be one item in the canvas with that id, if you add an image with the same tag, the previous image will be removed.
* `imageUrl`: The URL or path of the image.

```typescript
import { addImage } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')
```

If you want initialize the image before and then add it to the canvas, you can use the [`GameWindowManager.addCanvasElement`](/start/canvas-elements#add-canvas-elements)function.

```typescript
import { GameWindowManager, CanvasImage } from '@drincs/pixi-vn'

let alien = new CanvasImage({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, 'https://pixijs.com/assets/eggHead.png')

GameWindowManager.addCanvasElement("alien", alien)
```

## Load Image

After adding the image, you can load the texture and show it on the canvas using the `CanvasImage.load` method.

This method is asynchronous, so:

* You can use the `await` to wait for the image to load. So if you show the image in a step, you can disable the [next step](/start/labels#next-step) until the image is loaded.
* You can not use the `await` and show the image in the next step. In this case, the image will be loaded in the background and will be shown when it is ready.

```typescript
import { addImage } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')
await image.load()
```

In some cases you may need to ensure that multiple images are displayed at the same time. In this case, you can use the `loadImage` function to load a array of `CanvasImage`.

```typescript
import { addImage, loadImage } from '@drincs/pixi-vn'

const image1 = addImage('image1', 'path/to/image1.png')
const image2 = addImage('image2', 'path/to/image2.png')

await loadImage([image1, image2])
```

You can use `loadImage` also to show a single image.

```typescript
import { addImage, loadImage } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')

await loadImage(image)
// or await image.load()
```

Another way to make sure multiple images are displayed at the same time is to use the [`PIXI.Assets`](https://pixijs.com/8.x/examples/assets/async) function, for add the textures in cache.

```typescript
import { addImage, loadImage } from '@drincs/pixi-vn'
import { Assets } from "pixi.js";

// Load the images and add them to the cache
await Assets.load('path/to/image1.png')
await Assets.load('path/to/image2.png')

const image1 = addImage('image1', 'path/to/image1.png')
const image2 = addImage('image2', 'path/to/image2.png')

// The images are already loaded, so you can show them without waiting
image1.load()
image2.load()
```

## Load Image Textures in Cache when a label is called

If a label shows a sequence of very large images, it can be very useful to load the images in the cache when the label is called. This way, the images will be loaded in the background and will be ready to be displayed when they are needed.

```typescript
export const startLabel = newLabel("StartLabel", [
    // use the image1 ...
    // ...
    ], () => {
        // Load the images in the cache asynchronously, so the images will be loaded in the background
        Assets.load('path/to/image1.png')
        Assets.load('path/to/image2.png')
    }
)
```

```typescript
export const startLabel = newLabel("StartLabel", [
    // use the image1 ...
    // ...
    ], () => {
        // Load the images in the cache synchronously, so before the next step the images will be loaded
        await Assets.load('path/to/image1.png')
        await Assets.load('path/to/image2.png')
    }
)
```

## Remove Image

As for the Canvas Elements, you can remove an image from the canvas using the [`removeCanvasElement`](/start/canvas-elements#remove-canvas-elements) function.

## Show/Remove Image with Transition

You can show and remove an image with a transition effect. Currently,

[( More are on the way )](https://github.com/DRincs-Productions/pixi-vn/issues/20)

### Dissolve Transition

Dissolve Transition means that the image will be shown with a dissolve effect. If exist a image with the same tag, the existing image will be removed when the new image is shown.

( This transition is created with the [`FadeAlphaTicker`](/start/animations-effects.md#fade) )

The `showWithDissolveTransition` function has the following parameters:

* `tag`: The unique tag of the image. You can use this tag to refer to this image
* `image`: The imageUrl or the canvas element
* `props`: The properties of the effect
* `priority`: ( optional ) The priority of the effect

```typescript
import { showWithDissolveTransition } from '@drincs/pixi-vn'

showWithDissolveTransition('image1', 'path/to/image.png', { duration: 2 })
```

```typescript
import { showWithDissolveTransition } from '@drincs/pixi-vn'

let sprite = new CanvasSprite(yourTexture)
// you can pass a canvas element
showWithDissolveTransition('image1', sprite, { duration: 2 })
```

For remove an image with a fade-out effect, you can use the `removeWithDissolveTransition` function.

```typescript
import { removeWithDissolveTransition } from '@drincs/pixi-vn'

removeWithDissolveTransition('image1', { duration: 2 })
```

### Fade Transition

Fade Transition means that the image will be shown with a fade-in effect. If exist a image with the same tag, the existing image will be removed with a fade-out effect before the new image is shown.

( This transition is created with the [`FadeAlphaTicker`](/start/animations-effects.md#fade) )

The `showWithFadeTransition` function has the following parameters:

* `tag`: The unique tag of the image. You can use this tag to refer to this image
* `image`: The imageUrl or the canvas element
* `props`: The properties of the effect
* `priority`: ( optional ) The priority of the effect

```typescript
import { showWithFadeTransition } from '@drincs/pixi-vn'

showWithFadeTransition('image1', 'path/to/image.png', { duration: 2 })
```

```typescript
import { showWithFadeTransition } from '@drincs/pixi-vn'

let sprite = new CanvasSprite(yourTexture)
// you can pass a canvas element
showWithFadeTransition('image1', sprite, { duration: 2 })
```

For remove an image with a fade-out effect, you can use the `removeWithFadeTransition` function.

```typescript
import { removeWithFadeTransition } from '@drincs/pixi-vn'

removeWithFadeTransition('image1', { duration: 2 })
```

<!-- TODO moveIn -->

<!-- TODO zoomIn -->

## Create your own transitions

Create a transition is very simple, you can combine more [Animations and Effects](/start/animations-effects) to create your own transition.

For example, the function `showWithDissolveTransition` is a combination of the [`FadeAlphaTicker`](/start/animations-effects.md#fade) and the `showImage` functions.

```typescript
export async function showWithDissolveTransition<T extends CanvasBase<any> | string = string>(
    tag: string,
    image: T,
    props: Omit<FadeAlphaTickerProps, "type" | tagToRemoveAfterType | "startOnlyIfHaveTexture"> = {},
    priority?: UPDATE_PRIORITY,
): Promise<void> {
    let oldCanvasTag: string | undefined = undefined
    // if exist a canvas element with the same tag, then the image is replaced and the first image is removed after the effect is done
    if (GameWindowManager.getCanvasElement(tag)) {
        oldCanvasTag = tag + "_temp_disolve"
        // so is necessary to change the tag of the old canvas element
        // and remove the old canvas element after the effect is done
        GameWindowManager.editCanvasElementTag(tag, oldCanvasTag)
    }

    let canvasElement: CanvasBase<any>
    if (typeof image === "string") {
        canvasElement = addImage(tag, image)
    }
    else {
        canvasElement = image
        GameWindowManager.addCanvasElement(tag, canvasElement)
    }
    if (canvasElement instanceof CanvasImage && canvasElement.texture?.label == "EMPTY") {
        await canvasElement.load()
    }
    canvasElement.alpha = 0

    let effect = new FadeAlphaTicker({
        ...props,
        type: "show",
        // After the effect is done, the old canvas element is removed
        tagToRemoveAfter: oldCanvasTag,
        startOnlyIfHaveTexture: true,
    }, 10, priority)
    GameWindowManager.addTicker(tag, effect)
    return
}
```

The Pixi’VN Team welcomes new proposals/sharing to make this library more and more complete. So you can create a [issue](https://github.com/DRincs-Productions/pixi-vn/issues) to share/propose it.

### How to force completion of an Transition in the next step?

[Read this](/other/various-answers#how-to-force-completion-of-an-transition-effect-animation-in-the-next-step)
