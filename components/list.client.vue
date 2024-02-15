<script lang="ts" setup>
type Talk = {
  cursor: string;
  talk: {
    conference: string;
    date: string;
    link: string;
    location: string;
    talk: string;
  };
};

const amount = ref(3);
const cursor = ref(false);
const nextPage = ref(false);
const talks = ref<Talk[]>([]);
const total = ref(0);

const { refresh } = useAsyncData("talksResult", async () => {
  const results = await fetch(
    "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clifk2kla052e01ui88kyhe0c/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `
          query Talks($cursor: String, $amount: Int!) {
            page: talksConnection(after: $cursor, first: $amount, orderBy: date_DESC) {
              talks: edges {
              cursor
                talk: node {
                  conference
                  date
                  link
                  location
                  talk
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
              aggregate {
                count
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
  const { page } = json.data;
  const { endCursor, hasNextPage } = page.pageInfo;

  page.talks.forEach((talk: Talk) => {
    talks.value.push(talk);
  });

  cursor.value = endCursor;
  nextPage.value = hasNextPage;
  total.value = page.aggregate.count;
});
</script>

<template>
  <div class="wrapper">
    <h1>Tim's conference talks</h1>
    <ul>
      <li v-for="talkObject in talks" :key="talkObject.cursor">
        <p class="conference">{{ talkObject.talk.conference }}</p>
        <p>{{ talkObject.talk.talk }}</p>
      </li>
    </ul>
    <p class="talk-status">
      Showing {{ talks.length }} out of {{ total }} talks
    </p>
    <button v-if="nextPage" @click="refresh()">Load More</button>
  </div>
</template>

<style>
.wrapper {
  margin: 5rem auto;
  max-width: 400px;
  list-style: none;
  font-family: sans-serif;
}

ul {
  padding: 0;
  list-style: none;
  margin: 0 0 2rem 0;
}

li {
  margin: 0 0 1rem 0;
}

h1 {
  font-size: 1.5rem;
  margin: 0 0 2rem;
}

p {
  margin: 0;
}

p.conference {
  font-weight: bold;
}

.talk-status {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
}
</style>
