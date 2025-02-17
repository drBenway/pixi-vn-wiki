# Pixi’VN + Json Integration

Pixi’VN can be integrated with JSON files to create a visual novel. This method is useful for:

* Add a new narrative to Pixi’VN (It was used to create the integration with [***ink***](/ink/ink.md) and [Ren'Py](/renpy/renpy.md))
* Create a external tool to create visual novels with Pixi’VN

( In both these cases it is advisable to notify the developers of Pixi’VN to add the new feature to be helped )

```mermaid
flowchart LR;
    K@{ img: "/renpy.svg", label: "Ren'py", pos: "b", w: 90, h: 90, constraint: "on" }---->Json;
    H@{ img: "/ink.svg", label: "ink", pos: "b", w: 90, h: 90, constraint: "on" }---->Json;
    I@{ img: "/twine.svg", label: "Twine", pos: "b", w: 90, h: 90, constraint: "on" }---->Json;
    J@{ img: "/yarn-spinner.svg", label: "Yarn Spinner", pos: "b", w: 90, h: 90, constraint: "on" }---->Json;
    Json@{ img: "/pixivn-json.svg", label: "Pixi’VN + Json", pos: "b", w: 140, h: 140, constraint: "on" }
    Json===>PixiVN;
    PixiVN@{ img: "/logo.webp", label: "Pixi’VN", pos: "b", w: 180, h: 180, constraint: "on" }
classDef img fill:none,stroke:none,borderRadius:50px
class Json,D,K,H,B,I,J,PixiVN img
click K "/renpy/renpy" _blank
click H "/ink/ink" "ink" _blank
```

## How use Pixi’VN + Json?

First of all you need to install the following library:

::: code-group

```sh [npm]
npm install @drincs/pixi-vn-json
```

```sh [yarn]
yarn add @drincs/pixi-vn-json
```

```sh [pnpm]
pnpm add @drincs/pixi-vn-json
```

```sh [bun]
bun add @drincs/pixi-vn-json
```

:::

All you need to do to use this integration is create a object using the [`PixiVNJson` Model](#pixivnjson-model) and use the `importPixiVNJson()` function to import the object.

```typescript
import { PixiVNJson, importPixiVNJson} from '@drincs/pixi-vn-json';

let obj: PixiVNJson = {
    labels: {
        back_in_london: [
            {
                dialogue: "We arrived into London at 9.45pm exactly.",
            },
            {
                labelToOpen: {
                    label: "hurry_home",
                    type: "jump",
                },
            },
        ],
        hurry_home: [
            {
                dialogue: "We hurried home to Savile Row as fast as we could.",
            },
            {
                end: "label_end",
            },
        ]
    }
}

importPixiVNJson(obj);
```

After that you can run the `back_in_london` label with [Pixi’VN functions](/start/labels.md#run-a-label).

```typescript
import { narration } from '@drincs/pixi-vn'

narration.callLabel(`back_in_london`, {})
```

## PixiVNJson Model

You can see the `PixiVNJson` model in the [PixiVNJson.ts](https://github.com/DRincs-Productions/pixi-vn-json/blob/main/src/interface/PixiVNJson.ts) file.

Now `PixiVNJson` is currently in continuous change, more documentation will be written in the future.
