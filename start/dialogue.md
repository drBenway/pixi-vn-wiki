# Dialogue

The dialogue/narration is the core of the visual novel.

In Pixi’VN, is possible to set/get a current dialogue and get the history of dialogues.
A dialogue can link to a [character](/start/character#use-characters-in-the-game) or a string and will be used to indicate who is speaking.

## Set a Current Dialogue

To set the current dialogue, you can use the `narration.dialogue`.

```typescript
// in this example, not exists a character with id 'Alice'
// so when you get the current dialogue, the character is a fake character with the name 'Alice'
narration.dialogue = {
    character: "Alice",
    text: "Hello, world!"
}
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
narration.dialogue = {
    character: 'liam-id',
    text: "Hello, world!"
}
// or
narration.dialogue = {
    character: liam,
    text: "Hello, world!"
}
// or
narration.dialogue = new Dialogue("Hello, world!", liam)
```

```typescript
// if don't want to set a character, you can set a string
narration.dialogue = "Hello, world!"
```

## Get a Current Dialogue

To get the current dialogue, you can use the `narration.dialogue`. The return is a `Dialogue`.

```typescript
const currentDialogue: Dialogue = narration.dialogue;
```

## Clear a Current Dialogue

To clear the current dialogue, you can use the `narration.dialogue`.

```typescript
narration.dialogue = undefined;
```
