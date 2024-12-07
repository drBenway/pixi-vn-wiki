# Use canvas in *ink*

The ***ink* + Pixi’VN integration** introduces the a # script that allows you to show, edit, remove and etc. a [canvas element](/start/canvas-elements.md).

The syntax is as follows:

`#` + `[operation]` + `[type of the canvas element]` + `[alias]` + `[parameters]`

Where:

* `#`: It is a special character used by ***ink* syntax** for use a special script.
* `[operation]`: It is the operation that you want to execute with the canvas element. The available operations are:
  * `show`: Show a canvas element. (Read more [here](#show-canvas-element-in-ink))
  * `edit`: Edit a canvas element. (Read more [here](#edit-canvas-element-in-ink))
  * `remove`: Remove a canvas element. (Read more [here](#remove-canvas-element-in-ink))
  * `pause` (Only for video): Pause a video canvas element. (Read more [here](#pause-video-canvas-element-in-ink))
  * `resume` (Only for video): Resume a video canvas element. (Read more [here](#resume-video-canvas-element-in-ink))
* `[type of the canvas element]` It is the type of the canvas element. The available types are:
  * [`image`](/start/images.md)
  * [`video`](/start/videos.md)
* `[alias]` It is the [alias of the canvas element](/start/canvas-alias.md). The alias is a string that identifies the canvas element.
  * If the alias includes spaces, you must use double quotes.
* `[parameters]` It is the parameters of the operation. The parameters depend on the operation.
  * If the parameters include spaces, you must use double quotes.
  * If the parameters is a object, you must use the JSON format and the first character must be `\{` and the last character must be `\}`. Example: `\{ "color": "red", isVisble: true, position: { x: 100, y: 100 } \}`

::: sandbox {template=rxzx5z entry=/src/ink/start.ink,/src/utils/assets-utility.ts}
:::

## Show canvas element in *ink*

You can use the `show` to show a [canvas element](/start/canvas-elements.md) in ***ink***.

Is raccomended to [initialize the asset matrix at project start](/start/assets-management.md#initialize-the-asset-matrix-at-project-start) to use the alias of texture in `[URL/path of the image]`.

The syntax is as follows:

`#` + `show` + `[type of the canvas element]` + `[alias]` + `[URL/path of the image]` + `[parameters]`

* `[URL/path of the image]` (Optional): It is the URL/path of the image that you want to show. If you have initialized the asset matrix at project start, you can use the alias of the texture. If you don't provide the URL/path of the image, this parameter is equal to `[alias]`. Keep in mind that to write `https://` in ***ink*** you must use `https:\/\/` because the `//` is considered a comment in ***ink***.
* `[parameters]` (Optional): Afer the URL/path of the image, you can add the `parameters` of the [canvas element](/start/canvas-elements.md) that you want to set. The `parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

:::tabs
== start.ink

```ink
# show image eggHead
# show image "eggHead 2" eggHead x 20 y 30
# show image flowerTop x 20 y 30 visible true cursor "pointer" alpha 0.5
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
}
```

:::

### Show canvas element with transition in *ink*

If you want to show the canvas element with a [transition](/start/transition.md), you can add into the parameters the `with [transitionType]`.

`#` + `show` + `[type of the canvas element]` + `[alias]` + `[URL/path of the image]` + `[parameters]` + `with` + `[transitionType]`

After the `transitionType`, you can add the `transition parameters`. the `transition parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

The syntax is as follows:

`#` + `show` + `[type of the canvas element]` + `[alias]` + `[URL/path of the image]` + `[parameters]` + `with` + `[transitionType]` + `[transition parameters]`

The available transitions are:

* `dissolve`: The canvas element appears with a [dissolve transition](/start/transition.md#dissolve-transition). You can add all the parameters you would use in JS/TS.
* `fade`: The canvas element appears with a [fade transition](/start/transition.md#fade-transition). You can add all the parameters you would use in JS/TS.
* `movein`: The canvas element appears with a [movein transition](/start/transition.md#move-inout-transition). You can add all the parameters you would use in JS/TS.
* `zoomin`: The canvas element appears with a [zoomin transition](/start/transition.md#zoom-inout-transition). You can add all the parameters you would use in JS/TS.
* `pushin`: The canvas element appears with a [pushin transition](/start/transition.md#push-inout-transition). You can add all the parameters you would use in JS/TS.

:::tabs
== start.ink

```ink
# show eggHead with dissolve duration 3
temp durationVar = 3
# show eggHead eggHead2 with fade duration {durationVar}
# show flowerTop x 20 y 30 with movein
# show helmlok x 20 y 30 with zoomin
# show skully x 20 y 30 with pushin
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
    Assets.add({ alias: 'helmlok', src: "https://pixijs.com/assets/helmlok.png" })
    Assets.add({ alias: 'skully', src: "https://pixijs.com/assets/skully.png" })
}
```

:::

## Edit canvas element in *ink*

You can use the `edit` to edit a [canvas element](/start/canvas-elements.md) in ***ink***.

The syntax is as follows:

`#` + `edit` + `[type of the canvas element]` + `[alias]` + `[parameters]`

* `[parameters]`: In the `parameters` you must include the properties that you want to edit. The `parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

```ink
# edit image bg position \{ "x": 20, "y": 30 \} visible true  cursor "pointer" alpha 0.5 
```

## Remove canvas element in *ink*

You can use the `remove` to remove a [canvas element](/start/canvas-elements.md) in ***ink***.

The syntax is as follows:

`#` + `remove` + `[type of the canvas element]` + `[alias]`

```ink
# remove image bg
# remove image "bg 2"
```

### Remove canvas element with transition in *ink*

If you want to remove the canvas element with a [transition](/start/transition.md), you can add after the alias of the canvas element `with [transitionType]`. 

`#` + `remove` + `[type of the canvas element]` + `[alias]` + `with` + `[transitionType]`

After the `transitionType`, you can add the `transition parameters`. the `transition parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

The syntax is as follows:

`#` + `remove` + `[type of the canvas element]` + `[alias]` + `with` + `[transitionType]` + `[transition parameters]`

The available transitions are:

* `dissolve`: The canvas element disappears with a [dissolve transition](/start/transition.md#dissolve-transition). You can add all the parameters you would use in JS/TS.
* `fade`: The canvas element disappears with a [fade transition](/start/transition.md#fade-transition). You can add all the parameters you would use in JS/TS.
* `moveout`: The canvas element disappears with a [moveout transition](/start/transition.md#move-inout-transition). You can add all the parameters you would use in JS/TS.
* `zoomout`: The canvas element disappears with a [zoomout transition](/start/transition.md#zoom-inout-transition). You can add all the parameters you would use in JS/TS.
* `pushout`: The canvas element disappears with a [pushout transition](/start/transition.md#push-inout-transition). You can add all the parameters you would use in JS/TS.

```ink
# remove image bg with dissolve duration 3
temp durationVar = 3
# remove image bg with fade duration {durationVar}
# remove image bg with moveout
# remove image bg with zoomout
# remove image bg with pushout
```

## Use Effects in *ink*

You can use the [effects](/start/animations-effects.md) in ***ink***.

If you want to use an effect in ***ink***, you can use how `[operation]` the name of the effect.

The available `[effectType]` are:

* `fade`: Create a fade effect. (Read more [here](/start/animations-effects.md#fade)). You can add all the parameters you would use in JS/TS.
* `move`: Create a move effect. (Read more [here](/start/animations-effects.md#move)). You can add all the parameters you would use in JS/TS. To simplify the use you can use instead of `destination \{ x: 20, y: 30 \}` the `x 20 y 30`.
* `rotate`: Create a rotate effect. (Read more [here](/start/animations-effects.md#rotate)). You can add all the parameters you would use in JS/TS.
* `zoom`: Create a zoom effect. (Read more [here](/start/animations-effects.md#zoom)). You can add all the parameters you would use in JS/TS.
* `shake`: Create a shake effect. (Read more [here](/start/animations-effects.md#shake)). You can add all the parameters you would use in JS/TS.

The syntax is as follows:
  
`#` + `[effectType]` + `[alias]` + `[parameters]`
  
```ink
# fade bg duration 3
temp durationVar = 3
# fade bg duration {durationVar}
# move bg x 20 y 30 duration 3
# rotate bg clockwise false duration 3
# zoom bg scale 2 duration 3
# shake bg duration 3
```

## Pause video canvas element in *ink*

To pause a video canvas element in ***ink***, you can use the `pause` operation.

```ink
# pause video bg
# pause video "bg 2"
```

## Resume video canvas element in *ink*

To resume a video canvas element in ***ink***, you can use the `resume` operation.

```ink
# resume video bg
# resume video "bg 2"
```
