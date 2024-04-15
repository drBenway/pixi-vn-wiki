# Intecept Events

Intercepting events can be very useful to allow hotkeys or to block/prevent browser actions that can create errors.

## Refresh event

Using the refresh button without managing it causes you to lose all temporary game data.

The solution is to create a save when refreshing the pages in local storage. Next, check after the refresh if a save exists, and if it exists then load it and then delete it. The same solution can be used to prevent browser crashes.

Example:

```ts
// ActionsUtility.ts
import { GameStepManager, getSaveJson, loadSaveJson } from "@drincs/pixi-vn";

export function addRefreshSave() {
    const jsonString = getSaveJson()
    if (jsonString) {
        localStorage.setItem("refreshSave", jsonString)
    }
}

export function loadRefreshSave(navigate: (path: string) => void) {
    const jsonString = localStorage.getItem("refreshSave")
    if (jsonString) {
        loadSaveJson(jsonString, navigate);
        localStorage.removeItem("refreshSave")
    }
}
```

```ts
// ActionsUtility.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { addRefreshSave, loadRefreshSave } from './utility/ActionsUtility';

export default function EventInterceptor() {
    const navigate = useNavigate();

    useEffect(() => {
        loadRefreshSave(navigate)
        window.addEventListener("beforeunload", addRefreshSave);
        return () => {
            window.removeEventListener("beforeunload", addRefreshSave);
        };
    }, []);

    return null
}
```
