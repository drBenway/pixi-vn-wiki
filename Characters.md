# Characters

The characters are the actors that appear in the visual novel.
In Pixi'VN, characters are created using the `CharacterBaseModel` class or a subclass of it.

## Initialize Characters

To initialize a character, you need to create a new instance of the `CharacterBaseModel` class and add it into a game character dictionary, when the game is initialized.

For create a new instance of `CharacterBaseModel` you need to pass:

* `id`: A unique identifier for the character. It is used to reference the character in the game (key in the object).
* `props`: An object with the character's properties. `props` extends the `ICharacterBaseModel` interface. The properties are:
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

If you use the [Extended CharacterModel](#extend-characterbasemodel) class, you can get the character and cast it to the subclass.

```typescript
import { getCharacterById } from "@drincs/pixi-vn";

const liam = getCharacterById<ExtendedCharacterModel>('liam');
```

## Edit Characters in the Game

`CharacterBaseModel` is a [stored class model](Stored-Classes), which means that it is possible to save and load the character's properties from the [game storage](Game-Storage).

It means that if the character's name is changed during the game, the new character name will be saved in the game storage by linking it to his `id`.

Furthermore, it is important to consider that if the character's `id` is changed from one version to another, the system will **not** move the data linked to the previous `id` to the new `id`.

The props of the `CharacterBaseModel` that are stored in the game storage are:

* `name`: The character's name.
* `surname`: The character's surname.
* `age`: The character's age.

To get the props used when instantiating the class you can use:

* `defaultName`: The character's name.
* `defaultSurname`: The character's surname.
* `defaultAge`: The character's age.

Here's a simplified implementation of the `CharacterBaseModel` class for better understanding of the properties that are stored in the game storage:

```typescript
export default class CharacterBaseModel extends StoredClassModel implements ICharacterBaseModel {
    constructor(id: string, props: ICharacterBaseModel) {
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

You can use the characters in the game for example to [set a dialogue](/Dialogues-and-Narration.md#set-a-current-dialogue). You can use the character's `id` or the character's instance, but it is recommended to use the instance.

```typescript
export const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});
saveCharacter([liam, emma]);

setDialogue({ character: liam, text: "Hello" })
// or
setDialogue({ character: "liam_id", text: "Hello" })
```

## Extend CharacterBaseModel

I recommend creating a subclass of `CharacterBaseModel` to add new properties or methods to the character.

For example, you can create a subclass `CharacterModel` that extends `CharacterBaseModel` and add a new property `mood`.

```typescript
import { CharacterBaseModel } from "@drincs/pixi-vn";

interface ICharacterModel extends ICharacterBaseModel {
    mood: string
}

export class CharacterModel extends CharacterBaseModel {
    constructor(id: string, props: ICharacterModel) {
        super(id, props)
    }

    private _mood: string = ""
    get mood(): string {
        return this.getStorageProperty<string>("mood") || this.defaultName
    }
    set mood(value: string) {
        this.setStorageProperty<string>("mood", value)
    }
}
```
