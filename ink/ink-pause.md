# Using pause in *ink*

After executing a # script the system does a [go next](/start/labels-flow.md#next-step) to move to the next steps. For example in this case you will see the image and the dialogue text.

```ink
=== start ===
# image add "image" /image.jpg
Hello, world!
-> DONE
```

But if you want to show only the image without the dialogue text using **native *ink*** it is not possible. You will have to use the `# pause` command to stop the execution of the steps and set the dialogue text to empty.

```ink
=== start ===
# image add "image" /image.jpg
# pause
Hello, world!
-> DONE
```
