# Style Text with Markdown

Markdown is a lightweight markup language for creating formatted text using a plain-text editor. John Gruber created Markdown in 2004, in collaboration with Aaron Swartz, as a markup language that is intended to be easy to read in its source code form. Markdown is widely used for blogging and instant messaging, and also used elsewhere in online forums, collaborative software, documentation pages, and readme files.

The package Pixi'VN does not manage Markdown, but it is recommended to use a library that converts Markdown to HTML, for example [react-markdown](https://www.npmjs.com/package/react-markdown).

It is recommended to use a library that converts Markdown to HTML, for example [react-markdown](https://www.npmjs.com/package/react-markdown).

::: react-typewriter-sandbox {template=vite-react-ts previewHeight=200 coderHeight=400}

```tsx /App.tsx [hidden]
import MarkdownComponent from "./components/MarkdownComponent";
import text from "./values/markdown.md?raw";

export default function App() {
    return (
        <>
            <MarkdownComponent text={text} />
        </>
    )
}
```

```tsx /components/MarkdownComponent.tsx [active]
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function MarkdownComponent({ text }: {
    text: string;
}) {
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

<<< @/snippets/react/values/markdown.md{prefix=/values/}

:::

## Markdown + Typewriter

To be able to merge with Markdown and Typewriter, you can use [react-markdown](https://www.npmjs.com/package/react-markdown) and [Framer Motion](https://www.framer.com/motion/).

The following phrase creates an effect of typing only for a "normal" text (in the react-markdown is the "p" element), for the other elements it will be displayed immediately.

::: react-typewriter-sandbox {template=vite-react-ts previewHeight=200 coderHeight=912}

```tsx /App.tsx [hidden]
import Typewriter from "./components/Typewriter";
import text from "./values/markdown.md?raw";

export default function App() {
    return (
        <>
            <Typewriter text={text} />
        </>
    )
}
```

```tsx /components/Typewriter.tsx [active]
import { motion, Variants } from "framer-motion";
import { useMemo, useRef } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function TypewriterInternal({ children, letterVariants, dadElement }: {
    children: any
    letterVariants: Variants
    dadElement: (children: JSX.Element | JSX.Element[]) => JSX.Element | JSX.Element[]
    isRoot?: boolean
}) {
    if (typeof children === "string") {
        const spanList = children.split("").map((char, i) => {
            const ref = useRef<HTMLSpanElement>(null);
            return <motion.span
                ref={ref}
                key={`span-${char}-${i}`}
                variants={letterVariants}
            >
                {char}
            </motion.span>
        })
        return dadElement(spanList)
    }
    else if (Array.isArray(children)) {
        const list = children.map((child) => {
            if (typeof child === "string") {
                let spanList = child.split("").map((char, i) => {
                    const ref = useRef<HTMLSpanElement>(null);
                    return <motion.span
                        ref={ref}
                        key={`span-${char}-${i}`}
                        variants={letterVariants}
                    >
                        {char}
                    </motion.span>
                })
                return spanList
            }
            return child
        })
        return dadElement(list)
    }
    return dadElement(children)
};

export default function Typewriter({ text, delay = 30 }: {
    text: string
    delay?: number
}) {
    const sentenceVariants: Variants = {
        hidden: {},
        visible: { opacity: 1, transition: { staggerChildren: delay / 1000 } },
    };
    const letterVariants = useMemo<Variants>(() => ({
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
    }), [delay]);

    return (
        <motion.div
            key={text}
            variants={sentenceVariants}
            initial="hidden"
            animate={"visible"}
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // "p" element is the "normal" text, it will have the typewriter effect
                    p: ({ children }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => {
                                if (Array.isArray(children)) {
                                    children.push(<motion.br />)
                                    return children
                                }
                                return children
                            }}
                        />
                    },
                    // Other elements will be displayed immediately
                    a: ({ children, href, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.a
                                href={href}
                                target="_blank"
                                variants={letterVariants}
                            >
                                {children}
                            </motion.a>
                            }
                        />
                    },
                    code: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.code
                                variants={letterVariants}
                            >
                                {children}
                            </motion.code>
                            }
                        />
                    },
                    ul: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.ul
                                style={{
                                    ...style,
                                    margin: 0,
                                }}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.ul>
                            }
                        />
                    },
                    li: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.li
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.li>
                            }
                        />
                    },
                    strong: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.strong
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.strong>
                            }
                        />
                    },
                    em: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.em
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.em>
                            }
                        />
                    },
                    hr: ({ style }) => {
                        return <motion.hr
                            style={style}
                            variants={letterVariants}
                        />
                    },
                    th: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.th
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.th>
                            }
                        />
                    },
                    del: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.del
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.del>
                            }
                        />
                    },
                    table: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.table
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.table>
                            }
                        />
                    },
                    span: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.span
                                style={style}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.span>
                            }
                        />
                    },
                    h1: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h1
                                style={{
                                    ...style,
                                    margin: 0,
                                }}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h1>
                            }
                        />
                    },
                    h2: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h2
                                style={{
                                    ...style,
                                    margin: 0,
                                }}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h2>
                            }
                        />
                    },
                    h3: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h3
                                style={{
                                    ...style,
                                    margin: 0,
                                }}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h3>
                            }
                        />
                    },
                    h4: ({ children, style }) => {
                        return <TypewriterInternal
                            children={children}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h4
                                style={{
                                    ...style,
                                    margin: 0,
                                }}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h4>
                            }
                        />
                    },
                }}
            >
                {text}
            </Markdown>
        </motion.div>
    )
};
```

<<< @/snippets/react/values/markdown.md{prefix=/values/}

:::
