import type { Theme } from 'vitepress'
import 'vitepress-plugin-sandpack/dist/style.css'
import DefaultTheme from 'vitepress/theme'
import ReactSandbox from './components/ReactSandbox.vue'
import './styles/vars.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('ReactSandbox', ReactSandbox);
  },
} satisfies Theme
