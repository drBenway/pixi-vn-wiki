# Images

To make adding and managing images on the canvas easier than pixi.js methods, Pixi'VN it has very basic functions for showing an image.

## Add Image and Show

To add an image to the canvas, you can use the `addImage` function. This function will return a `CanvasImage` object that you can use to manipulate the image. `CanvasImage` is a class the extends [`CanvasSprite`](Canvas-Elements), so you can use all the methods and properties of [`CanvasSprite`](Canvas-Elements).

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

* You can use the `await` keyword to wait for the image to load. So if you show the image in a step, you can disable the [next step](Label-and-Game-Step#next-step) until the image is loaded.
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
