# Images

To make adding and managing images on the canvas easier than pixi.js methods, Pixi’VN it has very basic functions for showing an image.

## Show Image

The simplest and fastest method to show an image on the canvas is to use the `showImage` function.

This function has the following parameters:

* `alias`: Is a alias (or id) for the image. There can only be one item in the canvas with that id, if you add an image with the same alias, the previous image will be removed.
* `imageUrl`: The URL or path of the image.

```typescript
import { showImage } from '@drincs/pixi-vn'

await showImage('image1', 'path/to/image.png')
```

This function is a combination of the [`addImage`](#add-image) and [`load`](#load-image) functions. It is very simple to use, but in cases where you want to manipulate the image before showing it, it is better to use the [`addImage`](#add-image) and [`load`](#load-image) functions separately.

## Add Image

To add an image to the canvas, you can use the `addImage` function. This function will return a `CanvasImage` object that you can use to manipulate the image. `CanvasImage` is a class the extends [`CanvasSprite`](/start/canvas-components#base-components), so you can use all the methods and properties of [`CanvasSprite`](/start/canvas-components#base-components).

It is important to take into account that this function only adds the element to the canvas but does **not show it and does not load its texture**.

`addImage` function has the following parameters:

* `alias`: Is a alias (or id) for the image. There can only be one item in the canvas with that id, if you add an image with the same alias, the previous image will be removed.
* `imageUrl`: The URL or path of the image.

```typescript
import { addImage } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')
```

If you want initialize the image before and then add it to the canvas, you can use the [`canvas.add`](/start/canvas-functions.md#add-canvas-components)function.

```typescript
import { canvas, CanvasImage } from '@drincs/pixi-vn'

let alien = new CanvasImage({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, 'https://pixijs.com/assets/eggHead.png')

canvas.add("alien", alien)
```

## Load Image

After adding the image, you can load the texture and show it on the canvas using the `CanvasImage.load` method.

This method is asynchronous, so:

* You can use the `await` to wait for the image to load. So if you show the image in a step, you can disable the [next step](/start/labels-flow.md#next-step) until the image is loaded.
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
import { addImage, Assets } from '@drincs/pixi-vn'

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

As for the Canvas Elements, you can remove an image from the canvas using the [`canvas.remove`](/start/canvas-functions#remove-canvas-components) function.
