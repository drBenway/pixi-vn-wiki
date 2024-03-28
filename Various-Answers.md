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

## How to force completion of an Transition/Effect/Animation in the next step?

In Pixi'VN, it is possible to force the completion of a Transition/Effect/Animation in the next step in many cases it can be useful.
