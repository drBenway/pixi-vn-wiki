# Canvas Components

Pixi’VN provides a set of canvas components. These components are based on [Pixi.js](https://pixijs.com/), a modern 2D rendering engine with additional features to perform save and load operations.

## Base Components

Currently the base canvas components are:

* `CanvasSprite` is a class that extends the [PIXI.Sprite](https://pixijs.com/8.x/examples/sprite/basic) class.
* `CanvasContainer` is a class that extends the [PIXI.Container](https://pixijs.com/8.x/examples/basic/container) class.
* `CanvasText` is a class that extends the [PIXI.Text](https://pixijs.com/8.x/examples/text/pixi-text) class.

Other components are added by Pixi’VN, such as:

* [CanvasImage](/start/canvas-images.md) is a class that extends the `CanvasSprite` class.
* [CanvasVideo](/start/canvas-videos.md) is a class that extends the `CanvasImage` class.

## Custom Components

You can create custom components by extending the base components. It is necessary use the decorator `@canvasElementDecorator`.

`@canvasElementDecorator` is a decorator that save the canvas element in memory. It have a optional parameter that is the id of the canvas element (must be unique). If you don't pass the id, the canvas element will be saved with the class name. ( [How enable the decorators in TypeScript?](/start/getting-started#how-enable-the-decorators-in-typescript) )

And is necessary to override the `memory` property to store the custom element properties.
In `get memory()` is very important to return the `className` property, this property must equal to the decorator parameter or the class name if the decorator parameter is not passed.

For example, you can create a `AlienTinting` class that extends the `CanvasSprite` class to manage character sprites.

```typescript
@canvasElementDecorator() // or @canvasElementDecorator("AlienTintingTest")
class AlienTintingTest extends CanvasSprite<IAlienTintingMemory> {
    override get memory() {
        return {
            ...super.memory,
            direction: this.direction,
            turningSpeed: this.turningSpeed,
            speed: this.speed,
            className: "AlienTintingTest",
        }
    }
    override set memory(memory: IAlienTintingMemory) {
        super.memory = memory as ICanvasSpriteMemory
        this.direction = memory.direction
        this.turningSpeed = memory.turningSpeed
        this.speed = memory.speed
    }
    direction: number = 0
    turningSpeed: number = 0
    speed: number = 0
    static override from(source: Texture | TextureSourceLike, skipCache?: boolean) {
        let sprite = Sprite.from(source, skipCache)
        let mySprite = new AlienTintingTest()
        mySprite.texture = sprite.texture
        return mySprite
    }
}
```
