# Ren'Py vs Pixi'VN

Making a comparison between Ren'Py and Pixi'VN is necessary because Ren'Py is currently the most popular engine for creating visual novels.

## Ren'Py

Ren'Py is a visual novel engine – used by thousands of creators from around the world – that helps you use words, images, and sounds to tell interactive stories that run on computers and mobile devices. These can be both visual novels and life simulation games. The easy to learn script language allows anyone to efficiently write large visual novels, while its Python scripting is enough for complex simulation games.

* Programming language: `Ren'Py language`, a programming language that allows you to develop visual novels without much knowledge and very quickly. It is based on Python.
* Canvas library: [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2) is a reimplementation of the Pygame API using SDL2 and related libraries. While in the past it was meant to support multiple applications, it only saw adoption as technology underlying Ren'Py, and is currently being supported for that purpose.
* How does it work: Ren'Py is a complete visual novel engine/framework that takes care of creating a project, executing it, distributing it, and much more.

## Performance

I imagine the performance of the Pixi'VN and the "visual novel library" used by Ren'Py to be almost the same, but the performance of the "canvas library" used is very significant.

* [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2): This canvas is absolutely underperforming. This can be tested by inserting more moving graphic elements into Renpy.
* PixiJS: It is based on more modern systems and has great performance. This can be tested directly from an example made by PixiJS: [Exemple](https://pixijs.com/examples/basic/cache-as-bitmap).

## Programming language

Ren'Py uses its own language, `Ren'Py language`, which is based on Python. This language is:

* Very simple and easy to learn, suitable for people who are not programmers, but it is not suitable for creating complex games.
* Not typed language
* At the moment, there are no debug systems present.
* Only used in RenPy, so once you learn it you will have no way to use it for other types of development.

Pixi'VN uses JavaScript/TypeScript, which is a very powerful and popular language. Compared to `Ren'Py language`, it is

* Not a language created for visual novels and is not suitable for people who do not know object-oriented programming.
* A typed language
* Has a debugging system and have a lot of tools for development.
* You can use it to create website, backend, mobile app, pc software, etc...

## Device Distribution

In Ren'Py, you can create a project and then export it to multiple devices and this process is really simple and fast.

In Pixi'VN, creating a site with an interface that adapts to multiple devices is very simple, but distributing the project as a mobile or desktop application is not fast like Ren'Py.
To do this you will need to use libraries or frameworks for desktop and mobile applications. For example, you can use `Electron`, `Electron Forge`, `Cordova`, `Ionic`, etc...

## Development possibilities

Ren'Py is a engine designed only for creating visual novels. Adding features that go outside of visual novel development is limiting and not recommended by the Ren'Py team. It does not have management for libraries

Pixi'VN is not a visual novels engine, but an npm library that allows you to create visual novels. So if you want you can use this library in a project that is not natively a visual novel. It has vast management for libraries with [npm](https://www.npmjs.com/).

## Project size

The entire interface of Renpy is based on "physical images", so the default size of a project is large.

In a Pixi'VN project, you can choose whether and which graphics component library to use or use a canvas with a "physical images". Being a library it does not determine the size of the project, but if you use vite, or webpack, or other tools, ad agraphics component library for the interface, default size of a project is very small.

## Longevity and ease of internal development

Ren'py born in 2004 and is still used today. It is a very stable and mature project.
Ren'Py in addition to including the development of its own library for visual novels also includes the development of `Ren'Py language` and `Pygame_sdl2`, and being an engine, developers must ensure that it is compatible with new technologies.

This means that keeping Ren'Py updated is a constant and very complex process that "touches" many types of programming (Parsing, Graphics, etc...).

Pixi'VN born in 2024. It is a very young project.
Pixi'VN is only a library that uses PixiJS for the canvas. As well as providing functionality for visual novels, it doesn't care about anything else.

This means that keeping Pixi'VN updated is a very simple process and once it reaches a stable version it will not need constant updates.

## Conclusion

Finally my personal conclusion is Pixi'VN is not for you, while RenìPy if one of these points describes you:

* You have never programmed and would try to stay away from programming as much as possible. (In the future, a library could be created that allows you to create a visual novel with Pixi'Vn using an interface without having to program)
* Besides showing text and images with transitions or other effects, you don't want to implement anything else in the future either (e.g. minigames). Ren'Py with renpy you can certainly use much less to create a project of this kind.

If these points don't describe you then Pixi'VN is for you.
