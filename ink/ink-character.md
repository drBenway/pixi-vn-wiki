# Use Character in *ink*

You can use the [Pixi’VN Characters](/start/character.md) in ***ink***. To use the character in ***ink***, you need to create a new character in **Typescript** and, after that, in the ***ink* script**, you can use following syntax:

`character_id` + `:` + `SPACE` + `text`

:::tabs
== start.ink

```ink
=== start ===
liam_id: Hello, I'm Liam.
-> DONE
```

== characters.ts

```ts
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});

saveCharacter([liam]);
```

== App.tsx

```ts
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

// Remember to import the character file at least once into your project. // [!code focus]
import "./values/characters"; // [!code focus]

export default function App() {
return (
    <>
        <NarrationScreen />
        <TextInput />
        <NextButton />
        <BackButton />
    </>
);
}
```

:::

::: sandbox {template=lh88tr entry=/src/ink_labels/start.ink,/src/values/characters.ts}
:::

## Use Character Emotions in *ink*

You can use the [Pixi’VN Character Emotions](/start/character.md#character-emotions) in ***ink***. To use the character emotions in ***ink***, you need to create a new character and in the ***ink* script**, you can use following syntax:

`character_id` + `@` + `emotion` + `:` + `SPACE` + `text`

:::tabs
== start.ink

```ink
=== start ===
liam_id@happy: Hello, I'm Liam and I'm happy.
-> DONE
```

== characters.ts

```ts
const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});

const liamHappy = new CharacterEmotionModel({ id: 'liam_id', emotion: 'happy' }, {
    icon: "https://example.com/liam_happy.png",
    color: "#9e2e12"
});

saveCharacter([liam, liamHappy]);
```

== App.tsx

```ts
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

// Remember to import the character file at least once into your project. // [!code focus]
import "./character"; // [!code focus]

export default function App() {
return (
    <>
        <NarrationScreen />
        <TextInput />
        <NextButton />
        <BackButton />
    </>
);
}
```

:::

## Use Character how variable in *ink*

Having the ability to rename a character and use their name in dialogues greatly simplifies the development of a Visual Novel. Since the [character](/start/character.md) is an object based on a [customizable model](/start/character.md#custom-character), it is not possible to use the character as a [variable](/ink/ink-variables.md) simply with the `{}` syntax.

But you can take advantage of the possibility of [replacing](/ink/ink-replacement.md) and [customizing hashtag scripts](/ink/ink-hashtag.md) to implement this feature.

### Use character name in dialogues

To use the character name in dialogues, you can take advantage of the possibility of [replacing](/ink/ink-replacement.md). For example, you can use the following method:

:::tabs
== main.ts

```ts
import { onGetCharacterText } from 'pixi-vn-ink'
import { getCharacterById } from "@drincs/pixi-vn";

onGetCharacterText((key) => {
    let character = getCharacterById(key)
    if (character) {
        return character.name
    }

    // if return undefined, the system will not replace the character id
    return undefined
})
```

== start.ink

```ink
=== start ===
liam_id: Hello, [liam_id].
-> DONE
```

== characters.ts

```ts
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});

saveCharacter([liam]);
```

:::

### Edit character name in dialogues

To edit the character name in dialogues, you can take advantage of the possibility of [customizing hashtag scripts](/ink/ink-hashtag.md). For example, you can use the following method:

:::tabs
== main.ts

```ts
