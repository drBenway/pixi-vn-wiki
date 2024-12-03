import react from '@vitejs/plugin-react';
import container from 'markdown-it-container';
import { defineConfig } from 'vitepress';
import { renderSandbox } from 'vitepress-plugin-sandpack';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';

const ogUrl = 'https://pixi-vn.web.app'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pixi’VN",
  description: "Pixi’VN - Pixi'VN is a npm package that provides various features for creating visual novels, based on PixiJS.",

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Pixi’VN' }],
    ['meta', { property: 'og:url', content: 'https://pixi-vn.web.app' }],
    ['meta', { property: 'og:description', content: 'PixiJS Visual Novel Engine' }],
    ['meta', { property: 'og:site_name', content: 'pixivn' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
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
    ],
    [
      'script',
      { async: '', src: 'https://cdn.botpress.cloud/webchat/v2.2/inject.js' }
    ],
    [
      'script',
      { async: '', src: 'https://files.bpcontent.cloud/2024/11/18/14/20241118144206-K69YIHK1.js' }
    ],
  ],

  themeConfig: {
    logo: '/logo.webp',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/start/getting-started' },
      { text: 'Advanced topics', link: '/advanced/intercept-events' },
      {
        text: 'Other topics',
        items: [
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
          ]
        },
        {
          text: 'First steps',
          items: [
            { text: 'Characters', link: '/start/character' },
            {
              text: 'Narration',
              link: '/start/narration',
              items: [
                { text: 'Narration with ink', link: '/ink/ink' },
                { text: 'Narration with Ren’Py (In Development)', link: '/renpy/renpy' },
                {
                  text: 'Narration with JS/TS',
                  items: [
                    { text: 'Dialogue', link: '/start/dialogue' },
                    { text: 'Label and Game Step', link: '/start/labels' },
                    { text: 'Advanced label features', link: '/start/labels-advanced' },
                    { text: 'Choice Menus', link: '/start/choices' },
                    { text: 'Input', link: '/start/input' },
                    { text: 'History', link: '/start/history' },
                    { text: 'Translating', link: '/start/translate' },
                    { text: 'Typewriter effect', link: '/start/typewriter' },
                    { text: 'Markup language (to add text style)', link: '/start/markdown' },
                    { text: 'Other features', link: '/start/other-narrative-features' },
                  ]
                }
              ]
            },
            {
              text: 'PixiJS Canvas',
              link: '/start/canvas',
              items: [
                { text: 'Images', link: '/start/images' },
                { text: 'Video', link: '/start/videos' },
                { text: 'Transitions', link: '/start/transition' },
                { text: 'Canvas Elements', link: '/start/canvas-elements' },
                { text: 'Animations and Effects', link: '/start/animations-effects' },
                { text: 'Tickers', link: '/start/tickers' },
              ]
            },
            { text: 'Sounds and Music', link: '/start/sound' },
            {
              text: 'Game storage',
              link: '/start/storage',
              items: [
                { text: 'Flags Management', link: '/start/flags' },
                { text: 'Stored Classes', link: '/start/stored-classes' },
              ]
            },
            {
              text: 'UI with JavaScript Framework',
              link: '/start/interface',
              items: [
                {
                  text: 'JavaScript Frameworks',
                  items: [
                    { text: 'Angular UI', link: '/start/interface-angular' },
                    { text: 'React UI', link: '/start/interface-react' },
                    { text: 'Vue UI', link: '/start/interface-vue' },
                  ]
                },
                { text: 'Navigate/switch between UI screens', link: '/start/interface-navigate' },
                { text: 'Connect the UI with the storage', link: '/start/interface-connect-storage' },
              ]
            },
            { text: 'Save and Load', link: '/start/save' },
            { text: 'Advanced topics', link: '/advanced/intercept-events' },
          ]
        }
      ],
      '/ink/': [
        {
          text: 'ink',
          items: [
            {
              text: 'Narration with ink',
              link: '/ink/ink',
              items: [
                { text: 'Characters', link: '/ink/ink-character' },
                { text: 'Open a knot', link: '/ink/ink-label' },
                { text: 'Variables', link: '/ink/ink-variables' },
                { text: 'Markup language (to add text style)', link: '/ink/ink-markup' },
                { text: 'Input', link: '/ink/ink-input' },
                { text: 'Canvas', link: '/ink/ink-canvas' },
                { text: 'Sounds and Music', link: '/ink/ink-sound' },
                { text: 'Pause', link: '/ink/ink-pause' },
                { text: 'Translating', link: '/ink/ink-translate' },
                { text: 'Text replacement', link: '/ink/ink-replacement' },
                { text: 'Custom Hashtag Script', link: '/ink/ink-hashtag' },
              ]
            },
            { text: 'Back', link: '/start/narration' }
          ],
        }
      ],
      '/renpy/': [
        {
          text: 'Ren’Py (In Development)',
          items: [
            { text: 'Narration with Ren’Py', link: '/renpy/renpy' },
            { text: 'Back', link: '/start/narration' }
          ],
        }
      ],
      '/advanced/': [
        {
          text: 'Advanced topics',
          items: [
            { text: 'First steps', link: '/start/character' },
            { text: 'Intecept Events', link: '/advanced/intercept-events' },
            {
              text: 'Distribution',
              link: '/advanced/distribution',
              items: [
                { text: 'Website distribution', link: '/advanced/distribution-website' },
                { text: 'Desktop & mobile devices', link: '/advanced/distribution-desktop-mobile' },
              ]
            },
            { text: 'Pixi’VN + Json', link: '/advanced/pixi-vn-json' },
          ]
        }
      ],
      '/other/': [
        {
          text: 'Other topics',
          items: [
            { text: 'Various Answers', link: '/other/various-answers' },
          ]
        }
      ]
    },

    editLink: {
      pattern: 'https://github.com/DRincs-Productions/pixi-vn/discussions/categories/wiki',
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/E95FZWakzp' },
      { icon: 'github', link: 'https://github.com/DRincs-Productions/pixi-vn' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@drincs/pixi-vn' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 240 240" color="#ff8484d2" xmlns="http://www.w3.org/2000/svg"><path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z"/></svg>'
        }, link: 'https://drincs-productions.itch.io/pixi-vn'
      },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 280 280" color="#ff884cce" xmlns="http://www.w3.org/2000/svg"><path d="M279.748,133.142c0-19.299-15.701-35-35-35c-10.768,0-20.674,4.812-27.279,13.064 c-18.532-8.431-39.663-13.626-62.015-15.271l19.206-60.692l42.895,9.294c3.285,12.782,14.901,22.258,28.693,22.258 c16.336,0,29.627-13.29,29.627-29.626c0-16.336-13.291-29.627-29.627-29.627c-11.801,0-21.999,6.941-26.759,16.95l-49.497-10.725 c-5.041-1.092-10.094,1.833-11.651,6.756l-23.705,74.907c-26.164,0.638-50.988,6.053-72.356,15.775 C55.674,102.954,45.768,98.142,35,98.142c-19.299,0-35,15.701-35,35c0,9.373,3.683,18.173,10.222,24.709 c-3.9,8.37-5.875,17.076-5.875,25.936c0,24.048,14.396,46.492,40.538,63.199c25.447,16.264,59.183,25.221,94.989,25.221 c35.808,0,69.542-8.957,94.989-25.221c26.142-16.707,40.538-39.151,40.538-63.199c0-8.859-1.975-17.565-5.875-25.936 C276.065,151.314,279.748,142.515,279.748,133.142z M15.369,145.139c-2.212-3.59-3.369-7.688-3.369-11.997c0-12.682,10.317-23,23-23 c5.444,0,10.558,1.851,14.649,5.258C35.027,123.702,23.517,133.689,15.369,145.139z M68.04,165.405c0-13.785,11.215-25,25-25 c13.785,0,25,11.215,25,25c0,13.785-11.215,25-25,25C79.255,190.405,68.04,179.19,68.04,165.405z M191.159,222.459 c-9.745,10.637-29.396,17.244-51.285,17.244c-21.888,0-41.539-6.607-51.284-17.244c-1.805-1.97-2.733-4.525-2.617-7.192 c0.116-2.669,1.266-5.133,3.235-6.937c1.849-1.694,4.247-2.627,6.754-2.627c2.797,0,5.484,1.183,7.373,3.244 c5.803,6.333,20.827,10.756,36.539,10.756c15.712,0,30.737-4.423,36.539-10.756c1.889-2.062,4.576-3.244,7.374-3.244 c2.508,0,4.906,0.933,6.755,2.627c1.97,1.804,3.118,4.268,3.234,6.937C193.893,217.934,192.964,220.489,191.159,222.459z  M186.708,190.405c-13.785,0-25-11.215-25-25c0-13.785,11.215-25,25-25c13.785,0,25,11.215,25,25 C211.708,179.19,200.493,190.405,186.708,190.405z M264.379,145.139c-8.147-11.45-19.657-21.436-34.28-29.739 c4.092-3.408,9.205-5.258,14.649-5.258c12.683,0,23,10.318,23,23C267.748,137.451,266.591,141.549,264.379,145.139z"/></svg>'
        }, link: 'https://www.reddit.com/r/PixiVN'
      },
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

  srcExclude: ['**/Home.md'],

  transformPageData(pageData) {
    const canonicalUrl = `${ogUrl}/${pageData.relativePath}`
      .replace(/\/index\.md$/, '/')
      .replace(/\/getting-started\.md$/, '/')
      .replace(/\/character\.md$/, '/')
      .replace(/\/dialogue\.md$/, '/')
      .replace(/\/images\.md$/, '/')
      .replace(/\.md$/, '/')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.unshift(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title }],
    )
    return pageData
  },

  markdown: {
    languageAlias: {
      '#hidden': 'bash',
      'prefix#hidden/components/': 'bash',
      'prefix#hidden/screens/': 'bash',
      'prefix#hidden/screens/modals/': 'bash',
      'prefix#hidden/use_query/': 'bash',
      'prefix#active/ink_labels/': 'bash',
      'prefix/': 'bash',
      'prefix#readonly/': 'bash',
      'prefix#active/screens/': 'bash',
      'prefix#readonly/use_query/': 'bash',
      'prefix#active/screens/modals/': 'bash',
      'prefix#active/components/': 'bash',
      'prefix/components/': 'bash',
      'prefix/values/': 'bash',
    },
    config(md) {
      md
        .use(tabsMarkdownPlugin)
        // the second parameter is html tag name
        // .use(container, 'react-sandbox', {
        //   render(tokens, idx) {
        //     return renderSandbox(tokens, idx, 'react-sandbox');
        //   },
        // })
        // .use(container, 'react-typewriter-sandbox', {
        //   render(tokens, idx) {
        //     return renderSandbox(tokens, idx, 'react-typewriter-sandbox');
        //   },
        // })
        .use(container, 'sandbox', {
          render(tokens, idx) {
            return renderSandbox(tokens, idx, 'sandbox');
          },
        })
    },
    languages: [
      {
        displayName: "ink",
        name: "ink",
        patterns: [
          {
            include: "#comment"
          },
        ],
        repository: {
          "comment": {
            "captures": {
              "0": {
                "name": "entity.name.label.ink"
              },
            },
            "match": "(?<=^|\\s)(\\/\\/)(.*$)",
          },
        },
        scopeName: "source.ink",
      },
      {
        displayName: "Ren’Py",
        name: "renpy",
        patterns: [
          {
            include: "source.python"
          }
        ],
        repository: {},
        scopeName: "source.renpy",
      }
    ]
  },
  vite: {
    plugins: [react()],
  },
})
