# Use Canvas in *ink*

Pixi’VN allows you to use in the ***ink* syntax** the possibility to use the [Canvas](/start/canvas.md).

The syntax is as follows:

`#` + `canvas operation` + `type of the canvas element` + `tag of the canvas element` + `parameters`

* `#` It is a special character used by ***ink* syntax** for add "Special Commands".
* `canvas operation` It is the operation that you want to do with the canvas element. The available operations are `show`, `edit`, and `remove`. In addition only for the video canvas element are `pause` and `resume`.
* `type of the canvas element` It is the type of the canvas element. The available types are `image` and `video`.
* `tag of the canvas element` It is the tag of the canvas element. The tag is a string that identifies the canvas element.
  * If the tag includes spaces, you must use double quotes.
* `parameters` It is the parameters of the operation. The parameters depend on the operation.
  * If the parameters include spaces, you must use double quotes.
  * If the parameters is a object, you must use the JSON format and the first character must be `\{` and the last character must be `\}`. Example: `\{ "color": "red", isVisble: true, position: { x: 100, y: 100 } \}`

## Show Canvas Element in *ink*

To show a canvas element in ***ink***, you can use the `show` operation.

This operation requires the tag of the canvas element and the URL/path of the image.

```ink
# show image bg /image.png
# show image "bg 2 alice" /image2.png
# show image bg https:\/\/game.com/image.png
```

### Show Canvas Element with Transition in *ink*

If you want to show the canvas element with a [transition](/start/transition.md), you can add after the URL or path of the image the transition parameters.

The first parameter is the transition type, the available transitions are `dissolve`, `fade`, `movein` and `zoomin`.

After the transition type, you can add the transition parameters. These parameters do not have a precise order and must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string you must use double quotes.

```ink
# show image bg /image.png dissolve
# show image bg /image.png dissolve duration 3
VAR durationVar = 3
# show image bg /image.png dissolve duration {durationVar}
```

## Edit Canvas Element in *ink*

To edit a canvas element in ***ink***, you can use the `edit` operation. After the tag of the canvas element, you must include the properties of [canvas element](/start/canvas-elements.md) that you want to edit.

In the `parameters` you must include the properties that you want to edit. The properties must be set as follows: `propertyName` + `SPACE` + `value`. If the `value` is a string you must use double quotes.

```ink
# edit image bg position \{ "x": 20, "y": 30 \} visible true  cursor "pointer" alpha 0.5 
```

## Remove Canvas Element in *ink*

To remove a canvas element in ***ink***, you can use the `remove` operation.

```ink
# remove image bg
# remove image "bg 2"
```

### Remove Canvas Element with Transition in *ink*

If you want to remove the canvas element with a [transition](/start/transition.md), you can add after the tag of the canvas element the transition parameters.

The first parameter is the transition type, the available transitions are `dissolve`, `fade`, `moveout` and `zoomout`.

After the transition type, you can add the transition parameters. These parameters do not have a precise order and must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string you must use double quotes.

```ink
# remove image bg dissolve
# remove image bg fade duration 3
```

## Pause Video Canvas Element in *ink*

To pause a video canvas element in ***ink***, you can use the `pause` operation.

```ink
# pause video bg
# pause video "bg 2"
```

## Resume Video Canvas Element in *ink*

To resume a video canvas element in ***ink***, you can use the `resume` operation.

```ink
# resume video bg
# resume video "bg 2"
```
