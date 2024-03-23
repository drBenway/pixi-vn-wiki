# Menus or Game Choice

In the visual novel, usually, there are menus or game choices that allow the player to make decisions that will affect the story.

In Pixi'VN, it is possible to create menus or game choices using the `MenuOptionLabel` class and a function to handle the choice.

`MenuOptionLabel` is a class which has as parameters:

* `text`: The text that will be displayed in the menu or game choice.
* `label`: The [label](Label) which will be called when the player chooses the option.
* `type`: The way the label will be called. It is a `LabelRunModeEnum` enum.

## Set a Menu or Game Choice

To set a menu or game choice, use the `setMenuOptions` and pass an array of `MenuOptionLabel` and a function to handle the choice.

```typescript
setDialogue("Choose a fruit:")
setMenuOptions([
    new MenuOptionLabel("Orange", OrangeLabel), // by default, the label will be called by call
    new MenuOptionLabel("Apple", AppleLabel, LabelRunModeEnum.OpenByCall),
    new MenuOptionLabel("Banana", BananaLabel, LabelRunModeEnum.OpenByJump),
])
```

## Get the Menu or Game Choice

To get the menu or game choice, use the `getMenuOptions`. The return is an array of `MenuOptionLabel`.

```typescript
const menuOptions: MenuOptionLabel[] = getMenuOptions();
```

## Clear the Menu or Game Choice

To clear the menu or game choice, use the `clearMenuOptions`.

```typescript
clearMenuOptions();
```

## Exemple of example of how to create the menu interface

For example ( in React using Material-UI ):

```tsx
const [menuOptions, setMenuOptions] = useState<MenuOptionLabel[]>(useMenuOptions())

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
                            if (item.type == LabelRunModeEnum.OpenByCall) {
                                clearMenuOptions()
                                GameStepManager.callLabel(item.label)
                                    .then(() => {
                                        // after the label is called
                                    })
                                    .catch((e) => {
                                        console.error(e)
                                    })
                            }
                            else if (item.type == LabelRunModeEnum.OpenByJump) {
                                GameStepManager.jumpLabel(item.label)
                                    .then(() => {
                                        // after the label is jumped
                                    })
                                    .catch((e) => {
                                        console.error(e)
                                    })
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
