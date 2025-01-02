# Tickers methods

To play, pause, or stop a ticker, you must use the functions of the `canvas`.

It is important to keep the following behaviors in mind:

* If a ticker does not have any canvas components associated with it, it will be deleted.
* If you [remove a canvas component](/start/canvas-functions.md#remove-a-canvas-component), your alias will be unlinked from the ticker.
* If you add a canvas component with an alias that already exists, the new component will replace the old one. The new component will inherit the tickers of the old component.

## Run a tickerRun a ticker

To add a ticker you must use the `canvas.addTicker` function. This function receives the following parameters:

* `canvasElementAlias`: The alias of the canvas element that will use the ticker. You can pass a string or an array of strings. If you pass an array of strings, the ticker will be associated with all canvas components.
* `ticker`: The [ticker](/start/canvas-tickers.md) instance to be run.

The function returns the id of the ticker that was added.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { yAlign: 0.5, xAlign: 0.25, anchor: 0.5 });
        await showImage("flower_top", "flower_top", { yAlign: 0.5, xAlign: 0.75, anchor: 0.5 });
        let tikerId = canvas.addTicker(["egg_head", "flower_top"], new RotateTicker({})); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
}
```

:::

::: sandbox {template=vfqzch entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Unlink a canvas component from a ticker

For unlink a canvas component from a ticker you can use the `canvas.removeAssociationBetweenTickerCanvasElement` function. This function receives the following parameters:

* `alias`: The alias of the canvas element that will be unlinked from the ticker. You can pass a string or an array of strings.
* `ticker`: The ticker class to be unlinked.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { yAlign: 0.5, xAlign: 0.25, anchor: 0.5 });
        await showImage("flower_top", "flower_top", { yAlign: 0.5, xAlign: 0.75, anchor: 0.5 });
        let tikerId = canvas.addTicker(["egg_head", "flower_top"], new RotateTicker({}));
    },
    () => {
        canvas.removeAssociationBetweenTickerCanvasElement("egg_head", RotateTicker); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
}
```

:::

::: sandbox {template=scjm5d entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Run a succession of tickers

<!-- TODO 
remove the ticker if there is no canvas component connected to it.
-->

You can run a succession of tickers.
This means you can start a list of tokens, so that when one ends the next begins.

For this you must use the `narration.addTickersSteps` function and pass the alias of the canvas component and an array of tickers.

```typescript
canvas.addTickersSteps("alien", [
    new RotateTicker({ speed: 0.1, clockwise: true }, 2),
    new RotateTicker({ speed: 0.2, clockwise: false }, 2),
])
```

### Pause

If you want to pause the steps for a while, you can use the `Pause` token.

```typescript
canvas.addTickersSteps("alien", [
    new RotateTicker({ speed: 0.1, clockwise: true }, 2),
    Pause(1),
    new RotateTicker({ speed: 0.2, clockwise: false }, 2),
])
```

### Repeat

If you want to repeat the steps, you can use the `Repeat` token.

```typescript
canvas.addTickersSteps("alien", [
    new RotateTicker({ speed: 0.1, clockwise: true }, 2),
    new RotateTicker({ speed: 0.2, clockwise: false }, 2),
    Repeat,
])
```

<!-- TODO: paused tiker -->

### Force completion of the transition at the end of the step

<!-- TODO: tickerMustBeCompletedBeforeNextStep -->

This page is under construction.
