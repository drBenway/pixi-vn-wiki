<template>
  <!-- 'code-options' is a build-in prop, do not edit it -->
  <Sandbox
    :rtl="rtl"
    :template="template"
    :light-theme="lightTheme"
    :dark-theme="darkTheme"
    :options="{
      ...props, // do not forget it
    }"
    :custom-setup="{
      ...props, // do not forget it
      deps: {
        "framer-motion": "^11.11.8",
        'react-markdown': '^9.0.1',
        'rehype-raw': '^7.0.0',
        'remark-gfm': '^4.0.0'
      }
    }"
    :code-options="codeOptions"
  >
    <slot />
  </Sandbox>
</template>

<script setup lang="ts">
import { Sandbox, sandboxProps } from 'vitepress-plugin-sandpack';

const props = defineProps(sandboxProps);
</script>
