# Why Pixi’VN?

The reason why Pixi’VN was born is that current systems for creating a visual novel are based on dated systems and have many shortcomings.

## What is Pixi’VN?

Pixi’VN is a npm package that provides various features for creating visual novels, has functions to manage story steps, saving and loading, variable storage, dialogues, character,canvas management, and much more.

Pixi’VN + [Templates](/start/getting-started.md#pivivn-templates) provides a complete solution and is in effect a visual novel engine.

It is designed for web developers, with basic experience in JavaScript/TypeScript, who want to create a visual novel with a modern 2D rendering engine and their favorite JavaScript framework.

It is based on [Pixi.js](https://pixijs.com/), a rendering engine that allows you to create fast 2D graphics. It is based on WebGL and is very fast and efficient. It is used by many developers to create games, websites, and applications.

## Ren'Py vs Pixi’VN

Making a comparison between Ren'Py and Pixi’VN is necessary because Ren'Py is currently the most popular engine for creating visual novels.

### What is Ren'Py?

Ren'Py is a visual novel engine – used by thousands of creators from around the world – that helps you use words, images, and sounds to tell interactive stories that run on computers and mobile devices. These can be both visual novels and life simulation games. The easy to learn script language allows anyone to efficiently write large visual novels, while its Python scripting is enough for complex simulation games.

* Programming language: `Ren'Py language`, a programming language that allows you to develop visual novels without much knowledge and very quickly. It is based on Python.
* Canvas library: [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2) is a reimplementation of the Pygame API using SDL2 and related libraries. While in the past it was meant to support multiple applications, it only saw adoption as technology underlying Ren'Py, and is currently being supported for that purpose.
* How does it work: Ren'Py is a complete visual novel engine/framework that takes care of creating a project, executing it, distributing it, and much more.

### Performance

I imagine the performance of the Pixi’VN and the "visual novel library" used by Ren'Py to be almost the same, but the performance of the "canvas library" used is very significant.

* [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2): This canvas is absolutely underperforming. This can be tested by inserting more moving graphic elements into Renpy.
* PixiJS: It is based on more modern systems and has great performance. This can be tested directly from an example made by PixiJS: [Exemple](https://pixijs.com/8.x/examples/textures/render-texture-advanced).

### Programming language

Ren'Py uses its own language, `Ren'Py language`, which is based on Python. This language is:

* Very simple and easy to learn, suitable for people who are not programmers, but it is not suitable for creating complex games.
* Not typed language
* At the moment, there are no debug systems present.
* Only used in RenPy, so once you learn it you will have no way to use it for other types of development.

Pixi’VN uses JavaScript/TypeScript, which is a very powerful and popular language. Compared to `Ren'Py language`, it is

* Not a language created for visual novels and is not suitable for people who do not know object-oriented programming.
* A typed language
* Has a debugging system and have a lot of tools for development.
* You can use it to create website, backend, mobile app, pc software, etc...

#### Dialogues implementation

Pixi’VN uses JavaScript/TypeScript, so respect to Ren'Py, it not have a specific language for dialogues.

So the Ren'Py language syntax is very compact and easy respect to JavaScript/TypeScript.

Example of Ren'Py:

```renpy
label start:
    "Hello, world!"
    "This is a Ren'Py tutorial."
    "I hope you enjoy it!"
```

Example of Pixi’VN:

```typescript
const startLabel = newLabel("start_label_id", [
    (props) => setDialogue("Hello, world!"),
    (props) => setDialogue("This is a Pixi’VN tutorial."),
    (props) => setDialogue("I hope you enjoy it!")
])
```

#### Minigame implementation

In Ren'Py, for creating minigames with complex mechanics/animations, you need to use the [`Creator-Defined Displayables (CDD)`](https://www.renpy.org/doc/html/cdd.html), this is necessary because otherwise you will have big performance problems. With CDD you can create/control one or more graphic elements through a render loop.
CDD is not very intuitive and complicated to use. There are very few examples and few developers using CDD. In fact, most of the minigames do not have complex logic and animations.

In Pixi’VN, you can use PixiJS to create minigames. PixiJS is a very powerful library that allows you to create complex animations and mechanics. The documentation and examples are very detailed and there are many developers using PixiJS.

You can try some Ren'py and PIxiJS games to understand the difference:

* Ren'Py minigames: <https://itch.io/game-assets/free/tag-minigames/tag-renpy>
* PixiJS minigames: <https://github.com/pixijs/open-games>
* PixiJS tutorials: <https://pixijs.com/8.x/tutorials>

#### Interface implementation

In Ren'Py, for creating the interface, you need to create screens and styles. The most recommended implementation is to create a series of images that are positioned within the canvas across graphic objects. The graphic tools are very few, limiting and not very intuitive.

In Pixi’VN, in addition to being able to use the elements of PixiJS, you can also use systems such as React, Vue, Angular, etc. and install component libraries such as Material-UI, Bootstrap, etc. This allows you to create much more complex interface screens with excellent performance.

### Device Distribution

In Ren'Py, you can create a project and then distribute it to multiple devices and this process is really simple and fast.

Pixi’VN does not deal with the distribution of the project. To distribute the project you will need to use libraries or frameworks for desktop and mobile applications. For example, you can use `Electron`, `Electron Forge`, `Cordova`, `Ionic`, etc...

### Development possibilities

Ren'Py is a engine designed only for creating visual novels. Adding features that go outside of visual novel development is limiting and not recommended by the Ren'Py team. It does not have management for libraries.

Pixi’VN is an [npm](https://www.npmjs.com/) library that allows you to create visual novels. So if you want you can use this library in a project that is not natively a visual novel. [npm](https://www.npmjs.com/) is a package manager for JavaScript and the world's largest software registry.

### Project size

The entire interface of Renpy is based on "physical images" and this makes the size of the project very large.

In a Pixi’VN project, you can choose whether and which graphics component library to use or use a canvas with a "physical images". Being a library it does not determine the size of the project, but if you use [vite](https://vitejs.dev/) or other tools, the size of the project will be very small.

### Longevity and ease of internal development

Ren'py born in 2004 and is still used today. It is a very stable and mature project.
Ren'Py in addition to including the development of its own library for visual novels also includes the development of `Ren'Py language` and `Pygame_sdl2`. Furthermore, since it also deals with distributing the project on various devices, this means that Ren'Py must also keep the system updated based on the devices on which it is distributed.

This means that keeping Ren'Py updated is a constant and very complex process that "touches" many types of programming (Parsing, Graphics, etc...).

Pixi’VN born in 2024. It is a very young project.
Pixi’VN is only a library that uses PixiJS for the canvas. As well as providing functionality for visual novels, it doesn't care about anything else.

This means that keeping Pixi’VN updated is a very simple process and once it reaches a stable version it will not need constant updates.

### Conclusion

Finally my personal conclusion is that, you know object-oriented programming and you want to create a visual novel with various features (minigames, etc...) you should use Pixi’VN. If you are not a programmer and you want to create a visual novel quickly and easily, you can use Ren'Py.
