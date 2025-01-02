# Tickers methods

## Run a Ticker and associate with a Canvas Component

To add a Ticker you must use the `canvas.addTicker` function and pass the ticker class.

<!-- TODO  
You can run multiple addTicker with the same alias and different tickerClasses.
* If you run a ticker with the same alias and tickerClass, the old ticker will be removed.
* If already exists a sequence of tickers with the same alias, it will be removed.
-->

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
canvas.add("alien", alien);

canvas.addTicker("alien", new RotateTicker({ speed: my_speed }))
```

If a ticket needs to update multiple canvas components, you can pass an array of aliases to the `addTicker` function.

```typescript
canvas.addTicker(["alien", "alien2"], new RotateTicker({ speed: my_speed }))
```

You can also set the duration of the ticket so that upon completion it is deleted.

```typescript
canvas.addTicker("alien", new RotateTicker({ speed: my_speed }, 2))
```

## Remove association between a Ticker and a Canvas Component

For unlink a Ticker from a Canvas Component you must use the `canvas.removeAssociationBetweenTickerCanvasElement` function and pass the alias of the canvas component and a ticker class.

If the ticker not have any more canvas components associated, it will be deleted.

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
canvas.add("alien", alien);

canvas.addTicker("alien", new RotateTicker({ speed: my_speed }))

// ...

canvas.removeAssociationBetweenTickerCanvasElement("alien", RotateTicker)
```

If you remove the Canvas Component associated with the Ticker, if the Ticker not have any more canvas components associated, it will be deleted.

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
canvas.add("alien", alien);

canvas.addTicker("alien", new RotateTicker({ speed: my_speed }))

// ...

canvas.remove("alien")
```

## Run a succession of Tickers

<!-- TODO 
remove the ticker if there is no canvas component connected to it.
-->

You can run a succession of Tickers.
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
