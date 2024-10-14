# User Interface (UI) with JavaScript Framework

Pixi’VN offers the possibility of adding an HTML Element with the same dimensions as the [PixiJS Canvas](/start/canvas-elements.md) to add an **UI** with JavaScript frameworks.

By "UI" is meant the elements that are above the canvas, such as buttons, forms, etc.

![Frame_Aufbau](https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2FPixiVN_interface.png?alt=media)

This allows the use of systems such as React, Vue, Angular, etc. to create much more complex **UI screens** with excellent performance.

* [Angular](/start/interface-angular.md)
* [React Interface](/start/interface-react.md)
* [Vue](/start/interface-vue.md)

## Differences between the UI and the canvas

UI and canvas are two different things. The UI is above the canvas and is used to create buttons, forms, etc. The canvas is used to display images, videos, etc.

All canvas information is included in saves and Pixi’VN manages going back and forth between the different steps. The UI is not included in the saves and is not managed by Pixi’VN, so you have to [manage it yourself saving information](#connect-the-ui-with-variables-in-the-game-variables) you care about in [game storage](/start/storage.md) or browser storage.

In the canvas you can add elements during each step. In the UI you can't do that, you can create several ["screens" and navigate between them](#navigateswitch-between-ui-screens).

In the canvas you can only add PixiJS elements, they are usually composed of images and are very simple. In the UI you can add any HTML element or use any UI component library, so you can create much more complex interfaces.

## Navigate/switch between UI screens

To switch between UI screens (without interrupting the canvas), you can use popups and modals, or navigate between different [paths/routes](#what-is-the-url-path-and-routes).

### What is the URL Path and Routes?

The URL Path is the part of the URL that comes after the domain. For example, in the URL `https://example.com/path/to/page`, the path is `/path/to/page`.

A routering system can be used to manage navigation between URL Paths. For example you can use:

* [React Router](https://reactrouter.com/)
* [Vue Router](https://router.vuejs.org/)
* [Angular Router](https://angular.io/guide/router)
* [TanStack Router](https://tanstack.com/router/latest)

## How to enable UI interaction?

By default, all HTML elements of the UI have the `pointer-events: none` style.
The reason is that because the html UI is above the canvas, all clicks are intercepted by the UI and not by the canvas.

So you must set the `pointer-events: auto` style only for the elements (example a button, a form, etc...) that you want to interact with the user.

## Connect the UI with variables in the game variables

The best way to connect the UI with the game variables is to use the [TanStack Query](https://tanstack.com/query/latest) library.

**What is TanStack Query?** TanStack Query is a library that allows you to manage the state of your application in a simple and efficient way. It is based on the concept of queries, mutations and subscriptions. This library is very useful and is compatible with React, Vue, Angular, Svelte, etc.

Here is an example:

In our example we would have two variables, `text1` and `text2`, saved in the [game storage](/start/storage.md), this variables will be updated either by an input in the UI or by a [label step](/start/labels.md).

Taking into account that a storage variables can only be changed during a [next step, go back](/start/labels.md#next-step-and-go-back), [run label](/start/labels.md#run-a-label) or [loading a save](/start/save.md#load) (outside the interface), we will create a `useQueryText1` and `useQueryText2` that will be updated after each [next step, go back](/start/labels.md#next-step-and-go-back), [run label](/start/labels.md#run-a-label) or [loading a save](/start/save.md#load).

```typescript
import { useQuery } from "@tanstack/react-query";
import { getLastSaveFromIndexDB } from "../utilities/save-utility";

// this is a "father" key that will be used to invalidate all queries that depend on it
export const INTERFACE_DATA_USE_QUEY_KEY = "interface_data_use_quey_key";

const TEXT1_USE_QUEY_KEY = "text1_save_use_quey_key";
export default function useQueryText1() {
 return useQuery({
  queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT1_USE_QUEY_KEY],
  queryFn: async () => {
    return storage.getVariable<string>("text1") || "";
  },
 });
}

const TEXT2_USE_QUEY_KEY = "text2_save_use_quey_key";
export default function useQueryText2() {
 return useQuery({
  queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT2_USE_QUEY_KEY],
  queryFn: async () => {
    return storage.getVariable<string>("text2") || "";
  },
 });
}
```

For invalidate the queries we can use the `queryClient.invalidateQueries` function.

In this example if we want to update all the queries that depend on the `INTERFACE_DATA_USE_QUEY_KEY` key, we can use the following code:

```ts
const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
```

If we want to update only the `text1` or `text2` query, we can use the following code:

```ts
const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT1_USE_QUEY_KEY] })
queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT2_USE_QUEY_KEY] })
```

```typescript
const queryClient = useQueryClient()

narration.goNext({})
    .then((result) => {
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
    });

narration.goBack({})
    .then((result) => {
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
    });

loadSaveJson(jsonString, navigate)
    .then(() => {
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
    })

// only if you are not in a label step
narration.callLabel("myLabel", {})
    .then((result) => {
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
    });
```

In the UI we will use the `useQueryText1` and `useQueryText2` hooks to get the values of the variables `text1` and `text2`.

```tsx
// react example
export function MyComponent() {
    const { data: text1 = "" } = useQueryText1()
    const { data: text2 = "" } = useQueryText2()
    const queryClient = useQueryClient()

    return (
        <>
            <Input
                sx={{
                    pointerEvents: "auto",
                }}
                value={text1}
                onChange={(e) => {
                    storage.setVariable("text1", e.target.value);
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT1_USE_QUEY_KEY] })
                }}
            />
            <Input
                sx={{
                    pointerEvents: "auto",
                }}
                value={text2}
                onChange={(e) => {
                    storage.setVariable("text2", e.target.value);
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY, TEXT2_USE_QUEY_KEY] })
                }}
            />
        </>
    );
}
```
