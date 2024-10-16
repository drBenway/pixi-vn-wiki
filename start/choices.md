# Choice Menus

In the visual novel, usually, there are choice menus that allow the player to make decisions that will affect the story.

## Choice menu option

In Pixi’VN, it is possible to create choice menus using the `ChoiceMenuOption` class and a function to handle the choice.

`ChoiceMenuOption` is a class which has as parameters:

* `text`: The text that will be displayed in the choice menus.
* `label`: The [label](/start/labels#label) which will be called when the player chooses the option.
* `props`: The properties that will be passed to the label, if the label not need any parameter you can pass an empty object `{}`.
* `options`:
  * `type`: The way the [label will be called](/start/labels#run-a-label). It can be `call` or `jump`. Default is `call`.
  * `oneTime`: If this is `true`, the choice can only be made once.
  * `onlyHaveNoChoice`: If `true`, the choice can see only if there are no other choices.
  * `autoSelect`: If `true` and if is the only choice, it will be selected automatically.

You can use this class to create a item of the `narration.choiceMenuOptions` list. To select a choice, you must use the [`narration.selectChoice` function](#select-a-choice).

### Choice for closing the menu

In addition to `ChoiceMenuOption` there is also another class `ChoiceMenuOptionClose` that allows you to create a closing option. Its operation consists in closing the menu of choices and continuing with the [steps](/start/labels.md), without having to call any [label](/start/labels.md#label).

`ChoiceMenuOptionClose` is a class which has as parameters:

* `text`: The text that will be displayed in the choice menus.
* `options`:
  * `closeCurrentLabel`: If `true`, the current label will be closed. Default is `false`.
  * `oneTime`: If this is `true`, the choice can only be made once.
  * `onlyHaveNoChoice`: If `true`, the choice can see only if there are no other choices.
  * `autoSelect`: If `true` and if is the only choice, it will be selected automatically.

You can use this class to create a item of the `narration.choiceMenuOptions` list. To select a choice, you must use the [`narration.selectChoice` function](#select-a-choice).

## Set a choice menu

To set a choice menu, use the `narration.choiceMenuOptions` and pass an array of `ChoiceMenuOption` or/and `ChoiceMenuOptionClose`.

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
narration.dialogue = "Choose a fruit:"
narration.choiceMenuOptions = [
    new ChoiceMenuOption("Orange", orangeLabel, {}), // by default, the label will be called by call
    new ChoiceMenuOption("Banana", bananaLabel, {}, { type: "jump" }),
    new ChoiceMenuOption("Apple", appleLabel, { quantity: 5 }, { type: "call" }),
    new ChoiceMenuOptionClose("Cancel"),
]
```

## Get the choice menu

To get the choice menu, use the `narration.choiceMenuOptions`. The return is an array of `ChoiceMenuOption`.

```typescript
const menuOptions: ChoiceMenuOption[] = narration.choiceMenuOptions;
```

## Select a choice

To select a choice, you must use the `callLabel` or `jumpLabel` function.

```typescript
narration.selectChoice(item, {
    // add StepLabelProps here
    navigate: navigate, // example
    // and the props that will be passed to the label
    ...item.props
})
    .then(() => {
        // ...
    })
    .catch((e) => {
        // ...
    })
```

## Clear the choice menu

To clear the choice menu, use the `narration.choiceMenuOptions`.

```typescript
narration.choiceMenuOptions = undefined;
```

## How to create the choice menu UI screen

For example:

::: react-sandbox {template=vite-react-ts coderHeight=512}

<<< @/snippets/react/index.css{#hidden}
<<< @/snippets/react/index.tsx{#hidden}
<<< @/snippets/react/App.tsx{#hidden}

<<< @/snippets/react/screens/ChoiceMenu.tsx{prefix=#active/screens/}

```ts /labels/startLabel.ts [readonly]
import { canvas, ChoiceMenuOption, narration, newLabel, showImage, Assets } from "@drincs/pixi-vn"

export const startLabel = newLabel("start_label",
    [
        async () => {
            narration.choiceMenuOptions = [
                new ChoiceMenuOption("Helmlok", helmlokLabel, {}),
                new ChoiceMenuOption("Skully", skullyLabel, {}),
            ]
        },
        (props) => narration.jumpLabel("start_label", props),
    ],
    {
        onLoadStep: async () => {
            Assets.load('https://pixijs.com/assets/skully.png')
            Assets.load('https://pixijs.com/assets/helmlok.png')
        }
    }
)

const helmlokLabel = newLabel("helmlok_label",
    [
        async (props) => {
            canvas.clear()
            await showImage('skully', 'https://pixijs.com/assets/skully.png')
            narration.jumpLabel(startLabel, props)
        },
    ]
)

const skullyLabel = newLabel("skully_label",
    [
        async (props) => {
            canvas.clear()
            await showImage('helmlok', 'https://pixijs.com/assets/helmlok.png')
            narration.jumpLabel(startLabel, props)
        },
    ]
)
```

<<< @/snippets/react/use_query/useQueryInterface.ts{prefix=#readOnly/use_query/}

:::
