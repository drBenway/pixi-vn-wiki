# Distribution

A very important point to take into account before developing a game is the distribution of the game. It is important to know how the game will be distributed and how it will be played by the users.

## Website

( Documentation under review )

### Enable the ADD TO HOME SCREEN - PWA Plugin

It could be very beneficial to enable the ability to install the website as a "browser application" and be able to use it as a standalone application on the device.

If you are using [Vite js](https://vitejs.dev/) as a build tool, you can use the [PWA Vite Plugin](https://vite-pwa-org.netlify.app/). You can copy this [exemple](https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html#web-app-manifest).

Else, you can create the `manifest.json`, it depernds on the framework you are using.

## Desktop devices

( Documentation under review )

## Mobile devices

( Documentation under review )

## itch.io

You can distribute your game on [itch.io](https://itch.io/). It is a platform that allows you to upload your game and distribute it to the public. It is a great platform to distribute your game and get feedback from the community.

To do this you will need to build your project and zip the build folder. Then you can upload the zip file to itch.io.

You will see a result of something like this:

The game is just blank. Despite it working when you ran the project locally, with npm start, it does not work on itch.io.
So how do you fix this? The solution is, thankfully, quite simple. Go into your package.json and add the following line:

`"homepage": ".",`

Your package.json should now look something like this:

```json
{
    "name": "Example Game",
    "version": "0.1.0",
    "homepage": ".",
    // ...
}
```

Now, when you build your project, it will work on itch.io.
