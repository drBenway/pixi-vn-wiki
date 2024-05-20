# Choice Menus

In the visual novel, usually, there are choice menus that allow the player to make decisions that will affect the story.

In Pixi’VN, it is possible to create choice menus using the `ChoiceMenuOption` class and a function to handle the choice.

`ChoiceMenuOption` is a class which has as parameters:

* `text`: The text that will be displayed in the choice menus.
* `label`: The [label](/start/labels#label) which will be called when the player chooses the option.
* `type`: The way the [label will be called](/start/labels#run-a-label). It can be `call` or `jump`. Default is `call`.
* `props`: The properties that will be passed to the label. Default is `{}`.

## Set a choice menu

To set a choice menu, use the `setChoiceMenuOptions` and pass an array of `ChoiceMenuOption`.

```typescript
export const appleLabel = newLabel<{quantity: number}>("AppleLabel",
    [
        async (props) => {
            let quantity = props?.quantity ?? 0;
            console.log(`You have ${quantity} apples`);
        },
    ]
)
```

```typescript
setDialogue("Choose a fruit:")
setChoiceMenuOptions([
    new ChoiceMenuOption("Orange", orangeLabel), // by default, the label will be called by call
    new ChoiceMenuOption("Banana", bananaLabel, "jump"),
    new ChoiceMenuOption("Apple", appleLabel, "call", { quantity: 5 }),
])
```

## Get the choice menu

To get the choice menu, use the `getChoiceMenuOptions`. The return is an array of `ChoiceMenuOption`.

```typescript
const menuOptions: ChoiceMenuOption[] = getChoiceMenuOptions();
```

## Clear the choice menu

To clear the choice menu, use the `clearChoiceMenuOptions`.

```typescript
clearChoiceMenuOptions();
```

## Get last choice

[( Documentation under review )](https://github.com/DRincs-Productions/pixi-vn/issues/88)

## How to create the choice menu interface

For example ( in React using Material-UI ):

```tsx
const [menuOptions, setChoiceMenuOptions] = useState<ChoiceMenuOption[]>(getChoiceMenuOptions())

return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
    >
        {menu.map((item, index) => {
            return (
                <Grid
                    key={index}
                    justifyContent="center"
                    alignItems="center"
                >
                    <DialogueMenuButton
                        onClick={() => {
                            clearChoiceMenuOptions()
                            if (item.type == "call") {
                                GameStepManager.callLabel(item.label, {
                                    // add StepLabelProps here
                                    navigate: navigate, // example
                                    // and the props that will be passed to the label
                                    ...item.props
                                })
                                    .then(() => {
                                        // ...
                                    })
                                    .catch((e) => {
                                        console.error(e)
                                    })
                            }
                            else if (item.type == "jump") {
                                GameStepManager.jumpLabel(item.label, {
                                    // add StepLabelProps here
                                    navigate: navigate, // example
                                    // and the props that will be passed to the label
                                    ...item.props
                                })
                                    .then(() => {
                                        // ...
                                    })
                                    .catch((e) => {
                                        console.error(e)
                                    })
                            }
                            else if (item.type == "close") {
                                GameStepManager.closeChoiceMenu({
                                    // add StepLabelProps here
                                    navigate: navigate, // example
                                    // and the props that will be passed to the label
                                    ...item.props
                                })
                                    .then(() => {
                                        // ...
                                    })
                                    .catch((e) => {
                                        console.error(e)
                                    })
                            }
                            else {
                                console.error("Unsupported label run mode")
                            }
                        }}
                        sx={{
                            left: 0,
                            right: 0,
                        }}
                    >
                        {item.text}
                    </DialogueMenuButton>
                </Grid>
            )
        })}
    </Grid>
);
```
