<script setup lang="ts">
import type { Post } from "../types";
const props = defineProps<{
  post: Post;
}>();

const content = computed(() => {
  return props.post.post.content;
});

const createdAt = computed(() => {
  return props.post.post.createdAt;
});

const dateString = computed(() => {
  return new Date(createdAt.value).toLocaleDateString("en-US", {
    dateStyle: "full",
  });
});

const timeString = computed(() => {
  return new Date(createdAt.value).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });
});

const title = computed(() => props.blurbEls.find((el) => el.type?.includes("heading")))
const body = computed(() => props.blurbEls.find((el) => el.type === "paragraph"))
</script>

<template>
  <div class="prose bg-black text-white max-w-4xl mb-4 p-4 rounded-md">
    <div v-html="content.html" />
    <HtmlRenderer v-if="title" :node="title" :ui="{ h3: 'text-lg' }" class="mb-4" />

    <time :dateTime="createdAt">
      <span> {{ dateString }} at {{ timeString }} </span>
    </time>
  </div>
</template>
