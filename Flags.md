# Flags Management

Pixi’VN provides functions to manage "game flags". By "game flags" I mean boolean values that can be used to control the flow of the game, or olther boolean values that you want to save in the game storage.

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

## Development possibilities

### Connect flag to class boolean property

If you are creating a class with a boolean property, you can connect it to a flag. So this property will be automatically updated when the flag is changed.

This can simplify the code and make it more readable.

```typescript
import { getFlag, setFlag } from '@drincs/pixi-vn'

class ButtonClass {
    private _disabled: boolean | string
    get disabled() {
        if (typeof this._disabled === 'string') {
            return getFlag(this._disabled)
        }
        return this._disabled
    }
    set disabled(value: boolean | string) {
        this._disabled = value
    }
}
```

```typescript
// Button to go to school
const goToSchoolButton = new ButtonClass()
goToSchoolButton.disabled = 'weekend'

function afterNewDay() {
    setFlag('weekend', 
        // Check if it is Saturday or Sunday
    )
}
```
