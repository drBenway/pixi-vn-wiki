# Tickers methods

To play, pause, or stop a ticker, you must use the functions of the `canvas`.

## Run a tickerRun a ticker

To add a ticker you must use the `canvas.addTicker` function. This function receives the following parameters:

- `canvasElementAlias`: The alias of the canvas element that will use the ticker. You can pass a string or an array of strings. If you pass an array of strings, the ticker will be associated with all canvas components.
- `ticker`: The [ticker](/start/canvas-tickers.md) instance to be run.

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

For unlink a canvas component from a ticker you can use the `canvas.removeAssociationBetweenTickerCanvasElement` function and pass the alias of the canvas component and a ticker class.

If the ticker not have any more canvas components associated, it will be deleted.

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
canvas.add("alien", alien);

canvas.addTicker("alien", new RotateTicker({ speed: my_speed }))

// ...

canvas.removeAssociationBetweenTickerCanvasElement("alien", RotateTicker)
```

If you remove the Canvas Component associated with the ticker, if the ticker not have any more canvas components associated, it will be deleted.

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
canvas.add("alien", alien);

canvas.addTicker("alien", new RotateTicker({ speed: my_speed }))

// ...

canvas.remove("alien")
```

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
