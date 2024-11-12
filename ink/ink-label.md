# Ink knot (or label)

As explained in the [official documentation](https://www.inklestudios.com/ink/web-tutorial/) of the Ink language:

The story is comprised of multiple linked sections which we call "knots" in ink terminology. The start of a knot is indicated in ink using at least two equals signs the left hand side knot's name, and optionally on the right too (so for example `=== london ===`).

In the Pixi’VN library, a knot corresponds to a [label](/start/labels.md#label). The "integration of Ink + Pixi’VN", in addition to giving the possibility to run ink nodes, also allows you to call knots (or labels) written in another [narrative language or Javascript/TypeScript](/start/narration.md).

To run a knot (or label) you can use the following methods:

## Use the `->` symbol

You can start a knot using the `->` symbol. Write the `->` symbol followed by the name of the knot, for example:

```ink
-> start
```

This feature derives from native Ink and is the only native method to start a knot. So, if you test your script using **Inky**, you will be able to use this feature.

It corresponds to the [`jump` functionality](/start/labels.md#jump-to-a-label) in the Pixi’VN library.

As said before you can use the `->` symbol to call a knot written in another narrative language or Javascript/TypeScript, but if you're using Inky to test your script, Inky will warn you that the knot does not exist (because Inky analyzes only the .ink file).

It is for this very reason that the need for a new command arises which is ignored by Inky but is handled by Pixi’VN. This is the [`# jump` command](#use-the-jump-script-command).

## Use the `jump` script command

You can start a knot using the `# jump` script command. Write the `# jump` script command followed by the name of the knot, for example:

```ink
# jump start
```

This feature is added by "Ink + Pixi'vn" integration ".

This is equivalent to the `->` symbol. The difference is that this command is ignored by Inky, so you can use it to call a knot written in another narrative language or Javascript/TypeScript without Inky warning you that the knot does not exist.

## Use the `call` script command

The native Ink language does not have a possibility to [call a knot](/start/labels.md#call-a-label) without jumping to it. This is why the "integration of Ink + Pixi’VN" adds the `# call` script command. This command is ignored by Inky.

Write the `# call` script command followed by the name of the knot, for example:

```ink
# call start
```
