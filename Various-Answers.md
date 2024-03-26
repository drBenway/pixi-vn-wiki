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
