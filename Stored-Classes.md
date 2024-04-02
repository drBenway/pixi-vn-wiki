# Storage Classes

Pixi'VN provides a abstract class `StoredClassModel` that you can use to create classes that can be saved and loaded from the [game storage](Stored-Classes). I suggest you extend this class to create your own stored class.

## Storage key

The custructor of the `StoredClassModel` class have a parameter `tag` that must be unique. This tag is used to save the class in the game storage (key in the object).

My suggestion is Create a costant variable and use it as a "prefix" and in the constructor of the class add the prefix to the tag.

```typescript
const MY_CLASS_PREFIX = "__MyClass__"

export default class MyClass extends StoredClassModel {
    constructor(tag: string, props: IMyClass) {
        super(
            // ... +
            MY_CLASS_PREFIX + tag
        )
        // ...
    }
}
```

## Storate properties

To save the properties of the class in the game storage you must use the `getStorageProperty` and `updateStorageProperty` methods.

For example, if you have a property `test` that you want to save in the game storage, you can add a getter and setter like this:

```typescript
export default class MyClass extends StoredClassModel {
    constructor(tag: string, props: IMyClass) {
        // ...
    }

    get test(): string {
        return this.getStorageProperty<string>("test") || ""
    }
    set test(value: string) {
        this.updateStorageProperty<string>("test", value)
    }
}
```
