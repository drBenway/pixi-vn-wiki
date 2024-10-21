import type { Theme } from 'vitepress'
import 'vitepress-plugin-sandpack/dist/style.css'
import DefaultTheme from 'vitepress/theme'
import ReactSandbox from './components/ReactSandbox.vue'
import ReactTypewriterSandbox from './components/ReactTypewriterSandbox.vue'
import './styles/vars.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('ReactSandbox', ReactSandbox);
    ctx.app.component('ReactTypewriterSandbox', ReactTypewriterSandbox);
  },
} satisfies Theme
