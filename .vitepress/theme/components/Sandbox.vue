<template>
  <div ref="alertDialog"></div>
</template>

<script setup lang="ts">
import { sandboxProps } from 'vitepress-plugin-sandpack';
import { onMounted, ref } from 'vue';
import { createPortalNode, createReactApp } from './createReactApp.ts';
import SandboxReact from './SandboxReact.tsx';

const props = defineProps(sandboxProps);
const alertDialog = ref()

onMounted(() => {
  createReactApp([
    createPortalNode(SandboxReact, alertDialog.value, { template: props.template, previewHeight: props.previewHeight, entry: props.entry }),
  ])
})
</script>
