# PixiJS Canvas

<img src="https://pixijs.com/images/logo.svg" alt="drawing" width="200" style="margin-top: 10px;" />

Pixi’VN uses [PixiJS](https://www.pixijs.com/) to render the visual novel. You can use the Pixi’VN API to add images, text, and animations to the canvas.

## What is PixiJS?

PixiJS is a rendering engine that allows you to create rich, interactive graphics and animations. It is used in games like [Good Pizza, Great Pizza](https://www.goodpizzagreatpizza.com/) and [The Enchanted Cave 2](https://store.steampowered.com/app/368610/The_Enchanted_Cave_2/).

PixiJS is a powerful tool for creating games and interactive experiences. It is fast, flexible, and easy to use. You can learn more about PixiJS on the [PixiJS website](https://www.pixijs.com/).

It is perfect for creating visual novels because it allows you to easily add images, text, and animations to the canvas.

## How use PixiJS in Pixi’VN?

Use `PixiJS Canvas` in Pixi’VN is very similar to use PixiJS in a normal project. The only differences are as follows:

* A new element called [CanvasImage](/start/animations-effects.md) has been added, it simplifies the process of adding images to the canvas and the ability to use transitions to add and remove images.
* You do not have direct access to PIXI.Application, but you need to use GameWindowManager.
* You cannot use [PixiJS Components](https://pixijs.com/8.x/guides/components/assets) and Tickers directly, but other [components](/start/canvas-elements.md) and [Tickers](/start/tickers.md) that are equivalent to PixiJS ones.
* You can't set a listener with the `on` method, but must use the [onEvent](/start/canvas-elements.md#add-a-listener-for-a-given-event) to add a listener.

## Use PixiJS DevTools with Pixi’VN

[**PixiJS DevTools**](https://pixijs.io/devtools/) is a [Chrome extension](https://chromewebstore.google.com/detail/pixijs-devtools/dlkffcaaoccbofklocbjcmppahjjboce) that allows you to inspect and debug PixiJS applications. You can use it to view the display list, inspect textures, and debug your PixiJS application. You can use it with Pixi’VN to inspect the canvas and debug your visual novel.

![devtools](https://pixijs.io/devtools/img/devtool-screenshot.png)

For access to the PixiJS DevTools after installing it, you need to open the Chrome DevTools (F12) and go to the `PixiJS` tab.

![image](https://github.com/user-attachments/assets/579a181f-b865-44ff-9b55-2fbe609632bc)
