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

---

<div class="grid">
<div class="left">
  <h2>
    AAA <br />
    <span>AAAA</span>
  </h2>

  aaaa

</div>

<div class="right">

<div class="images">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Freact-icon.png?alt=media" alt="React">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fvue-icon.png?alt=media" alt="Vue">
  <img src="/preact.svg" alt="Preact">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fpixijs-icon.png?alt=media" alt="PixiJS">
  <img src="/qwik.svg" alt="qwik">
  <img src="/litjs.svg" alt="lit">
  <img src="/solidjs.svg" alt="Solid">
  <img src="/svelte.svg" alt="Svelte">
</div>

</div>
</div>

---

<div class="grid">
<div class="right">
  <h2>
    AAA <br />
    <span>AAAA</span>
  </h2>

  aaaa

</div>

<div class="left">

<div class="images">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fpixijs-icon.png?alt=media" alt="PixiJS">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Ftypescript-icon.svg?alt=media" alt="TypeScript">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Ftauri-icon.png?alt=media" alt="Tauri">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fvscode-icon.png?alt=media" alt="VS Code">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fvitejs-icon.svg?alt=media" alt="Vite.js">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fi18n-icon.png?alt=media" alt="i18n">
  <img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fnodejs-icon.png?alt=media" alt="NodeJS">
  <img src="/threejs.svg" alt="Three.js">
</div>

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

.images {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  align-items: center;

  img {
    width: 4rem;
  }
}

img {
  transition: 200ms ease-in-out transform;
}

img:hover {
  transform: scale(1.3);
}
</style>
