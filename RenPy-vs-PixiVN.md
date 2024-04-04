# Ren'Py vs Pixi'VN

## Ren'Py

Ren'Py is a visual novel engine – used by thousands of creators from around the world – that helps you use words, images, and sounds to tell interactive stories that run on computers and mobile devices. These can be both visual novels and life simulation games. The easy to learn script language allows anyone to efficiently write large visual novels, while its Python scripting is enough for complex simulation games.

* Programming language: `Ren'Py language`, a programming language that allows you to develop visual novels without much knowledge and very quickly. It is based on Python.
* Canvas: [Pygame_sdl2](https://github.com/renpy/pygame_sdl2) is a reimplementation of the Pygame API using SDL2 and related libraries. While in the past it was meant to support multiple applications, it only saw adoption as technology underlying Ren'Py, and is currently being supported for that purpose.
* How does it work: Ren'Py is a complete framework that takes care of creating a project, executing it, creating files to be distributed on multiple devices etc...

## Performance

I imagine the performance of the Ren'Py and Pixi'VN libraries to be almost the same,
but the performance of the Canvas used by the two libraries is very significant.

* [Pygame_sdl2](https://github.com/renpy/pygame_sdl2): This canvas is absolutely underperforming. This can be tested by inserting more moving graphic elements into Renpy.
* PixiJS: It is based on more modern systems and has great performance. This can be tested directly from an example made by PixiJS: [Exemple](https://pixijs.com/examples/basic/cache-as-bitmap).

## Programming language

Ren'Py uses its own language, `Ren'Py language`, which is based on Python. This language is:

* Very simple and easy to learn, suitable for people who are not programmers.
* A language that is very useful for creating visual novels, but it is not suitable for creating complex games.
* Not typed
* At the moment, there are no debug systems present.
* Only used in RenPy, so once you learn it you won't be able to use it for anything else.

Pixi'VN uses JavaScript/TypeScript, which is a very powerful and popular language. Compared to `Ren'Py language`, it is

* Not a language created for visual novels and is not suitable for people who do not know object-oriented programming.
* A typed language
* Has a debugging system and have a lot of tools for development.
* Used in many other projects, so once you learn it you can use it for other projects. For example, you can use it to create a website, backend, app, pc software, etc...

## Device Distribution

In Ren'Py, you can create a project and then export it to multiple devices and this process is really simple.

In Pixi'VN, Creating a site with an interface that adapts to multiple devices is very simple, but creating a mobile or desktop application is not that simple.
you can create a project and then export it to multiple devices, but this process is more complex than Ren'Py.
To do this you will need to use libraries or frameworks for desktop and mobile applications. For example, you can use `Electron`, `Electron Forge`, `Cordova`, `Ionic`, etc...

## Development possibilities

## Conclusion
