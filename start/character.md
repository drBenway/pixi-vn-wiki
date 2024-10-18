# Characters

The characters are the actors that appear in the visual novel.
In Pixi’VN, characters are created using the `CharacterBaseModel` class or a [custom class](#custom-character).

## Initialize Characters

To initialize a character, you need to create a new instance of the `CharacterBaseModel` class and add it into a game character dictionary, when the game is initialized.

For create a new instance of `CharacterBaseModel` you need the following parameters:

* `id`: A unique identifier for the character (string). It is used to reference the character in the game (must be unique).
If you want to create a [character with an emotion, you can pass an object](#character-emotions).
* `props`: An object with the character's properties.
The properties are:
  * `name`: The character's name. ( Required )
  * `surname`: The character's surname. ( Optional )
  * `age`: The character's age. ( Optional )
  * `icon`: The character's icon image URL. ( Optional )
  * `color`: The character's color. ( Optional )

```typescript
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const liam = new CharacterBaseModel('liam', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});

export const emma = new CharacterBaseModel('emma', {
    name: 'Emma',
    surname: 'Johnson',
    age: 23,
    icon: "https://example.com/emma.png",
    color: "#9e2e12"
});

saveCharacter([liam, emma]);
```

`saveCharacter` is required to save the characters in the game.

It is also possible to create a function for loading characters. The important thing is that it is started at least once before the characters are used in the game, otherwise they will not be available.

```typescript
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export function loadCharacters() {
    const liam = new CharacterBaseModel('liam', {
        name: 'Liam',
        surname: 'Smith',
        age: 25,
        icon: "https://example.com/liam.png",
        color: "#9e2e12"
    });

    const emma = new CharacterBaseModel('emma', {
        name: 'Emma',
        surname: 'Johnson',
        age: 23,
        icon: "https://example.com/emma.png",
        color: "#9e2e12"
    });

    saveCharacter([liam, emma]);
}

loadCharacters();
```

## Get Characters by id

To get a character by its `id`, you can use the `getCharacterById` function.

```typescript
import { getCharacterById } from "@drincs/pixi-vn";

const liam = getCharacterById('liam');
```

## Get All Characters

To get all characters, you can use the `getAllCharacters` function.

```typescript
import { getAllCharacters } from "@drincs/pixi-vn";

const characters = getAllCharacters();
```

## Edit Characters in the Game

`CharacterBaseModel` is a [stored class](/start/stored-classes), which means that it is possible to save and load the character's properties from the [game storage](/start/storage).

It means that if the character's name is changed during the game, the new character name will be saved in the game storage by linking it to his `id`.

Furthermore, it is important to consider that if the character's `id` is changed, from one version to another, the system will **not** move the data linked to the previous `id` to the new `id`.

The properties of the `CharacterBaseModel` that are stored in the game storage are:

* `name`: The character's name.
* `surname`: The character's surname.
* `age`: The character's age.

To get the properties used when instantiating the class you can use:

* `defaultName`: The character's name.
* `defaultSurname`: The character's surname.
* `defaultAge`: The character's age.

Here's a simplified implementation of the `CharacterBaseModel` class for better understanding of the properties that are stored in the game storage:

```typescript
export default class CharacterBaseModel extends StoredClassModel implements CharacterBaseModelProps {
    constructor(id: string, props: CharacterBaseModelProps) {
        super(
            // ...
        )
        this.defaultName = props.name
        this.icon = props.icon
        // ...
    }

    // name property is stored in the game storage
    private defaultName: string = ""
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string) {
        this.setStorageProperty<string>("name", value)
    }

    // icon property is not stored in the game storage
    icon: string = ""

    // ...
}
```

## Use Characters in the Game

You can use the characters in the game for example to [set a dialogue](/start/dialogue#set-a-current-dialogue). You can use the character's `id` or the character's instance, but it is recommended to use the instance.

```typescript
export const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});
saveCharacter([liam, emma]);

narration.dialogue = { character: liam, text: "Hello" }
// or
narration.dialogue = { character: "liam_id", text: "Hello" }
```

## Character Emotions

It can often be useful to have multiple types of the same character.

A classic example of visual novels is to have a character "Alice" a subtype related to his/her emotional state "Angry Alice". The two characters have the same characteristics apart from one or more properties, such as the icon.

In Pixi’VN it is possible by passing as parameter instead of the id instead of a string an object that contains the `id`, that corresponds to the id of an already existing character, and the `emotion`, that corresponds to the emotion of the character.

```typescript
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const alice = new CharacterBaseModel('alice', {
    name: 'Alice',
    icon: "https://example.com/alice.png",
    color: "#9e2e12"
});

export const angryAlice = new CharacterBaseModel({ id: 'alice', emotion: 'angry' }, {
    icon: "https://example.com/angryAlice.png",
});

saveCharacter([alice, angryAlice]);
```

```typescript
alice.name = "Eleonora";
console.log(alice.name); // Eleonora
console.log(angryAlice.name); // Eleonora

angryAlice = "Angry Eleonora";
console.log(alice.name); // Eleonora
console.log(angryAlice.name); // Angry Eleonora
```

## Custom Character

It recommend creating your own class `Character` that extends `CharacterStoredClass` to use your properties or methods, and "override" the interface `CharacterInterface` to add the new properties.

For example, you can create a class `Character`. You must "override" the interface `CharacterInterface` to use your properties or methods.

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn/dist/override' {
    interface CharacterInterface {
        name: string
        surname?: string
        age?: number
        icon?: string
        color?: string
    }
}
```

Now you can create a class `Character` that extends `CharacterStoredClass` and implements the `CharacterInterface`.

```typescript
import { CharacterStoredClass } from "@drincs/pixi-vn";

export class Character extends CharacterStoredClass implements CharacterInterface {
    constructor(id: string | { id: string, emotion: string }, props: CharacterProps) {
        super(typeof id === "string" ? id : id.id, typeof id === "string" ? "" : id.emotion)
        this._name = props.name
        this._surname = props.surname
        this._age = props.age
        this._icon = props.icon
        this._color = props.color
    }
    private _name?: string
    get name(): string {
        return this._name || this.id
    }
    private _surname?: string
    get surname(): string | undefined {
        return this._surname
    }
    private _age?: number | undefined
    get age(): number | undefined {
        return this._age
    }
    private _icon?: string
    get icon(): string | undefined {
        return this._icon
    }
    private _color?: string | undefined
    get color(): string | undefined {
        return this._color
    }
}
```

In this class you can't set the properties, because they are read-only. For set the properties and store them in the game storage, you must use the `setStorageProperty` method.

```typescript
import { CharacterStoredClass } from "@drincs/pixi-vn";

export class Character extends CharacterStoredClass implements CharacterInterface {
    constructor(id: string | { id: string, emotion: string }, props: CharacterProps) {
        super(typeof id === "string" ? id : id.id, typeof id === "string" ? "" : id.emotion)
        this.defaultName = props.name
        this.defaultSurname = props.surname
        this.defaultAge = props.age
        this._icon = props.icon
        this._color = props.color
    }
    private defaultName?: string
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName || this.id
    }
    set name(value: string | undefined) {
        this.setStorageProperty<string>("name", value)
    }
    private defaultSurname?: string
    get surname(): string | undefined {
        return this.getStorageProperty<string>("surname") || this.defaultSurname
    }
    set surname(value: string | undefined) {
        this.setStorageProperty<string>("surname", value)
    }
    private defaultAge?: number | undefined
    get age(): number | undefined {
        return this.getStorageProperty<number>("age") || this.defaultAge
    }
    set age(value: number | undefined) {
        this.setStorageProperty<number>("age", value)
    }
    private _icon?: string
    get icon(): string | undefined {
        return this._icon
    }
    private _color?: string | undefined
    get color(): string | undefined {
        return this._color
    }
}
```
