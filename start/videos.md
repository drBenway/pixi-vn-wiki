# Videos

To make adding and managing videos on the canvas easier than pixi.js methods, Pixi’VN it has very basic functions for showing and managing videos. `CanvasVideo` is a class that extends [`CanvasImage`](/start/images.md), all the methods and properties of [`CanvasImage`](/start/images.md) can be used with `CanvasVideo` and all functions that work with images can work with videos.

## Show Video

The simplest and fastest method to show an video on the canvas is to use the `showVideo` function.

This function has the following parameters:

* `alias`: Is a alias (or id) for the video. There can only be one item in the canvas with that id, if you add an video with the same alias, the previous video will be removed.
* `videoUrl`: The URL or path of the video.

```typescript
import { showVideo } from '@drincs/pixi-vn'

showVideo('video1', 'path/to/video.mp4')
```

This function is a combination of the [`addVideo`](#add-video) and [`load`](#load-video) functions. It is very simple to use, but in cases where you want to manipulate the video before showing it, it is better to use the [`addVideo`](#add-video) and [`load`](#load-video) functions separately.

## Add Video

To add an video to the canvas, you can use the `addVideo` function. This function will return a `CanvasVideo` object that you can use to manipulate the video. `CanvasVideo` is a class the extends [`CanvasImage`](/start/images.md), so you can use all the methods and properties of [`CanvasImage`](/start/images.md).

It is important to take into account that this function only adds the element to the canvas but does **not show it and does not load its texture**.

`addVideo` function has the following parameters:

* `alias`: Is a alias (or id) for the video. There can only be one item in the canvas with that id, if you add an video with the same alias, the previous video will be removed.
* `videoUrl`: The URL or path of the video.

```typescript
import { addVideo } from '@drincs/pixi-vn'

const video = addVideo('video1', 'path/to/video.mp4')
```

If you want initialize the video before and then add it to the canvas, you can use the [`canvas.add`](/start/canvas-elements#add-canvas-elements)function.

```typescript
import { canvas, CanvasVideo } from '@drincs/pixi-vn'

let alien = new CanvasVideo({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, 'https://pixijs.com/assets/eggHead.mp4')

canvas.add("alien", alien)
```

## Load Video

After adding the video, you can load the texture and show it on the canvas using the `CanvasVideo.load` method.

This method is asynchronous, so:

* You can use the `await` to wait for the video to load. So if you show the video in a step, you can disable the [next step](/start/labels#next-step) until the video is loaded.
* You can not use the `await` and show the video in the next step. In this case, the video will be loaded in the background and will be shown when it is ready.

```typescript
import { addVideo } from '@drincs/pixi-vn'

const video = addVideo('video1', 'path/to/video.mp4')
await video.load()
```

In some cases you may need to ensure that multiple videos are displayed at the same time. In this case, you can use the `loadVideo` function to load a array of `CanvasVideo`.

```typescript
import { addVideo, loadVideo } from '@drincs/pixi-vn'

const video1 = addVideo('video1', 'path/to/video1.mp4')
const video2 = addVideo('video2', 'path/to/video2.mp4')

await loadVideo([video1, video2])
```

You can use `loadVideo` also to show a single video.

```typescript
import { addVideo, loadVideo } from '@drincs/pixi-vn'

const video = addVideo('video1', 'path/to/video.mp4')

await loadVideo(video)
// or await video.load()
```

Another way to make sure multiple videos are displayed at the same time is to use the [`PIXI.Assets`](https://pixijs.com/8.x/examples/assets/async) function, for add the textures in cache.

```typescript
import { addVideo, Assets } from '@drincs/pixi-vn'

// Load the videos and add them to the cache
await Assets.load('path/to/video1.png')
await Assets.load('path/to/video2.png')

const video1 = addVideo('video1', 'path/to/video1.png')
const video2 = addVideo('video2', 'path/to/video2.png')

// The videos are already loaded, so you can show them without waiting
video1.load()
video2.load()
```

## Load Video Textures in Cache when a label is called

It's exactly the same as [Load Image Textures in Cache when a label is called](/start/images.md#load-image-textures-in-cache-when-a-label-is-called), but with videos.

## Remove Video

As for the Canvas Elements, you can remove an video from the canvas using the [`canvas.remove`](/start/canvas-elements#remove-canvas-elements) function.

## Play and Pause Video

You can use the `play()` and `pause()` methods to play and pause the video, or set the `paused` property to `true` or `false`.

```typescript
import { addVideo } from '@drincs/pixi-vn'

const video = addVideo('video1', 'path/to/video.mp4')
await video.load()

video.play()
// or video.paused = false

video.pause()
// or video.paused = true
```

## Loop Video

You can use the `loop` property to set the video to loop.

```typescript
import { addVideo } from '@drincs/pixi-vn'

const video = addVideo('video1', 'path/to/video.mp4')
await video.load()

video.loop = true
```

## Restart Video

You can use the `restart` method to restart the video.

```typescript
import { addVideo } from '@drincs/pixi-vn'

const video = addVideo('video1', 'path/to/video.mp4')
await video.load()

video.restart()
```
