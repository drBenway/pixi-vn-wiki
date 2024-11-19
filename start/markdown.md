# Markup language

The markup language is a text-encoding system which specifies the structure and formatting of a document and potentially the relationships among its parts. Markup can control the display of a document or enrich its content to facilitate automated processing. The most common and easy-to-use markup language is **Markdown**.

## Markdown

**Markdown** is a lightweight markup language for creating formatted text using a plain-text editor. John Gruber created Markdown in 2004, in collaboration with Aaron Swartz, as a markup language that is intended to be easy to read in its source code form. Markdown is widely used for blogging and instant messaging, and also used elsewhere in online forums, collaborative software, documentation pages, and readme files.

The package Pixi’VN does not manage Markdown, but it is recommended to use a library that converts Markdown to HTML, for example [react-markdown](https://www.npmjs.com/package/react-markdown).

```tsx
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

::: sandbox {template=4h8wst entry=/src/components/MarkdownComponent.tsx}
:::

### Markdown + Typewriter

To be able to merge with Markdown and Typewriter, you can use [react-markdown](https://www.npmjs.com/package/react-markdown) and [Framer Motion](https://www.framer.com/motion/).

The following phrase creates an effect of typing only for a "normal" text (in the react-markdown is the "p" element), for the other elements it will be displayed immediately.

::: sandbox {template=p2cjqm previewHeight=500 entry=/src/components/Typewriter.tsx}
:::
