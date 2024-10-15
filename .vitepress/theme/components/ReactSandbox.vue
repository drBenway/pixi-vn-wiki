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
        '@drincs/pixi-vn': 'latest',
        '@tanstack/react-query': '^5.59.13',
        '@emotion/react': '^11.13.3',
        '@emotion/styled': '^11.13.0',
        '@mui/base': '^5.0.0-beta.58',
        '@mui/system': '^6.1.3'
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
