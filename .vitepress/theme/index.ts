import type { Theme } from 'vitepress'
import 'vitepress-plugin-sandpack/dist/style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import DefaultTheme from 'vitepress/theme'
import ReactSandbox from './components/ReactSandbox.vue'
import ReactTypewriterSandbox from './components/ReactTypewriterSandbox.vue'
import Sandbox from './components/Sandbox.vue'
import './styles/vars.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('ReactSandbox', ReactSandbox);
    ctx.app.component('ReactTypewriterSandbox', ReactTypewriterSandbox);
    ctx.app.component('Sandbox', Sandbox);
    enhanceAppWithTabs(ctx.app)

  },
} satisfies Theme
