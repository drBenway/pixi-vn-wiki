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

All canvas information is included in saves and Pixi’VN manages going back and forth between the different steps. The UI is not included in the saves and is not managed by Pixi’VN, so you have to [manage it yourself saving information](#use-atom-for-connect-the-interface-with-variables-in-the-game-storage) you care about in [game storage](/start/storage.md) or browser storage.

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

## Connect the UI with variables in the game storage

What is an Atom? An Atom (or Atomics) is a JavaScript object which gives atomic tasks to proceed as static strategies. Much the same as the strategies for Math object, the techniques, and properties of Atomics are additionally static. Atomics are utilized with SharedArrayBuffer objects.

There are more npm packages that can be used to manage the UI with the [game storage](/start/storage.md), such as: [Recoil](https://recoiljs.org/), [Redux](https://redux.js.org/), [MobX](https://mobx.js.org/README.html), etc. We will use [Recoil](https://recoiljs.org/) because it has "[Selectors](https://recoiljs.org/docs/basic-tutorial/selectors)" which is right for us.

The purpose of the Atom + Selector will be to set the Atom and [game storage](/start/storage.md) to a value changed by the UI, and update the Atom when the value in [game storage](/start/storage.md) is updated.

Here is an example:

In our example we would have a variable `text` saved in the [game storage](/start/storage.md), this variable will be updated either by an input in the UI or by a [label step](/start/labels.md).

Taking into account that a storage variable can only be changed during a [next step, go back](/start/labels.md#next-step-and-go-back), [run label](/start/labels.md#run-a-label) or [loading a save](/start/save.md#load) (outside the interface), we will create an Atom called "reloadInterfaceDataEventAtom" that will be updated after each [next step, go back](/start/labels.md#next-step-and-go-back), [run label](/start/labels.md#run-a-label) or [loading a save](/start/save.md#load). `reloadInterfaceDataEventAtom` will be used to trigger the update of olther Atoms.

```typescript
// reloadInterfaceDataEventAtom.ts
import { atom } from "recoil";

export const reloadInterfaceDataEventAtom = atom<number>({
    key: 'reloadInterfaceDataEventAtom',
    default: 0,
});
```

We will create a Selector called `textSelector` that will be used to set and get the value of the `text` variable in the [game storage](/start/storage.md).

```typescript
// textSelectorState.ts
import { storage } from "@drincs/pixi-vn";
import { atom, selector } from "recoil";
import { reloadInterfaceDataEventAtom } from "./reloadInterfaceDataEventAtom";

// questo atom attiverà l'aggiornamento di textSelectorState quando modificherò il valore di textSelectorState
const textAtom = atom<string>({
    key: 'textAtom',
    default: "",
});

export const textSelectorState = selector<string>({
    key: 'textSelector',
    get: ({ get }) => {
        // This will trigger the update of the Atom when the value in game storage is updated
        get(reloadInterfaceDataEventAtom)
        get(textAtom)

        return storage.getVariable<string>("text") || "";
    },
    set: ({ set }, newValue) => {
        set(textAtom, newValue);
        storage.setVariable("text", newValue as string);
    },
});
```

Remember to update the `reloadInterfaceDataEventAtom` after each [next step, go back](/start/labels.md#next-step-and-go-back) or [loading a save](/start/save.md#load).

Even after use [run label](/start/labels.md#run-a-label) out of the [step label](/start/labels.md#run-a-label).

This seems like a very time consuming process, but in reality if you have designed your game well or used a [template](/start/getting-started.md#project-initialization), you will only need to update the Atom in one place.

```typescript
import { useSetRecoilState } from 'recoil';
import { reloadInterfaceDataEventAtom } from './reloadInterfaceDataEventAtom';
import { narration } from '@drincs/pixi-vn'

const notifyReloadInterfaceDataEvent = useSetRecoilState(reloadInterfaceDataEventAtom);

narration.goNext({})
    .then((result) => {
        notifyReloadInterfaceDataEvent((value) => value + 1);
    });

narration.goBack({})
    .then((result) => {
        notifyReloadInterfaceDataEvent((value) => value + 1);
    });

loadSaveJson(jsonString, navigate)
    .then(() => {
        notifyReloadInterfaceDataEvent((value) => value + 1);
    })

// only if you are not in a label step
narration.callLabel("myLabel", {})
    .then((result) => {
        notifyReloadInterfaceDataEvent((value) => value + 1);
    });
```

Ok now we have the Atom and Selector, we can use the `textSelector` in the UI.

```tsx
// react example
import { useRecoilState } from 'recoil';
import { textSelectorState } from './textSelectorState';
import { Input } from '@mui/joy';

export function MyComponent() {
    const [text, setText] = useRecoilState(textSelectorState);

    return (
            <Input
                sx={{
                    pointerEvents: "auto",
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
    );
}
```
