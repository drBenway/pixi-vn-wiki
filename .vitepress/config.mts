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
        text: 'Guide',
        items: [
          { text: 'Why Pixi’VN?', link: '/why' },
          { text: 'Getting Started', link: '/get-start' },
          { text: 'Interface with JavaScript Framework', link: '/interface' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DRincs-Productions/pixi-vn' }
    ]
  }
})
