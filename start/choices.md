# Choice Menus

In the visual novel, usually, there are choice menus that allow the player to make decisions that will affect the story.

## Choice menu option

In Pixi’VN, it is possible to create choice menus using the `ChoiceMenuOption` class and a function to handle the choice.

`ChoiceMenuOption` is a class which has as parameters:

* `text`: The text that will be displayed in the choice menus.
* `label`: The [label](/start/labels#label) which will be called when the player chooses the option.
* `props`: The properties that will be passed to the label, if the label not need any parameter you can pass an empty object `{}`.
* `type`: The way the [label will be called](/start/labels#run-a-label). It can be `call` or `jump`. Default is `call`.

<!-- TODO redocumentar the props -->

This class is only intended to give you information about a choice, it is up to you to call the label.

In practice this means that after you get the list of choices through the `getChoiceMenuOptions` function, you will have to call the label using the [`callLabel`](/start/labels.md#call-a-label) or [`jumpLabel`](/start/labels.md#jump-to-a-label) function.

### Choice for closing the menu

In addition to `ChoiceMenuOption` there is also another class `ChoiceMenuOptionClose` that allows you to create a closing option. Its operation consists in closing the menu of choices and continuing with the [steps](/start/labels.md), without having to call any [label](/start/labels.md#label).

`ChoiceMenuOptionClose` is a class which has as parameters:

* `text`: The text that will be displayed in the choice menus.
* `closeCurrentLabel`: If `true`, the current label will be closed. Default is `false`.

This class is only intended to give you information about a choice, it is up to you to close the choice menu using the [`closeChoiceMenu`](#close-the-choice-menu) function.

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
    new ChoiceMenuOption("Orange", orangeLabel, {}), // by default, the label will be called by call
    new ChoiceMenuOption("Banana", bananaLabel, {}, "jump"),
    new ChoiceMenuOption("Apple", appleLabel, { quantity: 5 }, "call"),
    new ChoiceMenuOptionClose("Cancel"),
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

## Close the choice menu

To close the choice menu, use the `narration.closeChoiceMenu`. This is used after choosing [`ChoiceMenuOptionClose`](#choice-for-closing-the-menu).

This function have the 2 parameters:

* `choice`: the [`ChoiceMenuOptionClose`](#choice-for-closing-the-menu) that will be used to close the menu.
* `props`: the properties that will be passed to the label, if you not want to pass any parameter you can pass an empty object `{}`.

```typescript
narration.closeChoiceMenu(label, props)
```

## Get last choice

[( Documentation under review )](https://github.com/DRincs-Productions/pixi-vn/issues/88)

## How to create the choice menu interface

For example ( in React using Material-UI ):

```tsx
// react
const [menuOptions, setChoiceMenuOptions] = useState<ChoiceMenuOption[]>(getChoiceMenuOptions())
function afterSelectChoice(item: ChoiceMenuOptionClose | ChoiceMenuOption<{}>) {
    clearChoiceMenuOptions()
    if (item.type == "call") {
        narration.callLabel(item.label, {
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
        narration.jumpLabel(item.label, {
            navigate: navigate,
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
        narration.closeChoiceMenu(item, {
            navigate: navigate,
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
}

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
                            afterSelectChoice(item)
                        }}
                        sx={{
                            pointerEvents: "auto",
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
