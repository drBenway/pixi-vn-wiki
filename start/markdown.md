# Style Text with Markdown

Markdown is a lightweight markup language for creating formatted text using a plain-text editor. John Gruber created Markdown in 2004, in collaboration with Aaron Swartz, as a markup language that is intended to be easy to read in its source code form. Markdown is widely used for blogging and instant messaging, and also used elsewhere in online forums, collaborative software, documentation pages, and readme files.

The package Pixi'VN does not manage Markdown, but it is recommended to use a library that converts Markdown to HTML, for example [react-markdown](https://www.npmjs.com/package/react-markdown).

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

## Markdown + Typewriter

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
