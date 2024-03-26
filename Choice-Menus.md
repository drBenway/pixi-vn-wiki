# Choice Menus

In the visual novel, usually, there are choice menus that allow the player to make decisions that will affect the story.

In Pixi'VN, it is possible to create choice menus using the `MenuOptionLabel` class and a function to handle the choice.

`MenuOptionLabel` is a class which has as parameters:

* `text`: The text that will be displayed in the choice menus.
* `label`: The [label](/Label-and-Game-Step#label) which will be called when the player chooses the option.
* `type`: The way the [label will be called](/Label-and-Game-Step#run-a-label). It is a `LabelRunModeEnum` enum.

## Set a Choice Menu

To set a choice menu, use the `setMenuOptions` and pass an array of `MenuOptionLabel` and a function to handle the choice.

```typescript
setDialogue("Choose a fruit:")
setMenuOptions([
    new MenuOptionLabel("Orange", OrangeLabel), // by default, the label will be called by call
    new MenuOptionLabel("Apple", AppleLabel, LabelRunModeEnum.OpenByCall),
    new MenuOptionLabel("Banana", BananaLabel, LabelRunModeEnum.OpenByJump),
])
```

## Get the Choice Menu

To get the choice menu, use the `getMenuOptions`. The return is an array of `MenuOptionLabel`.

```typescript
const menuOptions: MenuOptionLabel[] = getMenuOptions();
```

## Clear the Choice Menu

To clear the choice menu, use the `clearMenuOptions`.

```typescript
clearMenuOptions();
```

## Get last Choice

[( Coming soon )](https://github.com/DRincs-Productions/pixi-vn/issues/88)

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
