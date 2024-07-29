# Dialogue

The dialogue/narration is the core of the visual novel.

In Pixi’VN, is possible to set/get a current dialogue and get the history of dialogues.
A dialogue can link to a [character](/start/character#use-characters-in-the-game) or [character id](/start/character#use-characters-in-the-game) or a string and will be used to indicate who is speaking.

## Set a Current Dialogue

To set a current dialogue, use the `setDialogue`.

```typescript
// in this example, not exists a character with id 'Alice'
// so when you get the current dialogue, the character is a fake character with the name 'Alice'
setDialogue({
    character: "Alice",
    text: "Hello, world!"
})
```

```typescript
export const liam = new CharacterBaseModel('liam-id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});

// in this example, exists a character with id 'liam-id'
// so when you get the current dialogue, the character is the character with id 'liam-id'
setDialogue({
    character: 'liam-id',
    text: "Hello, world!"
})
// or
setDialogue({
    character: liam,
    text: "Hello, world!"
})
// or
setDialogue(new DialogueBaseModel("Hello, world!", liam))
```

```typescript
// if don't want to set a character, you can set a string
setDialogue("Hello, world!")
```

```typescript
// if don't want to set a character, you can set a string
setDialogue("Hello, world!", {
    emotion: "happy"
})
```

## Get a Current Dialogue

To get the current dialogue, use the `getDialogue`. The return is a `DialogueBaseModel`.

```typescript
const currentDialogue: DialogueBaseModel = getDialogue();
```

If you use the [Extended DialogueModel](#extend-dialoguebasemodel), you can get the current dialogue and cast to the extended class.

```typescript
const currentDialogue: DialogueModel = getDialogue<DialogueModel>()
```

## Clear a Current Dialogue

To clear the current dialogue, use the `clearDialogue`.

```typescript
clearDialogue();
```

## Extend DialogueBaseModel

You can extend the `DialogueBaseModel` to add more properties, but it **not recommended** (you can use the param `oltherParams` to add more properties. `oltherParams` forces you to use only type variables that can be saved on storage).

If you decide to extend the `DialogueBaseModel` keep in mind that this class will be saved on storage as json with `JSON.stringify` and `JSON.parse`.

```typescript
export class DialogueModel extends DialogueBaseModel {
    constructor(
        character: CharacterBaseModel | string,
        text: string,
        emotion: string
    ) {
        super(character, text);
        this.emotion = emotion;
    }
    emotion = ""
}
```

Or better, you can use the param `oltherParams` to add more properties.

```typescript
export class DialogueModel extends DialogueBaseModel {
    constructor(
        text: string,
        character: CharacterModel | string,
        emotion: { [key: string]: string } = {}
    ) {
        super(text, character);
        this.oltherParams = {
            emotion: emotion
        }
    }
    oltherParams: {
        [key: string | number | symbol]: StorageElementType,
        emotion: { [key: string]: string }
    }

    get emotion() {
        return this.oltherParams.emotion;
    }
}
```
