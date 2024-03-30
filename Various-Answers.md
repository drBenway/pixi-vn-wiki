# Various Answers

## How enable the decorators in TypeScript?

In Pixi'VN, in many basic functions, it is necessary to use decorators.

By default, TypeScript does not enable the use of decorators. To enable the use of decorators in TypeScript, you must add the following configuration to the `tsconfig.json` file:

```json
{
    "compilerOptions": {
        // ...
        "experimentalDecorators": true
    }
}
```

## What is the URL Path?

The URL Path is the part of the URL that comes after the domain. For example, in the URL `https://example.com/path/to/page`, the path is `/path/to/page`.

A routering system can be used to manage navigation between URL Paths. For example you can use:

* [React Router](https://reactrouter.com/)
* [Vue Router](https://router.vuejs.org/)
* [Angular Router](https://angular.io/guide/router)
* [TanStack Router](https://tanstack.com/router/latest)

## How to force completion of an Transition/Effect/Animation in the next step?

In Pixi'VN, it is possible to force the completion of a Transition/Effect/Animation in the next step in many cases it can be useful.

Transition/Effect/Animation usually increment a variable until it reaches a target, after which it is closed.

In this case you can simply set the variable equal to the objective to be achieved in the next step.

For example:

```typescript
@labelDecorator()
export class ShowImageTest extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                showImageWithDisolveEffect("alien", 'https://pixijs.com/assets/eggHead.png', 0.01)
            },
            () => {
                let alien = GameWindowManager.getCanvasElement<CanvasImage>("alien")
                if (alien) alien.alpha = 1
            },
        ]
    }
}
```

Also, you can [unlink the Transition/Effect/Animation](Tickers) from the canvas element in the next step.
