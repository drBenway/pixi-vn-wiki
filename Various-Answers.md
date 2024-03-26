# Various Answers

## How enable the decorator in TypeScript?

In Pixi'VN, in many basic functions, it is necessary to use decorator.

By default, TypeScript does not enable the use of decorator. To enable the use of decorator in TypeScript, you must add the following configuration to the `tsconfig.json` file:

```json
{
    "compilerOptions": {
        // ...
        "experimentalDecorators": true
    }
}
```
