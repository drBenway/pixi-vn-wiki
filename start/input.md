# Input

In Visual Novels it may be necessary to ask the user to enter text, number, date, etc.

Pixi’VN provides functions to manage this possibility. In short, the developer can require you to enter a value (the game will not allow you to proceed until the value is entered), while the [UI](/start/interface.md) must prompt the player to enter the value.

## Requesting input

To request input from the player, you must use the `narration.requestInput()` function. This function receives an object with the following properties:

- `type` (optional): The type of input to be requested (It is a string).

```typescript
narration.requestInput()
narration.requestInput({ type: "text" })
narration.requestInput({ type: "date" })
```

## Getting input information

To get the input information, you must use:

- `narration.isRequiredInput`: Returns a boolean indicating whether the player must enter a value.
- `narration.inputType`: Returns a string indicating the type of input requested.

```typescript
if (narration.isRequiredInput) {
    openInputModal(narration.inputType)
}
```

## Removing input request

To remove the input request, you must use the `narration.removeInputRequest()` function.

```typescript
narration.removeInputRequest()
```

## How to create the input dialog UI

For example:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

::: sandbox {template=mjn5c8 entry=/src/screens/modals/TextInput.tsx}
:::
