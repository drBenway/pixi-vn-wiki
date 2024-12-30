# Transition

In Pixi’VN provides various transition effect to show or remove an [canvas component](/start/canvas-components.md) and the possibility to [create your own transitions](#create-your-own-transition).

[( More are on the way )](https://github.com/DRincs-Productions/pixi-vn/issues/20)

## Dissolve transition

The dissolve transition when:

* shows a component, gradually increases `alpha`. If a component with the same alias exists, the component will be removed when the new component transition is complete.
* removes a component, gradually decreases `alpha`.

This transition has been created with the [`FadeAlphaTicker`](/start/animations-effects.md#fade).

The `showWithDissolveTransition` function show a canvas element with dissolve transition. This function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image`: The image to show. It can be:
  * a URL/path. In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a array of URL/paths. In this case, will be added a [ImageContainer](/start/canvas-images.md).
  * a `{ value: string, options: ImageSpriteOptions }`, where `value` is the URL/path and `options` is the the options of the [ImageSprite](/start/canvas-images.md). In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a `{ value: string[], options: ImageContainerOptions }`, where `value` is the array of URL/paths and `options` is the the options of the [ImageContainer](/start/canvas-images.md).
  * a [canvas component](/start/canvas-components.md).
* `props` (Optional): The properties of the effect. It corresponds to the props of the [Fade effect](/start/animations-effects.md#fade).
* `priority` (Optional): The priority of the effect.

The `removeWithDissolveTransition` function remove a canvas element with dissolve transition. This function has the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.
* `props` (Optional): The properties of the effect. It corresponds to the props of the [Fade effect](/start/animations-effects.md#fade).
* `priority` (Optional): The priority of the effect.

:::tabs
== startLabel.ts

```ts
import { Assets, newLabel, removeWithDissolveTransition, showWithDissolveTransition } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showWithDissolveTransition("alien", "egg_head", { duration: 5 }); // [!code focus]
        await showWithDissolveTransition("human", { // [!code focus]
            value: ["m01-body", "m01-eyes", "m01-mouth"], // [!code focus]
            options: { scale: 0.5, xAlign: 0.7 }, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        await showWithDissolveTransition("alien", "flower_top"); // [!code focus]
        removeWithDissolveTransition("human"); // [!code focus]
    },
], {
    onLoadingLabel: async () => {
        await Assets.load(["egg_head", "m01-mouth", "m01-body", "m01-eyes"]);
    },
});
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "m01-body", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" });
    Assets.add({ alias: "m01-eyes", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" });
    Assets.add({ alias: "m01-mouth", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" });
}
```

:::

::: sandbox {template=yzslsf entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Fade transition

The fade transition when:

* shows a component, gradually increases `alpha`. If a component with the same alias exists, the existing component will be removed with a fade-out effect before the new component is shown.
* removes a component, gradually decreases `alpha`.

This transition has been created with the [`FadeAlphaTicker`](/start/animations-effects.md#fade).

The `showWithFadeTransition` function show a canvas element with fade transition. This function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image`: The image to show. It can be:
  * a URL/path. In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a array of URL/paths. In this case, will be added a [ImageContainer](/start/canvas-images.md).
  * a `{ value: string, options: ImageSpriteOptions }`, where `value` is the URL/path and `options` is the the options of the [ImageSprite](/start/canvas-images.md). In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a `{ value: string[], options: ImageContainerOptions }`, where `value` is the array of URL/paths and `options` is the the options of the [ImageContainer](/start/canvas-images.md).
  * a [canvas component](/start/canvas-components.md).
* `props` (Optional): The properties of the effect. It corresponds to the props of the [Fade effect](/start/animations-effects.md#fade).
* `priority` (Optional): The priority of the effect.

The `removeWithFadeTransition` function remove a canvas element with fade transition. This function has the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.
* `props` (Optional): The properties of the effect. It corresponds to the props of the [Fade effect](/start/animations-effects.md#fade).
* `priority` (Optional): The priority of the effect.

:::tabs
== startLabel.ts

```ts
import { Assets, newLabel, removeWithDissolveTransition, showWithFadeTransition } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showWithFadeTransition("alien", "egg_head", { duration: 5 }); // [!code focus]
        await showWithFadeTransition("human", { // [!code focus]
            value: ["m01-body", "m01-eyes", "m01-mouth"], // [!code focus]
            options: { scale: 0.5, xAlign: 0.7 }, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        await showWithFadeTransition("alien", "flower_top"); // [!code focus]
        removeWithFadeTransition("human"); // [!code focus]
    },
], {
    onLoadingLabel: async () => {
        await Assets.load(["egg_head", "m01-mouth", "m01-body", "m01-eyes"]);
    },
});
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "m01-body", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" });
    Assets.add({ alias: "m01-eyes", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" });
    Assets.add({ alias: "m01-mouth", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" });
}
```

:::

::: sandbox {template=3r2f3h entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Move in/out transition

The move in/out transition when:

* shows a component, moves the component from outside of the right or left ot top or bottom end of the canvas to the canvas component position. If a component with the same alias exists, the existing component will be removed.
* removes a component, moves the component from a position to outside of the right or left ot top or bottom end of the canvas.

This transition has been created with the [`MoveTicker`](/start/animations-effects.md#move).

The `moveIn` function show a canvas element with move in transition. This function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image`: The image to show. It can be:
  * a URL/path. In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a array of URL/paths. In this case, will be added a [ImageContainer](/start/canvas-images.md).
  * a `{ value: string, options: ImageSpriteOptions }`, where `value` is the URL/path and `options` is the the options of the [ImageSprite](/start/canvas-images.md). In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a `{ value: string[], options: ImageContainerOptions }`, where `value` is the array of URL/paths and `options` is the the options of the [ImageContainer](/start/canvas-images.md).
  * a [canvas component](/start/canvas-components.md).
* `props` (Optional): The properties of the effect. It combines the properties of the [Move effect](/start/animations-effects.md#move) with following properties:
  * `direction`: The direction of the move. It can be `right`, `left`, `top`, `bottom`. default is `right`.
* `priority` (Optional): The priority of the effect.

The `moveOut` function remove a canvas element with move out transition. This function has the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.
* `props` (Optional): The properties of the effect. It combines the properties of the [Move effect](/start/animations-effects.md#move) with following properties:
  * `direction`: The direction of the move. It can be `right`, `left`, `top`, `bottom`. default is `right`.
* `priority` (Optional): The priority of the effect.

:::tabs
== startLabel.ts

```ts
import { Assets, moveIn, moveOut, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await moveIn("alien", "egg_head", { direction: "up" }); // [!code focus]
        await moveIn("human", { // [!code focus]
            value: ["m01-body", "m01-eyes", "m01-mouth"], // [!code focus]
            options: { scale: 0.5, xAlign: 0.7 }, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        await moveIn("alien", "flower_top", { direction: "up" }); // [!code focus]
        moveOut("human"); // [!code focus]
    },
], {
    onLoadingLabel: async () => {
        await Assets.load(["egg_head", "m01-mouth", "m01-body", "m01-eyes"]);
    },
});
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "m01-body", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" });
    Assets.add({ alias: "m01-eyes", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" });
    Assets.add({ alias: "m01-mouth", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" });
}
```

:::

::: sandbox {template=z8gsyy entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Zoom in/out transition

This page is under construction.

## Push in/out transition

This page is under construction.

## Create your own transition

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
