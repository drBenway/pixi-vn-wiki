# Interface with JavaScript Framework

Pixi’VN offers the possibility of adding an HTML Element with the same dimensions as the [PixiJS Canvas](/start/canvas-elements.md) to add an **interface** with JavaScript frameworks.

By "Interface" is meant the elements that are above the canvas, such as buttons, forms, etc.

![Frame_Aufbau](https://github.com/user-attachments/assets/54adca3e-7f5a-4886-a52a-d499d2cca6b3)

This allows the use of systems such as React, Vue, Angular, etc. to create much more complex **interface screens** with excellent performance.

* [Angular](/start/interface-angular.md)
* [React Interface](/start/interface-react.md)
* [Vue](/start/interface-vue.md)

## How navigate/switch between interface screens?

To switch between interface screens (without interrupting the canvas), you can use popups and modals, or navigate between different [paths/routes](#what-is-the-url-path-and-routes).

### What is the URL Path and Routes?

The URL Path is the part of the URL that comes after the domain. For example, in the URL `https://example.com/path/to/page`, the path is `/path/to/page`.

A routering system can be used to manage navigation between URL Paths. For example you can use:

* [React Router](https://reactrouter.com/)
* [Vue Router](https://router.vuejs.org/)
* [Angular Router](https://angular.io/guide/router)
* [TanStack Router](https://tanstack.com/router/latest)

## How to enable HTML interaction?

By default, all HTML elements of the interface have the `pointer-events: none` style.
The reason is that because the html interface is above the canvas, all clicks are intercepted by the interface and not by the canvas.

So you must set the `pointer-events: auto` style only for the elements (example a button, a form, etc...) that you want to interact with the user.
