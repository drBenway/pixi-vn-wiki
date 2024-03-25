# Save and Load

The save and load system is a feature that allows the player to save the game progress and load it later. This feature is essential for visual novels, as it allows the player to continue the story from where they left off.

## Save

Pixi'VN provides a function to save the game progress. The `getSaveData` function saves the current game state, including the current step, variables, and other game data in a object.

If you want to save the game progress into a json string, you can use the `getSaveJson` function.

A exemple of how to save the game progress:

```typescript
export function saveGame() {
    const jsonString = getSaveJson()
    // download the save data as a JSON file
    const blob = new Blob([jsonString], { type: "application/json" });
    // download the file
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "save.json";
    a.click();
}
```

## Load

To load the game progress, you can use the `loadSave` function. This function receives a object with the game data and a function `navigate: (path: string) => void` that will be called with the path of the previous step.

If you want to load the game progress from a json string, you can use the `loadSaveJsonString` function.

A exemple of how to load the game progress:

```typescript
export function loadGameSave(navigate: (path: string) => void, afterLoad?: () => void) {
    // load the save data from a JSON file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonString = e.target?.result as string;
                // load the save data from the JSON string
                loadSaveJsonString(jsonString, navigate);
                afterLoad && afterLoad();
            };
            reader.readAsText(file);
        }
    };
    input.click();
}
```
