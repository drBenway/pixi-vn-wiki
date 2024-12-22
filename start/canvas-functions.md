
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

To remove all canvas elements from the game window, you can use the `canvas.remove`.

```typescript
import { canvas } from '@drincs/pixi-vn'

canvas.removeAll()
```
