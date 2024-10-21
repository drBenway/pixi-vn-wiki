# How implement Speed text or Typewriter effect?

In a visual novel, it is very useful to have a typewriter effect.

For implement this effect, you can use the following code:

::: react-typewriter-sandbox {template=vite-react-ts previewHeight=200 coderHeight=632}

```tsx /App.tsx [hidden]
import Typewriter from "./components/Typewriter";
import text from "./values/text.txt?raw";

export default function App() {
    return (
        <>
            <Typewriter text={text} />
        </>
    )
}
```

```tsx /components/Typewriter.tsx [active]
import { useEffect, useState } from 'react';

export default function Typewriter({ text, delay = 30 }: {
    text: string;
    delay?: number;
}) {
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

```txt /values/text.txt
This is a random text that will be displayed with a typewriter effect.
You can change this text to whatever you want. The delay between each character can also be changed.
The default delay is 30 milliseconds. You can change it by passing a different value to the delay prop.
For example, you can set the delay to 100 milliseconds by passing delay={100}.
You can also change the text by editing the text.txt file. You can add more text or remove some text.
You can also change the delay between characters by passing a different value to the delay prop.
You can set the delay to 50 milliseconds by passing delay={50}.
```

:::

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
