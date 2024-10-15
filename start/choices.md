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

```css /index.css [hidden]
:root {
  background-color: #242424;
}

body {
  margin: 0;
  display: flex;
  overflow: hidden;
}
```

```tsx /index.tsx [hidden]
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { canvas, narration } from '@drincs/pixi-vn'
import { INTERFACE_DATA_USE_QUEY_KEY } from './useQueryInterface';
import { startLabel } from './startLabel';

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

canvas.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
}).then(() => {
    // React setup with ReactDOM
    const root = document.getElementById('root')
    if (!root) {
        throw new Error('root element not found')
    }

    canvas.initializeHTMLLayout(root)
    if (!canvas.htmlLayout) {
        throw new Error('htmlLayout not found')
    }
    const reactRoot = createRoot(canvas.htmlLayout)
    const queryClient = new QueryClient()
    narration.callLabel(startLabel, {})
        .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))

    reactRoot.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StrictMode>
    )
})
```

```tsx /App.tsx [active]
import { ChoiceMenuOption, ChoiceMenuOptionClose, narration } from '@drincs/pixi-vn';
import { Box, Grid } from '@mui/system';
import { useQueryClient } from '@tanstack/react-query';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryChoiceMenuOptions } from './useQueryInterface';

export default function ChoiceMenu() {
    const { data: menu = [] } = useQueryChoiceMenuOptions()
    const queryClient = useQueryClient()

    function afterSelectChoice(item: ChoiceMenuOptionClose | ChoiceMenuOption<{}>) {
        narration.selectChoice(item, {})
            .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
            .catch((e) => console.error(e))
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
                width: '100%',
                height: "100%",
                overflow: 'auto',
                gap: 1,
                pointerEvents: "auto",
            }}
        >
            {menu?.map((item, index) => {
                return (
                    <Grid
                        key={"choice-" + index}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <button
                            onClick={() => afterSelectChoice(item)}
                        >
                            {item.text}
                        </button>
                    </Grid>
                )
            })}
        </Grid>
    );
}
```

```ts /startLabel.ts [readonly]
import { canvas, ChoiceMenuOption, narration, newLabel, showImage } from "@drincs/pixi-vn"

export const startLabel = newLabel("start_label",
    [
        () => {
            narration.choiceMenuOptions = [
                new ChoiceMenuOption("Helmlok", helmlokLabel, {}),
                new ChoiceMenuOption("Skully", skullyLabel, {}),
            ]
        },
        (props) => narration.jumpLabel("start_label", props),
    ]
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

```ts /useQueryInterface.ts [readonly]
import { narration } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";

export const INTERFACE_DATA_USE_QUEY_KEY = "interface_data_use_quey_key";

const CHOICE_MENU_OPTIONS_USE_QUEY_KEY = "choice_menu_options_use_quey_key";
export function useQueryChoiceMenuOptions() {
 return useQuery({
  queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CHOICE_MENU_OPTIONS_USE_QUEY_KEY],
  queryFn: () => {
   return narration.choiceMenuOptions || []
  },
 });
}
```

:::
