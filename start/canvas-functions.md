# Canvas components functions

## Add a canvas component

To add a canvas component to the game window, you can use the `canvas.add`.
The `add` method have the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) to identify the component.
* `component`: The canvas component to add.

:::tabs
== startLabel.ts

```ts
import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const sprite = new Sprite();
        const texture = await Assets.load("egg_head");
        sprite.texture = texture;
        canvas.add("sprite", sprite); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

::: sandbox {template=pm3n7c entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Get a canvas component

To get a canvas component from the game window, you can use the `canvas.find`, if the component does not exist, it will return `undefined`.
The `find` method have the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to get.

:::tabs
== startLabel.ts

```ts
import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const sprite = new Sprite();
        const texture = await Assets.load("egg_head");
        sprite.texture = texture;
        canvas.add("sprite", sprite);
    },
    () => {
        const sprite = canvas.find("sprite"); // [!code focus]
        if (sprite) {
            sprite.x = 100;
            sprite.y = 100;
        }
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

::: sandbox {template=k6xqwz entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Remove a canvas component

To remove a canvas component from the game window, you can use the `canvas.remove`.
The `remove` method have the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.

:::tabs
== startLabel.ts

```ts
import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const sprite = new Sprite();
        const texture = await Assets.load("egg_head");
        sprite.texture = texture;
        canvas.add("sprite", sprite);
    },
    () => {
        canvas.remove("sprite"); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

::: sandbox {template=3qfr7m entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

## Remove all canvas components

To remove all canvas components from the game window, you can use the `canvas.removeAll`.

:::tabs
== startLabel.ts

```ts
import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const texture = await Assets.load("egg_head");
        for (let i = 0; i < 3; i++) {
            const sprite = new Sprite();
            sprite.texture = texture;
            sprite.x = i * 150;
            canvas.add(`sprite${i}`, sprite);
        }
    },
    () => {
        canvas.removeAll(); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

::: sandbox {template=rnktj2 entry=/src/labels/startLabel.ts,/src/utils/assets-utility.ts}
:::

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
export class EventTest2 extends CanvasEvent<Sprite> {
    textureButtonDown = Texture.from('https://pixijs.com/assets/button_down.png');
    textureButtonOver = Texture.from('https://pixijs.com/assets/button_over.png');
    textureButton = Texture.from('https://pixijs.com/assets/button.png');
    override fn(event: CanvasEventNamesType, sprite: Sprite): void {
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

const button = new Sprite(textureButton);

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

<!-- TODO ### New component and not use PixiJS Components -->
<!-- TODO ### New method to add remove and find components -->
<!-- TODO ### New method to add listener -->
<!-- TODO ### access to PIXI.Application -->
