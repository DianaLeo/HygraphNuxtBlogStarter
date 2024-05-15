<script setup lang="ts">
import gql from "graphql-tag"

const query = gql(`
query GetBanner {
  banners {
    name
    video
  }
}
`)
const { data } = await useAsyncQuery(query)
console.log(data.value.banners[0].video.playbackId)

</script>
<template>
<div>Banner</div>
</template>