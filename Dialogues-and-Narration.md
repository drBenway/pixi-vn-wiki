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

## Extend DialogueModelBase

[( Coming soon )](https://github.com/DRincs-Productions/pixi-vn/issues/84)
