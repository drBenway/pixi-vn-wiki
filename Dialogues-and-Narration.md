# Dialogues and Narration

The dialogue/narration is the core of the visual novel.

In Pixi'VN, is possible to set/get a current dialogue and get the history of dialogues.
A dialogue can link to a [character](/Characters.md#use-characters-in-the-game) or [character id](/Characters.md#use-characters-in-the-game) or a string and will be used to indicate who is speaking.

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
export const liam = new CharacterModelBase('liam-id', {
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
```

```typescript
// if don't want to set a character, you can set a string
setDialogue("Hello, world!")
```

## Get a Current Dialogue

To get the current dialogue, use the `getDialogue`. The return is a `DialogueModelBase`.

```typescript
const currentDialogue: DialogueModelBase = getDialogue();
```

If you use the [Extended DialogueModel](#extend-dialoguemodelbase), you can get the current dialogue and cast to the extended class.
The return is your extended class or `DialogueModelBase`, so you can use `instanceof` to check the type.

```typescript
const currentDialogue: DialogueModel | DialogueModelBase = getDialogue<DialogueModel>()

if (!currentDialogue instanceof DialogueModel) {
    // console.log("The current dialogue is not a DialogueModel")
}
```

## Clear a Current Dialogue

To clear the current dialogue, use the `clearDialogue`.

```typescript
clearDialogue();
```

## Get the History of Dialogues

To get the history of dialogues for every [game steps](Label-and-Game-Step), use the `getDialogueHistory`. The return is a `IDialogueHistory<T>[]`.

```typescript
const dialogues: IDialogueHistory<DialogueModelBase>[] = getDialogueHistory<DialogueModelBase>();
```

If you use the [Extended DialogueModel](#extend-dialoguemodelbase), you can get the history of dialogues and cast to the extended class.
The return is your extended class or `DialogueModelBase`, so you can use `instanceof` to check the type.

```typescript
const dialogues: IDialogueHistory<DialogueModel | DialogueModelBase>[] = getDialogueHistory<DialogueModel>();

if (!dialogues[0].dialogue instanceof DialogueModel) {
    // console.log("The first dialogue is not a DialogueModel")
}
```

## Extend DialogueModelBase

You can extend the `DialogueModelBase` to add more properties.

```typescript
export class DialogueModel extends DialogueModelBase {
    constructor(
        character: CharacterModelBase | string,
        text: string,
        emotion: string
    ) {
        super(character, text);
        this.emotion = emotion;
    }
    emotion = ""
}
```
