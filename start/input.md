# Input

In Visual Novels it may be necessary to ask the user to enter text, number, date, etc.

Pixi’VN provides functions to manage this possibility. In short, the operation is that through the functions provided you enable and can set the type of variable that will be requested from the user, while the [interface](/start/interface.md) side will have to manage the information obtained from this variable.

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
