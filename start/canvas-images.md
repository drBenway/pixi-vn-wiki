# ImageSprite

The `ImageSprite` component extends the [`Sprite`](/start/canvas-components#base-components) component. It is used to display images on the canvas.

To initialize the `ImageSprite` component, you must pass the following parameters:

* `options` (Optional): It corresponds to the `ImageSpriteOptions` interface.
* `imageUrl` (Optional): The URL or path of the image.

```ts
import { canvas, ImageSprite } from "@drincs/pixi-vn"

let alien = new ImageSprite({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, 'https://pixijs.com/assets/eggHead.png')

await alien.load()
canvas.add("alien", alien)
```

Compared to the Sprite component, ImageSprite adds the following features:

* `load()`: Load the image URL and set the resulting texture to the sprite.
* Additional positions: [Align](/start/canvas-position.md) and [Position with percentage](/start/canvas-position.md)

## Show Image

The simplest and fastest method to show an image on the canvas is to use the `showImage` function. This function is a combination of the `load` and [`canvas.add`](/start/canvas-functions.md#add-canvas-components) functions.

This function has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the image.
* `imageUrl` (Optional): The URL or path of the image. If you don't provide the url, then the alias is used as the url.
* `options` (Optional): It corresponds to the `ImageSpriteOptions` interface.

:::tabs
== startLabel.ts

```ts
import { newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        let alien1 = await showImage("alien"); // [!code focus]
        let alien2 = await showImage("alien2", "alien", { // [!code focus]
            xAlign: 0.5, // [!code focus]
        }); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { sound } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "alien", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

::: sandbox {template=m9q8zk entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Add Image

To add an image to the canvas, you can use the `addImage` function. This function will return a `ImageSprite` object that you can use to manipulate the image. `ImageSprite` is a class the extends [`Sprite`](/start/canvas-components#base-components), so you can use all the methods and properties of [`Sprite`](/start/canvas-components#base-components).

It is important to take into account that this function only adds the component to the canvas but does **not show it and does not load its texture**.

`addImage` function has the following parameters:

* `alias`: Is a alias (or id) for the image. There can only be one item in the canvas with that id, if you add an image with the same alias, the previous image will be removed.
* `imageUrl`: The URL or path of the image.

```typescript
import { addImage } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')
```

If you want initialize the image before and then add it to the canvas, you can use the [`canvas.add`](/start/canvas-functions.md#add-canvas-components)function.

```typescript
import { canvas, ImageSprite } from '@drincs/pixi-vn'

let alien = new ImageSprite({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, 'https://pixijs.com/assets/eggHead.png')

canvas.add("alien", alien)
```

## Load Image

After adding the image, you can load the texture and show it on the canvas using the `ImageSprite.load` method.

This method is asynchronous, so:

* You can use the `await` to wait for the image to load. So if you show the image in a step, you can disable the [next step](/start/labels-flow.md#next-step) until the image is loaded.
* You can not use the `await` and show the image in the next step. In this case, the image will be loaded in the background and will be shown when it is ready.

```typescript
import { addImage } from '@drincs/pixi-vn'

const image = addImage('image1', 'path/to/image.png')
await image.load()
```

In some cases you may need to ensure that multiple images are displayed at the same time. In this case, you can use the `loadImage` function to load a array of `ImageSprite`.

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

As for the Canvas Components, you can remove an image from the canvas using the [`canvas.remove`](/start/canvas-functions#remove-canvas-components) function.
