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
