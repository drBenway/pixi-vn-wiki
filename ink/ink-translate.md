# How translate *ink* text?

As explained in more detail [here](/start/translate.md), Pixi’VN gives the possibility to translate the game text using a library like [i18next](https://www.i18next.com/). Also in ***ink* + Pixi’VN integration** you can use the same library to translate the text of the ***ink***.

Pixi'vn gives the developer the ability to intercept the translation event to add custom functionality. This is done through the `onInkTranslate` function.

The `onInkTranslate` function receives a callback function that will be called whenever a text is found in the ***ink*** script. The callback function returns a string that indicates the translated text. The callback function receives a parameter:

* `text`: the text to translate.

:::tabs
== index.tsx

```ts
import { onInkTranslate } from 'pixi-vn-ink'
import { useTranslation } from "react-i18next";

const { t } = useTranslation(["narration"]);
onInkTranslate((text) => {
   return t(text)
})
```

== start.ink

```ink
Hello, my name is [joe]
```

== App.tsx

```tsx
import { useI18n } from './i18n'; // [!code focus]

export default function App() {
    useI18n() // [!code focus]

    return (
        // ...
    );
}
```

== strings_es.json

```json
{
    "narration": {
        "Hello, my name is [joe]": "Hola, mi nombre es [joe]"
        // ...
    }
}
```

:::

## Auto-generation of translation files

( Under development )
