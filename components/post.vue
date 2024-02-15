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
</script>

<template>
  <div class="prose bg-white max-w-4xl mb-4 p-4 rounded-md">
    <div v-html="content.html" />
    <time :dateTime="createdAt">
      <span> {{ dateString }} at {{ timeString }} </span>
    </time>
  </div>
</template>
