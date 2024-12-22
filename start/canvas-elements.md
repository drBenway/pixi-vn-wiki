<!-- TODO: Move in new file:
## Add Canvas Elements
## Get Canvas Elements
## Remove Canvas Elements
## Remove All Canvas Elements
## Edit Canvas Element Alias
-->
<!-- TODO: Move in new file:
## Add a listener for a given event
-->

# Canvas Elements

Pixi’VN provides a set of canvas elements. These elements are based on [Pixi.js](https://pixijs.com/), a modern 2D rendering engine with additional features to perform save and load operations.

## Base Elements

Currently the base canvas elements are:

* `CanvasSprite` is a class that extends the [PIXI.Sprite](https://pixijs.com/8.x/examples/sprite/basic) class.
* `CanvasContainer` is a class that extends the [PIXI.Container](https://pixijs.com/8.x/examples/basic/container) class.
* `CanvasText` is a class that extends the [PIXI.Text](https://pixijs.com/8.x/examples/text/pixi-text) class.

Other elements are added by Pixi’VN, such as:

* [CanvasImage](/start/images.md) is a class that extends the `CanvasSprite` class.
* [CanvasVideo](/start/videos.md) is a class that extends the `CanvasImage` class.

## Add a listener for a given event

**Note that**: It is suggested to try to add events to the [UI](/start/interface) and not add it to the canvas elements.

In Pixi’VN compared to PixiJS you can't set a [listener with the `on` method](https://pixijs.com/8.x/examples/events/click), because it is not possible to save the listeners in the memory for the save and load operations.

But you can use `onEvent`, it is a same method that `on` but you can't pass a lambda function, you must pass a Class.

The class that is passed must have the following characteristics:

* extends the `CanvasEvent` class
* override the `fn` method. This method will be executed when the event is triggered.
* have the decorator `@eventDecorator`. `@eventDecorator` is a decorator that save the event in memory. It have a optional parameter that is the id of the event (must be unique). If you don't pass the id, the event will be saved with the class name. ( [How enable the decorators in TypeScript?](/start/getting-started#how-enable-the-decorators-in-typescript) )

```typescript
@eventDecorator()
export class EventTest2 extends CanvasEvent<CanvasSprite> {
    textureButtonDown = Texture.from('https://pixijs.com/assets/button_down.png');
    textureButtonOver = Texture.from('https://pixijs.com/assets/button_over.png');
    textureButton = Texture.from('https://pixijs.com/assets/button.png');
    override fn(event: CanvasEventNamesType, sprite: CanvasSprite): void {
        if (event === 'pointerdown') {
            (sprite as any).isdown = true;
            sprite.texture = this.textureButtonDown;
            sprite.alpha = 1;
        }
        else if (event === 'pointerup' || event === 'pointerupoutside') {
            (sprite as any).isdown = false;
            if ((sprite as any).isOver) {
                sprite.texture = this.textureButtonOver;
            }
            else {
                sprite.texture = this.textureButton;
            }
        }
        else if (event === 'pointerover') {
            (sprite as any).isOver = true;
            if ((sprite as any).isdown) {
                return;
            }
            sprite.texture = this.textureButtonOver;
        }
        else if (event === 'pointerout') {
            (sprite as any).isOver = false;
            if ((sprite as any).isdown) {
                return;
            }
            sprite.texture = this.textureButton;
        }
    }
}

const button = new CanvasSprite(textureButton);

button.anchor.set(0.5);
button.x = buttonPositions[i * 2];
button.y = buttonPositions[i * 2 + 1];

// Make the button interactive...
button.eventMode = 'static';
button.cursor = 'pointer';

button
    // Mouse & touch events are normalized into
    // the pointer* events for handling different
    // button events.
    .onEvent('pointerdown', EventTest2)
    .onEvent('pointerup', EventTest2)
    .onEvent('pointerupoutside', EventTest2)
    .onEvent('pointerover', EventTest2)
    .onEvent('pointerout', EventTest2);

// Add it to the stage
canvas.add("button", button);
```

## Custom Elements

You can create custom elements by extending the base elements. It is necessary use the decorator `@canvasElementDecorator`.

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
