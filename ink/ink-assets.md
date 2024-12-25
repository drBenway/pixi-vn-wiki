# Assets management in *ink*

As explained in more detail [here](/start/assets-management.md), it is recommended to initialize the asset matrix at project start and load the assets and think about when the asserts should be loaded.

On ink you have less control than in Javascript/Typescript over how and when to load asserts. On ***ink***, pixi-vn provides a single function that [load assets before a label starts](/start/assets-management.md#load-assets-before-a-label-starts).

The syntax is as follows:

`#` + `load` + `assets` + `[list of URL/path of the image]`

* `#`: It is a special character used by ***ink* syntax** for use a special script.
* `[list of URL/path of the image]`: It is the list of URL/path of the images that you want to show. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. Keep in mind that to write `https://` in ***ink*** you must use `https:\/\/` because the `//` is considered a comment in ***ink***.

:::tabs
== start.ink

```ink
=== start ===
# load assets eggHead flowerTop my_video
# show eggHead
# show flowerTop
# show my_video
# pause
-> start
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn"

export async function defineAssets() {
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
    Assets.add({ alias: "my_video", src: "https://pixijs.com/assets/video.mp4" });
}
```

:::
