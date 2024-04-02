# Images

To make adding and managing images on the canvas easier than pixi.js methods, Pixi'VN it has very basic functions for showing an image.

## Add Image and Show

To add an image to the canvas, you can use the `addImage` function. This function will return a `CanvasImage` object that you can use to manipulate the image. `CanvasImage` is a class the extends [`CanvasSprite`](/Canvas-Elements.md#base-elements), so you can use all the methods and properties of [`CanvasSprite`](/Canvas-Elements.md#base-elements).

It is important to take into account that this function only adds the element to the canvas but does not show it and does not load its texture.

`addImage` function has the following parameters:

* `tag`: Is a tag (or id) for the image. There can only be one item in the canvas with that id, if you add an image with the same tag, the previous image will be removed.
* `imageUrl`: The URL or path of the image.

```typescript
import { addImage } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')
```

## Load and Show Image

After adding the image, you can load the texture and show it on the canvas using the `CanvasImage.load` method.

This method is asynchronous, so:

* You can use the `await` keyword to wait for the image to load. So if you show the image in a step, you can disable the [next step](/Label-and-Game-Step.md#next-step) until the image is loaded.
* You can not use the `await` keyword and show the image in the next step. In this case, the image will be loaded in the background and will be shown when it is ready.

```typescript
import { addImage } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')
await image.load()
```

In some cases you may need to ensure that multiple images are displayed at the same time. In this case, you can use the `showCanvasImages` function to load a array of `CanvasImage`.

```typescript
import { addImage, showCanvasImages } from '@drincs/pixi-vn'

const image1 = addImage('image1', 'path/to/image1.png')
const image2 = addImage('image2', 'path/to/image2.png')

await showCanvasImages([image1, image2])
```

You can use `showCanvasImages` also to show a single image.

```typescript
import { addImage, showCanvasImages } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')

await showCanvasImages(image)
// or await image.load()
```

Another way to make sure multiple images are displayed at the same time is to use the [`PIXI.Assets`](https://pixijs.com/8.x/examples/assets/async) function, for add the textures in cache.

```typescript
import { addImage, showCanvasImages } from '@drincs/pixi-vn'
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

## Remove Image

As for the Canvas Elements, you can remove an image from the canvas using the [`removeCanvasElement`](/Canvas-Elements.md#remove-canvas-elements) function.

## Show Image with Transition

Functions have been implemented to show images with some "standard" transitions.

[( Coming soon )](https://github.com/DRincs-Productions/pixi-vn/issues/20)

### Dissolve Transition

With the Dissolve Transition means that the image will be shown with a fade-in effect. If exist a previous image with the same tag, this image will be removed with a fade-out effect.

The `showImageWithDissolveTransition` function has the following parameters:

* `tag`: The tag of the image.
* `imageUrl`: The URL or path of the image.
* `speed`: The speed of the transition. The default value is 0.1.
* `priority`: ( optional ) The priority of the transition.

```typescript
import { showImageWithDissolveTransition } from '@drincs/pixi-vn'

showImageWithDissolveTransition('image1', 'path/to/image.png', 0.2)
```

## Other Transitions and Animations

The functions above do nothing more than add an image to the canvas, display it and start a Ticker. So you can use [`GameWindowManager.addTicker`](Animations-and-Effects) to add your own transitions and animations.

If you create or need a transition or animation, please create a [issue](https://github.com/DRincs-Productions/pixi-vn/issues) to share/propose it.

### How to force completion of an Transition in the next step?

[Read this](/Various-Answers.md#how-to-force-completion-of-an-transition-effect-animation-in-the-next-step)
