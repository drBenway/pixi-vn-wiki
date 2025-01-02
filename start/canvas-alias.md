# Canvas alias

The canvas alias is a way to reference a component in the canvas by a name. This name is used to reference the component in the script.

The alias is unique, if a component is added using an existing alias the new component will replace the old one.

The alias corresponds to `PixiJSComponent.label`, so do not modify `label`, use the [methods provided by Pixi’VN](/start/canvas-functions.md).

## Heredity factor

If a component is added using an existing alias the new component, in addition to replacing the old one, will inherit the properties, the zIndex and the [tickers](/start/canvas-tickers.md) of the old component.

## Edit canvas component alias

To edit the alias of a canvas component, you can use the `canvas.editAlias`.

The `editAlias` method have the following parameters:

* `oldAlias`: The old alias of the component to edit.
* `newAlias`: The new alias of the component.

```typescript
import { canvas } from '@drincs/pixi-vn'

canvas.editAlias('sprite1', 'sprite2')
```
