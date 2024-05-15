<script setup lang="ts">
import { astToHtmlString } from "@graphcms/rich-text-html-renderer"
import type { ElementNode } from "@graphcms/rich-text-types"

const props = defineProps<{
  node: ElementNode
  ui?: {
    h2?: string | string[]
    h3?: string | string[]
    h4?: string | string[]
    p?: string | string[]
    ol?: string | string[]
    ul?: string | string[]
    li?: string | string[]
  }
}>()

const h2 = useTailwindMerged("text-lg font-bold", () => props.ui?.h2 ?? "")
const h3 = useTailwindMerged("text-xl/relaxed font-semibold", () => props.ui?.h3 ?? "")
const h4 = useTailwindMerged("", () => props.ui?.h4 ?? "")
const p = useTailwindMerged("text-sm", () => props.ui?.p ?? "")
const ol = useTailwindMerged("list-decimal pl-5 text-sm leading-5", () => props.ui?.ol ?? "")
const ul = useTailwindMerged("list-disc pl-5 text-sm leading-5", () => props.ui?.ul ?? "")
const li = useTailwindMerged("", () => props.ui?.li ?? "")

const html = astToHtmlString({
  content: [props.node],
  renderers: {
    h2: ({ children }) => `<h2 class="${h2.value}">${children}</h2>`,
    h3: ({ children }) => `<h3 class="${h3.value}">${children}</h3>`,
    h4: ({ children }) => `<h4 class="${h4.value}">${children}</h4>`,
    p: ({ children }) => `<p class="${p.value}">${children}</p>`,
    ol: ({ children }) => `<ol class="${ol.value}">${children}</ol>`,
    ul: ({ children }) => `<ul class="${ul.value}">${children}</ul>`,
    li: ({ children }) => `<li class="${li.value}">${children}</li>`,
  },
})

const richTextHtml = ref(html)
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="richTextHtml"></div>
</template>
