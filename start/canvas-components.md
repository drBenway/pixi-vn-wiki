# Canvas Components

Pixi’VN provides a set of canvas components. These components are based on [Pixi.js](https://pixijs.com/), a modern 2D rendering engine with additional features to perform save and load operations.

## Base Components

Currently the base canvas components are:

* `Sprite` corresponds to the component [PixiJS.Sprite](https://pixijs.com/8.x/examples/sprite/basic).
* `Container` corresponds to the component [PixiJS.Container](https://pixijs.com/8.x/examples/basic/container).
* `Text` corresponds to the component [PixiJS.Text](https://pixijs.com/8.x/examples/text/pixi-text).

Other components are added by Pixi’VN, such as:

* [ImageSprite](/start/canvas-images.md) is a class that extends the `Sprite` class.
* [VideoSprite](/start/canvas-videos.md) is a class that extends the `ImageSprite` class.

## Custom Components

You can create custom components by extending the base components. It is necessary use the decorator `@canvasElementDecorator`.

`@canvasElementDecorator` is a decorator that save the canvas component in memory. It have a optional parameter that is the id of the canvas component (must be unique). If you don't pass the id, the canvas component will be saved with the class name. ( [How enable the decorators in TypeScript?](/start/getting-started#how-enable-the-decorators-in-typescript) )

And is necessary to override the `memory` property to store the custom component properties.
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
