# Animations and Effects

Pixi’VN provides a set of animations and effects that can be applied to canvas components.

Animations and Effects are based on [Ticker](/start/tickers). So for add, remove... animations and effects read the [Tickers documentation](/start/tickers).

## Animations

Animations are [Tickers](/start/tickers) that move a [canvas component](/start/canvas-components) without altering the texture.

### Move

For moving a canvas component in `(x, y)` direction you can use the `MoveTicker` class.
This Ticker will edit the `x` and `y` properties to reach the destination.

`MoveTicker` have a constructor that takes the a object with the following properties:

* `destination`: is an object that contains the destination of the movement. It has the following properties:
  * `x`: is a number that represents the destination in the x direction.
  * `y`: is a number that represents the destination in the y direction.
  * `type` (Optional): is a string that represents the type of the destination. Possible values are `pixel`, `percentage` and `align`:
    * `pixel`: The destination is in pixel.
    * `percentage`: The destination is in percentage.
    * `align`: The destination is in align.
    default is `pixel`.
* `speed` (Optional): is a number that represents the speed of the movement.
* `speedProgression` (Optional): in case the movement needs to increase/decrease in speed over time, this property can be used. You can read more about it [here](#speed-progression-property).
* `startOnlyIfHaveTexture` (Optional): is a boolean that represents if the animation should start only if the canvas component have a texture not empty. If `true` and the canvas component not have a texture, the animation will not edit the `x` and `y` properties, but will be executed. You can read more about it [here](#start-only-if-have-texture-property).
* `aliasToRemoveAfter` (Optional): is a string[] that contains the aliases of the [canvas component](/start/canvas-components) that will be removed after the movement. You can read more about it [here](#alias-to-remove-after-property).
* `tickerAliasToResume` (Optional): in case you want to continue some tickers that were previously paused, you can pass the aliases of the canvas components that have the tickers to be resumed. You can read more about it [here](#ticker-alias-to-resume-property).

### Rotate

For rotating a canvas component you can use the `RotateTicker` class.
This Ticker edit the `rotation` property of the [canvas component](/start/canvas-components).
It is possible to start rotation on all [canvas component](/start/canvas-components).

`RotateTicker` have a constructor that takes the a object with the following properties:

* `speed`: is a number that represents the speed of the rotation. default is `0.01`.
* `clockwise`: is a boolean that represents the direction of the rotation. if `true` the rotation is clockwise, if `false` the rotation is counterclockwise. default is `true`.
* `speedProgression`: is a [`TickerProgrationType`](/start/tickers). default is `undefined`.
* `startOnlyIfHaveTexture`: is a boolean that represents if the animation should start only if the canvas component have a texture not empty. default is `false`.

for example:

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
alien.anchor.set(0.5);
canvas.add("alien", alien);

// in this example we rotate the canvas component "alien" with a speed of 0.2
canvas.addTicker("alien", new RotateTicker({ speed: 0.2 }));
```

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
alien.anchor.set(0.5);
canvas.add("alien", alien);

// in this example we rotate the canvas component "alien" with a speed of 0.2 and counterclockwise
canvas.addTicker("alien", new RotateTicker({ speed: 0.2, clockwise: false }, 2))
```

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
alien.anchor.set(0.5);
canvas.add("alien", alien);

// in this example the canvas component "alien" will rotate with a speed of 0 and the speed will increase linearly until it reaches 0.5
canvas.addTicker("alien", new RotateTicker({ speed: 0, speedProgression: { type: "linear", amt: 0.001, limit: 0.5 } }))
```

## Effects

Effects are [Tickers](/start/tickers) that alter the texture of a [canvas component](/start/canvas-components).

[( More are on the way )](https://github.com/DRincs-Productions/pixi-vn/issues/20)

### Fade

For fading a canvas component you can use the `FadeAlphaTicker` class.
This Ticker edit the `alpha` property of the [canvas component](/start/canvas-components).
It is possible to start fading on all [canvas component](/start/canvas-components).

`FadeAlphaTicker` have a constructor that takes the a object with the following properties:

* `duration`: is a number that represents the duration of the fade. default is `1`.
* `type`: it can be `hide` or `show`. if `hide` the canvas component will disappear, if `show` the canvas component will appear. default is `show`.
* `limit`: is a number that represents the limit of the fade. default is `1` if `type` is `show` and `0` if `type` is `hide`.
* `startOnlyIfHaveTexture`: is a boolean that represents if the animation should start only if the canvas component have a texture not empty. default is `false`.
* `aliasToRemoveAfter`: is a string[] that contains the aliases of the [canvas component](/start/canvas-components) that will be removed after the fade. default is `[]`.

for example:

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = Sprite.from(texture);
alien.alpha = 0;
canvas.add("alien", alien);

// in this example we fade the canvas component "alien" with a duration of 2 seconds
canvas.addTicker("alien", new FadeAlphaTicker({ duration: 2 }));
```

## Multiple asserts

### Shake

This page is under construction.

## Special properties

### Speed progression property

### Start only if have texture property

### Alias to remove after property

### Ticker alias to resume property
