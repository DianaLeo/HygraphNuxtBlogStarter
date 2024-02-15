<script lang="ts" setup>
import type { Post } from "../types";

const amount = ref(3);
const cursor = ref(false);
const nextPage = ref(false);
const posts = ref<Post[]>([]);
const total = ref(0);

const { refresh, pending } = useAsyncData("postssResult", async () => {
  const results = await fetch(
    "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clcrreocx0oot01ur229906i3/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
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
      }),
    }
  );

  const json = await results.json();
  const { pages } = json.data;
  const { endCursor, hasNextPage } = pages.pageInfo;

  pages.posts.forEach((post: Post) => {
    posts.value.push(post);
  });

  cursor.value = endCursor;
  nextPage.value = hasNextPage;
  total.value = pages.aggregate.count;
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
