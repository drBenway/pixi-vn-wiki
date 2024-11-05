# Ink knot (or label)

As explained in the [official documentation](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md) of the Ink language, a knot is a named section of an ink file. It is a way to organize the content of the story. In the Pixi’VN library, it corresponds to a [label](/start/labels.md#label).

Also from ink you can call other labels written using another [narrative language or Javascript/TypeScript](/start/narration.md).

To run a knot (or label) you can use the following methods:

## Use the `->` symbol

Use the `->` symbol followed by the name of the knot, for example:

```ink
-> start
```

This functionality derives from native Ink and is the only native method to start a knot. So, if you test your script using **Inky**, you will be able to use this feature.

It corresponds to the [`jump` functionality](/start/labels.md#jump-to-a-label) in the Pixi’VN library.

As said before you can use the `->` symbol to call a knot written in another narrative language or Javascript/TypeScript, but if you're using Inky to test your script, Inky will warn you that the knot does not exist (because Inky analyzes only the .ink file).

It is for this very reason that the need for a custom command arises which is ignored by Inky but is handled by Pixi’VN. This is the [`# jump` command](#use-the-jump-script-command).

## Use the `jump` script command

Use the `# jump` script command followed by the name of the knot, for example:

```ink
# jump start
```

This is equivalent to the `->` symbol. The difference is that this command is ignored by Inky, so you can use it to call a knot written in another narrative language or Javascript/TypeScript without Inky warning you that the knot does not exist.

## Use the `call` script command

The native Ink language does not have a possibility to [call a knot](/start/labels.md#call-a-label) without jumping to it. This is why the Pixi’VN library adds the `# call` script command. This command is ignored by Inky.

Use the `# call` script command followed by the name of the knot, for example:

```ink
# call start
```
