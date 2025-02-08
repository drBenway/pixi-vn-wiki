---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Pixi’VN"
  text: "PixiJS & Visual Novel engine"
  tagline: Create visual novels with a modern 2D rendering engine and your favorite JavaScript framework.
  image:
    src: /logo.webp
    alt: Pixi’VN Logo
  actions:
    - theme: brand
      text: Quick start
      link: /start/getting-started
    - theme: alt
      text: Why Pixi’VN?
      link: /start/why
    - theme: alt
      text: Make your first Visual Novel 
      link: /start/make-visual-novel

features:
  - icon: <img 
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fpixijs-icon.png?alt=media" 
        alt="PixiJS"
        style="border-radius:30%;"
      />
    title: PixiJS
    details: Add images, animations, and effects to your visual novel with the powerful 2D rendering engine, PixiJS.
    link: /start/canvas
  - icon: <img 
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Ftypescript-icon.svg?alt=media" 
        alt="TypeScript"
        style="border-radius:30%;"
      />
    title: TypeScript
    details: Write your visual novel with the modern JavaScript language, TypeScript.
    link: https://www.typescriptlang.org/
  - icon: <img
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Ftauri-icon.png?alt=media" 
        alt="Multi device"
        style="border-radius:30%;"
      />
    title: Multi device
    details: Create your visual novel for multiple devices, including desktop, mobile, web, and more.
    link: /advanced/distribution
  - icon: <img
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fi18n-icon.png?alt=media" 
        alt="Translating"
        style="border-radius:30%;"
      />
    title: Translating
    details: Translate your visual novel into multiple languages with your favorite translation framework. For example, i18next.
    link: /start/translate
  - icon: <img 
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fvscode-icon.png?alt=media" 
        alt="VS Code"
        style="border-radius:30%;"
      />
    title: Visual Studio Code
    details: Use the powerful code editor, Visual Studio Code, to write your visual novel.
    link: https://code.visualstudio.com/
  - icon: <img 
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fnodejs-icon.png?alt=media" 
        alt="NodeJS"
        style="border-radius:30%;"
      />
    title: NodeJS
    details: Use the JavaScript runtime, NodeJS, to run your visual novel.
    link: https://nodejs.org/
  - icon: <img 
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fvitejs-icon.svg?alt=media" 
        alt="ViteJS"
        style="border-radius:30%;"
      />
    title: ViteJS
    details: Initialize your visual novel with the modern JavaScript framework, ViteJS.
    link: https://vitejs.dev/
  - icon: <img 
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Freact-icon.png?alt=media" 
        alt="React"
        style="border-radius:30%;"
      />
    title: React
    details: Use your favorite JavaScript framework, React, to create your visual novel UI.
    link: /start/interface-react
  - icon: <img 
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fvue-icon.png?alt=media" 
        alt="Vue"
        style="border-radius:30%;"
      />
    title: Vue
    details: Use your favorite JavaScript framework, Vue, to create your visual novel UI.
    link: /start/interface-vue
  - icon: <img
        src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fangular-icon.png?alt=media" 
        alt="Angular"
        style="border-radius:30%;"
      />
    title: Angular
    details: Use your favorite JavaScript framework, Angular, to create your visual novel UI.
    link: /start/interface-angular
---


---

<div class="grid">
<div class="right">
  <h2>
    Write your narrative <br />
    <span>As you like</span>
  </h2>

  Write your story in your favorite storytelling language. Like *ink* or Ren'py or TS/JS. In all cases you can also interact with the canvas and sounds, or create custom features. You can read more about it [here](/start/narration.md).

</div>
<div class="left">

::: code-group

```ink [start.ink]
=== start
Hello, world!
This is a Pixi’VN tutorial.
I hope you enjoy it!
->DONE
```

```renpy [start.rpy]
label start:
    "Hello, world!"
    "This is a Pixi’VN tutorial."
    "I hope you enjoy it!"
```

```typescript [startLabel.ts]
const startLabel = newLabel("start_label_id", [
    (props) => narration.dialogue = "Hello, world!",
    (props) => narration.dialogue = "This is a Pixi’VN tutorial.",
    (props) => narration.dialogue = "I hope you enjoy it!"
])
```

```json [startLabel.json]
{
    "labels": {
        "start_label_id": [
            {
                "dialogue": "Hello, world!",
            },
            {
                "dialogue": "This is a Pixi’VN tutorial.",
            },
            {
                "dialogue": "I hope you enjoy it!",
            },
        ],
    }
}
```

:::

</div>
</div>

<style scoped>
.grid {
  display: grid;
  align-items: center;

  h2 {
    border-top: none;
    margin-top: 0rem;
    font-size: 2.25rem;
    line-height: calc(2.5 / 2.25);

    span {
      color: cyan;
    }
  }

  .right {
    max-width: 40ch;
    text-wrap: pretty;
  }
}

@media (min-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4rem;

    .right {
      order: 2;
    }
  }
}
</style>
