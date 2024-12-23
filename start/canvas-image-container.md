# ImageContainer

The `ImageContainer` component extends the [`Container`](/start/canvas-components#base-components) component, so you can use all the methods and properties of `Container`. It is used to display multiple images on the canvas as if it were a single element.

To initialize the `ImageContainer` component, you must pass the following parameters:

* `options` (Optional): It corresponds to the `ImageContainerOptions<ImageSprite>` interface.
* `imageUrls` (Optional): The array of URLs or paths of the images.

```ts
import { canvas, ImageContainer } from "@drincs/pixi-vn"

let james = new ImageContainer({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, [
    'https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-body.webp?alt=media',
    'https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-eyes-smile.webp?alt=media',
    'https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-mouth-smile00.webp?alt=media',
])

await james.load()
canvas.add("james", james)
```

Compared to the Sprite component, ImageContainer adds the following features:

* `load()`: Load the image URL and set the resulting texture to the sprite.
* Additional positions: [Align](/start/canvas-position.md) and [Position with percentage](/start/canvas-position.md)

## Show image

The simplest and fastest method to show an image on the canvas is to use the `showImage` function. This function is a combination of the `load` and [`canvas.add`](/start/canvas-functions.md#add-canvas-components) functions.

This function will return a `ImageContainer`, that you can use to manipulate the image, and it has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the image.
* `imageUrl` (Optional): The URL or path of the image. If you don't provide the url, then the alias is used as the url.
* `options` (Optional): It corresponds to the `ImageContainerOptions<ImageSprite>` interface.

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
        let alien3 = await showImage("alien3", "https://pixijs.com/assets/eggHead.png", { // [!code focus]
            xAlign: 1, // [!code focus]
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

## Add image

To add an image to the canvas, you can use the `addImage` function. It is important to take into account that this function only adds the component to the canvas but does **not show it and does not load its texture**. This function use [`canvas.add`](/start/canvas-functions.md#add-canvas-components) functions to add the image to the canvas.

This function will return a `ImageContainer`, that you can use to manipulate the image, and it has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the image.
* `imageUrl` (Optional): The URL or path of the image. If you don't provide the url, then the alias is used as the url.
* `options` (Optional): It corresponds to the `ImageContainerOptions<ImageSprite>` interface.

:::tabs
== startLabel.ts

```ts
import { addImage, canvas, ImageContainer, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    () => {
        let alien1 = addImage("alien"); // [!code focus]
        let alien2 = addImage("alien2", "alien", { // [!code focus]
            xAlign: 0.5, // [!code focus]
        }); // [!code focus]
        let alien3 = addImage("alien3", "https://pixijs.com/assets/eggHead.png", { // [!code focus]
            xAlign: 1, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        let alien1 = canvas.find<ImageContainer>("alien");
        let alien2 = canvas.find<ImageContainer>("alien2");
        let alien3 = canvas.find<ImageContainer>("alien3");
        // Load the textures
        alien1 && (await alien1.load());
        alien2 && (await alien2.load());
        alien3 && (await alien3.load());
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

::: sandbox {template=5f3jcr entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Remove image

As for the rest of the canvas components, you can remove an image from the canvas using the [`canvas.remove`](/start/canvas-functions#remove-canvas-components) function.
