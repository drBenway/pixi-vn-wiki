# Tickers

The [PixiJS Ticker](https://pixijs.com/8.x/examples/basic/tinting) is a class that manages the update loop. It is used to animate the canvas components.

In Pixi’VN, you can use the Ticker, but through functions of the `canvas` class.
The reason is that this way I can keep track of the Tickers and delete those that are no longer used.

## Create a Ticker

In Pixi.js, you can add a Ticker by passing a lambda as a parameter that will be executed on each frame.

In Pixi’VN, you must create a class tha extends `TickerBase`, add a decorator `@tickerDecorator` to the class and override the `fn` method.

`@tickerDecorator` is a decorator that save the ticker in memory. It have a optional parameter that is the id of the ticker (must be unique). If you don't pass the id, the ticker will be saved with the class name. ( [How enable the decorators in TypeScript?](/start/getting-started#how-enable-the-decorators-in-typescript) )

```typescript
@tickerDecorator() // or @tickerDecorator('RotateTicker')
export default class RotateTicker extends TickerBase<{ speed?: number, clockwise?: boolean }> {
    override fn(
        t: Ticker,
        args: {
            speed?: number,
            clockwise?: boolean,
        },
        aliases: string[]
    ): void {
        let speed = args.speed === undefined ? 0.1 : args.speed
        let clockwise = args.clockwise === undefined ? true : args.clockwise
        aliases.forEach((alias) => {
            let component = canvas.find(alias)
            if (component && component instanceof Container) {
                if (clockwise)
                    component.rotation += speed * t.deltaTime
                else
                    component.rotation -= speed * t.deltaTime
            }
        })
    }
}
```

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
