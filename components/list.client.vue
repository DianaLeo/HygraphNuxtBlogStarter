<script lang="ts" setup>
import type { Post } from "../types";

const amount = ref(3);
const cursor = ref(false);
const nextPage = ref(false);
const posts = ref<Post[]>([]);

const { refresh, pending } = useAsyncData("postsResult", async () => {
  const results = await $fetch(
    "https://ap-southeast-2.cdn.hygraph.com/content/clw7795ev000008l4c7ya1hvq/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: {
        query: `
          query Posts($cursor: String, $amount: Int!) {
            pages: postsConnection(after: $cursor, first: $amount, orderBy: createdAt_DESC) {
              pageInfo {
                hasNextPage
                endCursor
              }
              posts: edges {
                cursor
                post: node {
                  slug
                  id
                  createdAt
                  content {
                    html
                  }
                }
              }
            }
          }
        `,
        variables: {
          amount: amount.value,
          cursor: cursor.value || null,
        },
      },
    }
  );

  const { pages } = results.data;
  const { endCursor, hasNextPage } = pages.pageInfo;

  pages.posts.forEach((post: Post) => {
    posts.value.push(post);
  });

  cursor.value = endCursor;
  nextPage.value = hasNextPage;
});
</script>

<template>
  <div>
    <post
      v-for="postObject in posts"
      :key="postObject.cursor"
      :post="postObject"
    />

    <div v-if="pending" class="bg-white mb-4 p-4 rounded-md text-center">
      Loading...
    </div>

    <button
      class="bg-white mb-4 p-4 rounded-md"
      v-if="nextPage && !pending"
      @click="refresh()"
    >
      Get More
    </button>
  </div>
</template>
