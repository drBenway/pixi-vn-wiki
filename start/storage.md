# Game storage

The game storage is a place where you can save variables that you want to keep between game sessions.

It is essential to understand that if the variables are not saved in the game memory, when [loading a save](/start/save#load) or when [going back](/start/labels#go-back), they will not be handled.

Furthermore, only primary type variables can be saved in the game storage. The primary types are `string`, `number`, `boolean`, `object`, `array`...  and not `function`, `class`...

( For boolean values, you can use the [flags management](/start/flags) )

## Set a variable in the game storage

To set a variable in the game storage, you can use the `storage.setVariable`, which takes two parameters: the variable name and the value.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.setVariable("myVariable", 42);
```

## Get a variable from the game storage

To get a variable from the game storage, you can use the `storage.getVariable`, which takes one parameter: the variable name.

```typescript
import { storage } from '@drincs/pixi-vn'

const myVariable = storage.getVariable<number>("myVariable");
```

## Remove a variable from the game storage

To remove a variable from the game storage, you can use the `storage.removeVariable`, which takes one parameter: the variable name.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.removeVariable("myVariable");
```

## System variables

In storage game, there are some system variables that are used by the game engine. All system variables start with the prefix `___`.
So please avoid using this prefix in your variables.

You can get all the system variables keys with the `storage.keysSystem` function.

<!-- TODO Temp storage -->