# Distribution

A very important point to take into account before developing a game is the distribution of the game. It is important to know how the game will be distributed and how it will be played by the users.

## Website

( Documentation under review )

### Hosting

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

itch.io can run only the html and javascript files: if you need to build your game and d zip the build folder. Then you can upload the zip file to itch.io.

You will see a result of something like this:

![image](https://github.com/user-attachments/assets/0482a6fa-8c21-4fa6-b4e1-04f05bc4315d)

The solution is to [host the game on a server](#hosting) and then create an iframe on itch.io to show the game.

For example, after hosting the game on a server, you can create a index.html file with the following content:

```html
<!doctype html>
<html lang="en" style="height: 100%; width: 100%;">
  <head></head>
  <body
    style="height: 100%; width: 100%; display: flex; overflow: hidden; margin: 0; background-color: #242424;"
  >
    <div id="root"
      style="height: 100%; width: 100%;"
    >
      <iframe
        src="https://pixi-vn-react-template.web.app/"
        style="height: 100%; width: 100%; border: none;"
      >
      </iframe>
    </div>
  </body>
</html>
```

Then you can upload the index.html file to itch.io.
