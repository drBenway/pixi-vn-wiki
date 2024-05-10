# Interface with JavaScript Framework

In addition to managing the Pixi.js "Canvas", Pixi’VN offers the possibility of adding an HTML Element with the same dimensions as the "Canvas" to add interactions with the user.

This allows the use of systems such as React, Vue, Angular, etc. to create much more complex interfaces with excellent performance.

With this, you can use varius UI tools to create a more complex interface screens.

## How to enable HTML interaction?

By default, all HTML elements of the interface have the `pointer-events: none` style.
The reason is that because the canvas is above the interface, therefore if it were enabled it would intercept all clicks, not allowing interactions with the canvas.

So you must set the `pointer-events: auto` style only for the elements that you want to interact with the user.

## How navigate/switch between interface screens?

To switch between interface screens (without interrupting the canvas), you can use popups and modals, or navigate between different routes.
For navigate between different url paths/routes ( [What is the URL Path and Routes?](/other/various-answers#what-is-the-url-path-and-routes) ).

## Use Angular

( Coming soon )

## Use React

[React](https://react.dev/) is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.

```typescript
// main.tsx
import { GameWindowManager } from '@drincs/pixi-vn'
import { createRoot } from 'react-dom/client'

// GameWindowManager.initialize...
GameWindowManager.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
}).then(() => {
    // React setup with ReactDOM
    const root = document.getElementById('root')
    if (!root) {
        throw new Error('root element not found')
    }

    GameWindowManager.initializeHTMLLayout(root)
    const reactRoot = createRoot(GameWindowManager.htmlLayout)

    reactRoot.render(
        <App />
    )
})
```

This is the HTML file that will be used to load the application.

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/pixiVN.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pixi’VN</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

```css
/* index.css */
:root {
  background-color: #242424;
}

body {
  margin: 0;
  display: flex;
}
```

## Use Vue

( Coming soon )
