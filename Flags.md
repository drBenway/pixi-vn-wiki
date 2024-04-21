# Flags Management

Pixi'VN provides functions to manage "game flags". By "game flags" I mean boolean values that can be used to control the flow of the game, or olther boolean values that you want to save in the game storage.

This mechanic has much less impact on save size than directly [saving a boolean in Game Sorage](/Game-Storage.md#set-a-variable-in-the-game-storage).

## Set a Flag

To set a flag you can use the `setFlag` function. The `setFlag` function have the following parameters:

* `name`: The flag name.
* `value`: The flag value.

```typescript
import { setFlag } from '@drincs/pixi-vn'

setFlag('flag1', true)
```

## Get a Flag

To get a flag you can use the `getFlag` function. The `getFlag` function have the following parameters:

* `name`: The flag name.

```typescript
import { getFlag } from '@drincs/pixi-vn'

const flag1 = getFlag('flag1')
```
