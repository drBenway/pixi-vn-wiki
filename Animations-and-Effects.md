# Animations and Effects

Pixi'VN provides a set of functions to create animations and effects in your visual novel.

Animations and Effects are based on [Ticker](Tickers). So fr add, remove... animations and effects read the [Tickers documentation](Tickers).

## Animations

Animations are [Tickers](Tickers) that move a [canvas element](Canvas-Elements) without altering the texture.

[( Coming soon )](https://github.com/DRincs-Productions/pixi-vn/issues/20)

### Rotate

For rotating a canvas element you can use the `TickerRotate` class.
This Ticker edit the `rotation` property of the [canvas element](Canvas-Elements).
It is possible to start rotation on all [canvas element](Canvas-Elements).

`TickerRotate` have a constructor that takes the a object with the following properties:

* `speed`: is a number that represents the speed of the rotation. default is `0.01`.
* `clockwise`: is a boolean that represents the direction of the rotation. if `true` the rotation is clockwise, if `false` the rotation is counterclockwise. default is `true`.
* `speedProgression`: is a [`TickerProgrationType`](Tickers). default is `undefined`.
* `startOnlyIfHaveTexture`: is a boolean that represents if the animation should start only if the canvas element have a texture not empty. default is `false`.

for example:

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = CanvasSprite.from(texture);
alien.anchor.set(0.5);
GameWindowManager.addCanvasElement("alien", alien);

// in this example we rotate the canvas element "alien" with a speed of 0.2
GameWindowManager.addTicker("alien", new TickerRotate({ speed: 0.2 }));
```

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = CanvasSprite.from(texture);
alien.anchor.set(0.5);
GameWindowManager.addCanvasElement("alien", alien);

// in this example we rotate the canvas element "alien" with a speed of 0.2 and counterclockwise
GameWindowManager.addTicker("alien", new TickerRotate({ speed: 0.2, clockwise: false }, 2000))
```

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = CanvasSprite.from(texture);
alien.anchor.set(0.5);
GameWindowManager.addCanvasElement("alien", alien);

// in this example the canvas element "alien" will rotate with a speed of 0 and the speed will increase linearly until it reaches 0.5
GameWindowManager.addTicker("alien", new TickerRotate({ speed: 0, speedProgression: { type: "linear", amt: 0.001, limit: 0.5 } }))
```

## Effects

Effects are [Tickers](Tickers) that alter the texture of a [canvas element](Canvas-Elements).

[( Coming soon )](https://github.com/DRincs-Productions/pixi-vn/issues/20)

### Fade

For fading a canvas element you can use the `TickerFade` class.
This Ticker edit the `alpha` property of the [canvas element](Canvas-Elements).
It is possible to start fading on all [canvas element](Canvas-Elements).

`TickerFade` have a constructor that takes the a object with the following properties:

* `speed`: is a number that represents the speed of the fade. default is `0.01`.
* `type`: it can be `hide` or `show`. if `hide` the canvas element will disappear, if `show` the canvas element will appear. default is `show`.
* `limit`: is a number that represents the limit of the fade. default is `1` if `type` is `show` and `0` if `type` is `hide`.
* `startOnlyIfHaveTexture`: is a boolean that represents if the animation should start only if the canvas element have a texture not empty. default is `false`.
* `tagToRemoveAfter`: is a string[] that contains the tags of the [canvas element](Canvas-Elements) that will be removed after the fade. default is `[]`.

for example:

```typescript
const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');
const alien = CanvasSprite.from(texture);
alien.alpha = 0;
GameWindowManager.addCanvasElement("alien", alien);

// in this example we fade the canvas element "alien" with a speed of 0.2
GameWindowManager.addTicker("alien", new TickerFade({ speed: 0.2 }));
```

```typescript
