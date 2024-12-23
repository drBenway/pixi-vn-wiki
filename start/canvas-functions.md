
## Add Canvas Elements

To add a canvas element to the game window, you can use the `canvas.add`.
The `add` method have the following parameters:

* `alias`: Is a alias (or id) for the canvas element. There can only be one item in the canvas with that id, if you add an canvas element with the same alias, the previous canvas element will be removed.
* `element`: The canvas element to add.

```typescript
import { canvas, CanvasSprite, Assets } from '@drincs/pixi-vn'

const sprite = new CanvasSprite()
const texture = await Assets.load("path/to/image.png")
sprite.texture = texture
canvas.add('sprite1', sprite)
```

## Get Canvas Elements

To get a canvas element from the game window, you can use the `canvas.find`, if the element does not exist, it will return `undefined`.
The `find` method have the following parameters:

* `alias`: The alias of the element to get.

```typescript
import { canvas } from '@drincs/pixi-vn'

const sprite = canvas.find<CanvasSprite>('sprite1')
```

## Remove Canvas Elements

To remove a canvas element from the game window, you can use the `canvas.remove`.
The `remove` method have the following parameters:

* `alias`: The alias of the element to remove.

```typescript
import { canvas } from '@drincs/pixi-vn'

canvas.remove('sprite1')
```

## Remove All Canvas Elements

To remove all canvas components from the game window, you can use the `canvas.remove`.

```typescript
import { canvas } from '@drincs/pixi-vn'

canvas.removeAll()
```

## Add a listener for a given event

**Note that**: It is suggested to try to add events to the [UI](/start/interface) and not add it to the canvas components.

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

<!-- TODO ### New element and not use PixiJS Components -->
<!-- TODO ### New method to add remove and find components -->
<!-- TODO ### New method to add listener -->
<!-- TODO ### access to PIXI.Application -->
