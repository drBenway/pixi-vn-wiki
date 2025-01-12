# Assets

**What are assets?** Assets are all the files that are not code, such as images, sounds, and videos.

You can use assets saved locally in the project or online (For the second option you will need to make sure that the cloud service you are using allows *CORS requests*). Of course, if you want to place your bets online, a requirement of the game will be to be connected online. So I should warn the user and block the game in stone where the connection is absent.

If you are creating a visual novel, it is recommended to keep only the assets that are used multiple times locally. Often in visual novels some images are displayed only once during the game.

It is also very important that you read this documentation to better [organize the uploading of your assets](/start/assets-management.md).

## Assets hosting

You are completely free to store images however you want.

The main possibilities are the following:

* Github: https://github.com/[repository]/raw/refs/heads/main/[file path]

* Public URL: There are more sites that allow you to upload images for free, for example [imgbb](https://imgbb.com/), [imgix](https://www.imgix.com/), [imgur](https://imgur.com/). You can use the public URL of the image. It recommend t this method if you plan to create a web application.
* Private URL: You can use a private URL of the image, you can use a private server or a cloud service, for example [Amazon S3](https://aws.amazon.com/s3/) or [Firebase](https://firebase.google.com/). It recommend t this method if you plan to create a web application.

## PixiJS AssetPack

![logo-main](https://github.com/user-attachments/assets/8e5a1437-e446-4b2d-9b9d-ff0898472086)

AssetPack is a tool for optimising assets for the web. It can be used to transform, combine, compress assets. Any asset that you want to transform or optimise into something else can be done with AssetPack.

If you want to use AssetPack, you can find the documentation [here](https://pixijs.io/assetpack)
