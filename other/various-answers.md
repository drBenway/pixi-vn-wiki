# Various Answers

## What is the URL Path and Routes?

The URL Path is the part of the URL that comes after the domain. For example, in the URL `https://example.com/path/to/page`, the path is `/path/to/page`.

A routering system can be used to manage navigation between URL Paths. For example you can use:

* [React Router](https://reactrouter.com/)
* [Vue Router](https://router.vuejs.org/)
* [Angular Router](https://angular.io/guide/router)
* [TanStack Router](https://tanstack.com/router/latest)

### How use navigation function in step/label?

It is recommended to overwrite the `StepLabelProps` interface to add the `navigate` function. `navigate` function is a function that will be called with the URL Path or Route of the next step, so you can use it to navigate to the next Interface.

For example:

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelProps {
        /**
         * function to navigate to a new route.
         * @param route The route to navigate to.
         * @returns 
         */
        navigate: (route: string) => void
        // ...
    }
}
```

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        ({ navigate }) => navigate('/new-route'),
    ]
)
```

## How to force completion of an Transition/Effect/Animation in the next step?

In Pixi’VN, it is possible to force the completion of a Transition/Effect/Animation in the next step in many cases it can be useful.

Transition/Effect/Animation usually increment a variable until it reaches a target, after which it is closed.

In this case you can simply set the variable equal to the objective to be achieved in the next step.

For example:

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        () => {
            showWithDissolveTransition("alien", 'https://pixijs.com/assets/eggHead.png', 0.01)
        },
        () => {
            let alien = GameWindowManager.getCanvasElement<CanvasImage>("alien")
            if (alien) alien.alpha = 1
        },
    ]
)
```

Also, you can [unlink the Transition/Effect/Animation](/advanced/tickers) from the canvas element in the next step.

## Skip step and Auto Forward

In a visual novel, It's very helpful to have the option to skip a step or auto forward to the next step.

Pixi’VN does not directly implement these 2 features, in order to leave more customization to the developer.

My advice to implement these features is to add a control where `GameStepManager.runNextStep()` is used:

```tsx
// React example
const [skipEnabled, setSkipEnabled] = useState<boolean>(false)
const [autoEnabled, setAutoEnabled] = useState<boolean>(false)
const [recheckSkipAuto, setRecheckSkipAuto] = useState<number>(0)

useEffect(() => {
    if (skipEnabled || autoEnabled) {
        nextOnClick()
    }
}, [skipEnabled, recheckSkipAuto, autoEnabled])

function nextOnClick() {
    GameStepManager.runNextStep({})
        .then(() => {
            if (skipEnabled) {
                setTimeout(() => {
                    setRecheckSkipAuto((p) => p + 1)
                }, 0.2);
            }
            else if (autoEnabled) {
                setTimeout(() => {
                    setRecheckSkipAuto((p) => p + 1)
                }, 2);
            }
        })
        .catch((e) => {
            // ...
        })
}

// Button for enable skip and auto ...
```

## How translate the visual novel?

It is the developer's job to choose which library to use to translate the game. It recommend using [i18next](https://www.i18next.com/).

It is recommended to overwrite the `StepLabelProps` interface to add the `t` function. `t` function is a function that will be called with the key of the translation, so you can use it to translate the text.

```typescript
// pixi-vn.types.ts
declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelProps {
        /**
         * Translate a key to a string.
         * @param key The key to translate.
         * @returns The translated string.
         */
        t: TFunction<[string], undefined>
        // ...
    }
}
```

```typescript
export const startLabel = newLabel(START_LABEL_ID,
    [
        ({ t }) => setDialogue({ character: liam, text: t("hello_my_name_is", { name: "Liam" }) }),
    ]
)
```

```json
{
    "hello_my_name_is": "Hello, my name is {{name}}"
}
```

## How implement Speed text or Typewriter effect?

In a visual novel, it is very useful to have a typewriter effect.

For implement this effect, you can use the following code:

```tsx
// react example
import { useEffect, useState } from 'react';

type ITypewriterProps = {
    text: string;
    delay: number;
};

export default function Typewriter({ text, delay }: ITypewriterProps) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    useEffect(() => {
        setCurrentText('');
        setCurrentIndex(0);
    }, [text]);

    return <span>{currentText}</span>;
};
```

You can achieve the same result using the library [Framer Motion](https://www.framer.com/motion/):

```tsx
import { motion, Variants } from "framer-motion";
import { useMemo } from "react";

export default function Typewriter({ children, delay = 0 }: { children: string; delay?: number; }) {
    const sentenceVariants: Variants = {
        hidden: {},
        visible: { opacity: 1, transition: { staggerChildren: delay / 1000 } },
    };
    const letterVariants = useMemo<Variants>(() => ({
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
    }), [delay]);

    return (
        <motion.p
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
        >
            {children.split("").map((char, i) => (
                <motion.span key={`${char}-${i}`} variants={letterVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.p>
    )
};
```

## Use Markdown in the visual novel

Markdown is a lightweight markup language for creating formatted text using a plain-text editor. John Gruber created Markdown in 2004, in collaboration with Aaron Swartz, as a markup language that is intended to be easy to read in its source code form.[9] Markdown is widely used for blogging and instant messaging, and also used elsewhere in online forums, collaborative software, documentation pages, and readme files.

It is recommended to use a library that converts Markdown to HTML, for example [react-markdown](https://www.npmjs.com/package/react-markdown).

```tsx
import { Typography } from "@mui/joy";
import { motion, Variants } from "framer-motion";
import { Key, useMemo } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const text = `
# Hello, world!

This is a paragraph.

<span style="color:blue">some *blue* text</span>.
`

export default function Example() {
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        >
            {text}
        </Markdown>
    )
};
```

## Typewriter + Markdown

To be able to merge with Markdown and Typewriter, you can use [react-markdown](https://www.npmjs.com/package/react-markdown) and [Framer Motion](https://www.framer.com/motion/).

The following phrase creates an effect of typing only for a "normal" text (in the react-markdown is the "p" element), for the other elements it will be displayed immediately.

```tsx
import { motion, Variants } from "framer-motion";
import { Key, useMemo } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function TypewriterMarkdownInternal({ children, key, letterVariants, dadElement }: {
    children: any,
    key: Key | null | undefined;
    letterVariants: Variants;
    dadElement: (children: JSX.Element | JSX.Element[]) => JSX.Element | JSX.Element[];
    isRoot?: boolean;
}) {
    if (typeof children === "string") {
        const spanList = children.split("").map((char, i) => (
            <motion.span key={`${key}-${char}-${i}`} variants={letterVariants} >
                {char}
            </motion.span>
        ))
        return dadElement(spanList)
    }
    if (Array.isArray(children)) {
        const list = children.map((child) => {
            if (typeof child === "string") {
                let spanList = child.split("").map((char, i) => (
                    <motion.span key={`${key}-${char}-${i}`} variants={letterVariants} >
                        {char}
                    </motion.span>
                ))
                return spanList
            }
            return child
        })
        return dadElement(list)
    }
    return dadElement(children)
};

export default function TypewriterMarkdown({ text, delay = 0 }: { text: string; delay?: number; }) {
    const sentenceVariants: Variants = {
        hidden: {},
        visible: { opacity: 1, transition: { staggerChildren: delay / 1000 } },
    };
    const letterVariants = useMemo<Variants>(() => ({
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
    }), [delay]);

    return (
        <motion.p
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // "p" element is the "normal" text, it will have the typewriter effect
                    p: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => {
                                if (Array.isArray(children)) {
                                    children.push(<motion.br key={key + "-br"} />)
                                    return children
                                }
                                return children
                            }}
                        />
                    },
                    // Other elements will be displayed immediately
                    a: ({ children, href, key, style }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.a
                                href={href}
                                key={key}
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.a>
                            }
                        />
                    },
                    h1: ({ children, key, style }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h1
                                key={key}
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h1>
                            }
                        />
                    },
                    // ...
                    // You can see the complete implementation here: https://github.com/DRincs-Productions/pixi-vn-react-template/blob/main/src/components/TypewriterMarkdown.tsx
                }}
            >
                {text}
            </Markdown>
        </Typography>
    )
};
```

## Where can I store the images?

You are completely free to store images however you want.

The main possibilities are the following:

* Inside the project: You can insert the images inside the project and use the relative path. It recommend this method if you plan to create a desktop/mobile application.
* Inside the project, but download them upon installation: You can insert the images inside the project and download them upon installation. It recommend t this method if you plan to create a desktop/mobile application.
* Public URL: There are more sites that allow you to upload images for free, for example [imgur](https://imgur.com/). You can use the public URL of the image. It recommend t this method if you plan to create a web application.
* Private URL: You can use a private URL of the image, you can use a private server or a cloud service, for example [Amazon S3](https://aws.amazon.com/s3/) or [Firebase](https://firebase.google.com/). It recommend t this method if you plan to create a web application.
