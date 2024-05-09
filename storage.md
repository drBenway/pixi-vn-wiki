# Game storage

The game storage is a place where you can save variables that you want to keep between game sessions.

It is essential to understand that if the variables are not saved in the game memory, when [loading a save](/Save-and-Load.md#load) or when [going back](/Label-and-Game-Step.md#go-back), they will not be handled.

Furthermore, only primary type variables can be saved in the game storage. The primary types are `string`, `number`, `boolean`, `object`, `array`...  and not `function`, `class`...

( For boolean values, you can use the [flags management](Flags) )

## Set a variable in the game storage

To set a variable in the game storage, you can use the `GameStorageManager.setVariable`, which takes two parameters: the variable name and the value.

```typescript
GameStorageManager.setVariable("myVariable", 42);
```

## Get a variable from the game storage

To get a variable from the game storage, you can use the `GameStorageManager.getVariable`, which takes one parameter: the variable name.

```typescript
const myVariable = GameStorageManager.getVariable<number>("myVariable");
```

## Remove a variable from the game storage

To remove a variable from the game storage, you can use the `GameStorageManager.removeVariable`, which takes one parameter: the variable name.

```typescript
GameStorageManager.removeVariable("myVariable");
```

## System variables

In storage game, there are some system variables that are used by the game engine. All system variables start with the prefix `___`.
So please avoid using this prefix in your variables.

You can get all the system variables keys with the `GameStorageManager.keysSystem` function.
