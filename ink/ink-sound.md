# Using Sounds and Music in *ink*

Pixi’VN allows you to use in the ***ink* syntax** the possibility to use the [Sounds and Music](/start/sound.md).

The syntax is as follows:

`#` + `sound operation` + `sound` + `tag of the sound element` + `parameters`

* `#` It is a special character used by ***ink* syntax** for add Special Commands.
* `sound operation` It is the operation that you want to do with the sound element. The available operations are `add`, `play`, `pause`, `resume`, `remove` and `volume`.
* `tag of the sound element` It is the tag of the sound element. The tag is a string that identifies the sound element.
  * If the tag includes spaces, you must use double quotes.
* `parameters` It is the parameters of the operation. The parameters depend on the operation.
  * If the parameters include spaces, you must use double quotes.
  * If the parameters is a object, you must use the JSON format and the first character must be `\{` and the last character must be `\}`. Example: `\{ "volume": 100, name: "Music" \}`

## Add Sound in *ink*

To add a sound in ***ink***, you can use the `add` operation.

This operation requires one parameter, the URL or path of the sound.

After the tag of the the URL or path of the sound, you can add the `SoundOptions` parameters. These parameters do not have a precise order and must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string you must use double quotes.

```ink
# sound add bird /bird.mp3
# sound add "bird 2" /bird2.mp3 volume 100
```

## Play Sound in *ink*

To play a sound in ***ink***, you can use the `play` operation.

After the tag of the sound element, you can add the `SoundPlayOptions` parameters. These parameters do not have a precise order and must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string you must use double quotes.

```ink
# play sound bird
# play sound bird volume 100
```

## Pause Sound in *ink*

To pause a sound in ***ink***, you can use the `pause` operation.

```ink
# pause sound bird
```

## Resume Sound in *ink*

To resume a sound in ***ink***, you can use the `resume` operation.

```ink
# resume sound bird
```

## Remove Sound in *ink*

To remove a sound in ***ink***, you can use the `remove` operation.

```ink
# remove sound bird
```

## Volume Sound in *ink*

To change the volume of a sound in ***ink***, you can use the `volume` operation.

This operation requires one parameter, the volume of the sound.

```ink
# volume sound bird 100
```
