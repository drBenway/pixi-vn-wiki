import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pixi’VN",
  description: "Pixi’VN is a npm package that provides various features for creating visual novels, based on PixiJS.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/get-start' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Why Pixi’VN?', link: '/why' },
          { text: 'Getting Started', link: '/get-start' },
          { text: 'Interface with JavaScript Framework', link: '/interface' },
        ]
      },
      {
        text: 'First steps',
        items: [
          { text: 'Characters', link: '/character' },
          { text: 'Dialogue and Narration', link: '/narration' },
          { text: 'Choice Menus', link: '/choices' },
          { text: 'Label and Game Step', link: '/labels' },
          { text: 'Game Storage', link: '/storage' },
          { text: 'Flags Management', link: '/flags' },
          { text: 'Save and Load', link: '/save' },
          { text: 'Images and Animations', link: '/images' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DRincs-Productions/pixi-vn' }
    ]
  }
})
