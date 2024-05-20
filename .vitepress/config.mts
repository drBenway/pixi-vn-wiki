import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pixi’VN - PixiJS Visual Novel Engine",
  description: "Pixi’VN - Pixi'VN is a npm package that provides various features for creating visual novels, based on PixiJS.",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/start/getting-started' },
      { text: 'Advanced topics', link: '/advanced/canvas-elements' },
      {
        text: 'Other topics',
        items: [
          { text: 'Distribution', link: '/other/distribution' },
          { text: 'Various Answers', link: '/other/various-answers' },
        ],
      },
    ],

    sidebar: {
      '/start/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Why Pixi’VN?', link: '/start/why' },
            { text: 'Getting Started', link: '/start/getting-started' },
            { text: 'Interface with JavaScript Framework', link: '/start/interface' },
          ]
        },
        {
          text: 'First steps',
          items: [
            { text: 'Characters', link: '/start/character' },
            { text: 'Dialogue and Narration', link: '/start/narration' },
            { text: 'Label and Game Step', link: '/start/labels' },
            { text: 'Choice Menus', link: '/start/choices' },
            { text: 'Game Storage', link: '/start/storage' },
            { text: 'Flags Management', link: '/start/flags' },
            { text: 'Save and Load', link: '/start/save' },
            { text: 'Images and Animations', link: '/start/images' },
            { text: 'Canvas Elements', link: '/advanced/canvas-elements' },
          ]
        }
      ],
      '/advanced/': [
        {
          text: 'Advanced topics',
          items: [
            { text: 'Canvas Elements', link: '/advanced/canvas-elements' },
            { text: 'Animations and Effects', link: '/advanced/animations-effects' },
            { text: 'Tickers', link: '/advanced/tickers' },
            { text: 'Stored Classes', link: '/advanced/stored-classes' },
            { text: 'Intecept Events', link: '/advanced/intercept-events' },
          ]
        }
      ],
      '/other/': [
        {
          text: 'Other topics',
          items: [
            { text: 'Distribution', link: '/other/distribution' },
            { text: 'Various Answers', link: '/other/various-answers' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DRincs-Productions/pixi-vn' }
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      }
    }
  },

  sitemap: {
    hostname: 'https://pixi-vn.web.app/',
    xmlns: {
      news: false,
      xhtml: true,
      image: false,
      video: false
    },
    transformItems: (items) => {
      return items.map((item) => {
        if (item.url.includes('start')) {
          return {
            url: item.url,
            changefreq: 'monthly',
            priority: 1,
            lastmod: new Date()
          }
        }
        return {
          url: item.url,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date()
        }
      })
    }
  },

  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-KGCCEKXRVG' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KGCCEKXRVG');`
    ]
  ],

  srcExclude: ['**/Home.md']
})
