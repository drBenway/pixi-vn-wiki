# Animations and Effects

Pixi’VN provides a set of functions to create animations and effects in your visual novel.

Animations and Effects are based on [Ticker](/start/tickers). So for add, remove... animations and effects read the [Tickers documentation](/start/tickers).

## Animations

Animations are [Tickers](/start/tickers) that move a [canvas component](/start/canvas-components) without altering the texture.

### Move

For moving a canvas component in a x and y direction you can use the `MoveTicker` class.
This Ticker edit the `x` and `y` properties of the [canvas component](/start/canvas-components).
It is possible to start moving on all [canvas component](/start/canvas-components).

`MoveTicker` have a constructor that takes the a object with the following properties:

* `speed`: is a number that represents the speed of the movement. default is `0.01`.
* `destination`: is a `{y: number, x: number}` that represents the destination of the movement. ( is required )
* `speedProgression`: is a [`TickerProgrationType`](/start/tickers). default is `undefined`.
* `startOnlyIfHaveTexture`: is a boolean that represents if the animation should start only if the canvas component have a texture not empty. default is `false`.

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
