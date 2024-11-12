# Use Character in *ink*

You can use the [Pixi’VN Character](/start/character.md) in ***ink***. To use the character in ***ink***, you need to create a new character and in the ***ink* script**, you can use following syntax:

`character_id` + `:` + `SPACE` + `text`

```ts
const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});
saveCharacter(liam);
```

```ink
liam_id: Hello, I'm Liam.
```

## Use Character Emotions in *ink*

You can use the [Pixi’VN Character Emotions](/start/character.md#character-emotions) in ***ink***. To use the character emotions in ***ink***, you need to create a new character and in the ***ink* script**, you can use following syntax:

`character_id` + `@` + `emotion` + `:` + `SPACE` + `text`

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

```ink
liam_id@happy: Hello, I'm Liam and I'm happy.
```
