# Canvas Elements

Pixi'VN provides a set of elements to create a visual novel interface. These elements are based on [Pixi.js](https://pixijs.com/), a modern 2D rendering engine with additional features to perform save and load operations.

## Base Elements

Currently the base canvas elements are:

* `CanvasSprite` is a class that extends the [PIXI.Sprite](https://pixijs.com/8.x/examples/sprite/basic) class.
* `CanvasContainer` is a class that extends the [PIXI.Container](https://pixijs.com/8.x/examples/basic/container) class.
* `CanvasText` is a class that extends the [PIXI.Text](https://pixijs.com/8.x/examples/text/pixi-text) class.

## Custom Elements

You can create custom elements by extending the base elements. It is necessary use the decorator `canvasElementDecorator` for register the custom element, for parameters you can pass the canvas element name (the name mast be unique), if you don't pass the name, the canvas element will be saved with the class name.
And is necessary to override the `memory` property to store the custom element properties.

For example, you can create a `AlienTinting` class that extends the `CanvasSprite` class to manage character sprites.

```typescript
@canvasElementDecorator() // or @canvasElementDecorator("AlienTinting")
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

## Add Canvas Elements

To add a canvas element to the game window, you can use the `GameWindowManager.addCanvasElement`.
The `addCanvasElement` method have the following parameters:

* `tag`: Is a tag (or id) for the image. There can only be one item in the canvas with that id, if you add an image with the same tag, the previous image will be removed.
* `element`: The canvas element to add.

```typescript
import { GameWindowManager, CanvasSprite } from '@drincs/pixi-vn'

const sprite = new CanvasSprite()
const texture = await Assets.load("path/to/image.png")
GameWindowManager.addCanvasElement('sprite1', sprite)
```

## Get Canvas Elements

To get a canvas element from the game window, you can use the `GameWindowManager.getCanvasElement`, if the element does not exist, it will return `undefined`.
The `getCanvasElement` method have the following parameters:

* `tag`: The tag of the element to get.

```typescript
import { GameWindowManager } from '@drincs/pixi-vn'

const sprite = GameWindowManager.getCanvasElement<CanvasSprite>('sprite1')
```

## Remove Canvas Elements

To remove a canvas element from the game window, you can use the `GameWindowManager.removeCanvasElement`.
The `removeCanvasElement` method have the following parameters:

* `tag`: The tag of the element to remove.

```typescript
import { GameWindowManager } from '@drincs/pixi-vn'

GameWindowManager.removeCanvasElement('sprite1')
```

## Remove All Canvas Elements

To remove all canvas elements from the game window, you can use the `GameWindowManager.removeCanvasElements`.

```typescript
import { GameWindowManager } from '@drincs/pixi-vn'

GameWindowManager.removeCanvasElements()
```
