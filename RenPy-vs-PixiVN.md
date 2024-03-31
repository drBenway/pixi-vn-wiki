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

Ren'Py uses its own language, `Ren'Py language`, which is based on Python. This language is very simple and easy to learn, suitable for people who are not programmers. It is a language that is very useful for creating visual novels, but it is not suitable for creating complex games.
Ren'Py is not typed and there are currently no debugging systems.

Pixi'VN uses JavaScript/TypeScript, which is a very powerful and popular language. Compared to `Ren'Py language`, it is not a language created for visual novels and is not suitable for people who do not know object-oriented programming. It is a typed language, has a debugging system and have a lot of tools for development.

## Device Distribution

## Development possibilities
