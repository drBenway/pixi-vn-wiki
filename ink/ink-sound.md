# Use sounds and music in *ink*

The ***ink* + Pixi’VN integration** introduces the a # script that allows you to use the [sounds and music](/start/sound.md).

The syntax is as follows:

`#` + `[operation]` + `sound` + `[alias]` + `[parameters]`

Where:

* `#`: It is a special character used by ***ink* syntax** for use a special script.
* `[operation]`: It is the operation that you want to execute with the sound element. The available operations are:
  * `play`: play a sound
  * `pause`: pause a sound
  * `resume`: resume a sound
  * `stop`: stop a sound
  * `volume`: change the volume of a sound
* `[alias]` It is the alias of the sound element. The alias is a string that identifies the sound element.
  * If the alias includes spaces, you must use double quotes.
* `[parameters]` It is the parameters of the operation. The parameters depend on the operation.
  * If the parameters include spaces, you must use double quotes.
  * If the parameters is a object, you must use the JSON format and the first character must be `\{` and the last character must be `\}`. Example: `\{ "volume": 100, name: "Music" \}`

## Play a sound in *ink*

To play a sound in ***ink***, you can use the `play` operation.

After the alias of the sound element, you can add the `SoundPlayOptions` parameters. These parameters do not have a precise order and must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string you must use double quotes.

:::tabs
== start.ink

```ink
# play sound bird
Now the bird is singing.
# play sound bird volume 100
Now the bird is singing louder.
```

== assets-utility.ts

```ts
import { sound } from "@drincs/pixi-vn";

export async function defineAssets() {
    sound.add('bird', 'https://pixijs.io/sound/examples/resources/bird.mp3');
}
```

:::

## Pause a sound in *ink*

To pause a sound in ***ink***, you can use the `pause` operation.

```ink
# pause sound bird
```

## Resume a sound in *ink*

To resume a sound in ***ink***, you can use the `resume` operation.

```ink
# resume sound bird
```

## Stop a sound in *ink*

To remove a sound in ***ink***, you can use the `stop` operation.

```ink
# stop sound bird
```

## Change the volume of a sound in *ink*

To change the volume of a sound in ***ink***, you can use the `volume` operation.

This operation requires one parameter, the volume of the sound.

```ink
# volume sound bird 100
```
