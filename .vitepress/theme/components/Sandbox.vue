<script setup lang="ts">
import { sandboxProps } from 'vitepress-plugin-sandpack';
import { onMounted, ref } from 'vue';

const { template, previewHeight = 500, ...rest } = defineProps(sandboxProps);
const entry = rest.entry ? "module=" + encodeURI(rest.entry) + "&" : ''
</script>

<template>
  <iframe
    ref="iframe"
    :src="`https://codesandbox.io/embed/${template}?${entry}fontsize=12&hidenavigation=1&theme=dark&view=preview&hidedevtools=1`"
    :style="`width: 100%; height: ${previewHeight}px; border: 0; border-radius: 4px; overflow: hidden;`"
    title="drincs/pixi-vn"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  />
</template>
