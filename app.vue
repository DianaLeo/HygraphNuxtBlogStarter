<template>
  <header class="bg-neutral-800">
    <Banner/>
  </header>
  <div class="container max-w-full min-h-screen bg-neutral-800">
    <div class="mx-auto max-w-[800px] px-4 py-8">
      <h1 class="text-4xl text-white font-bold mb-4">My Microblog</h1>
      <list />
    </div>
  </div>
  <footer class="text-center bg-neutral-900 text-white p-3">
    Copyright {{ new Date().getFullYear() }} | Powered by
    <a href="https://hygraph.com">Hygraph</a>
  </footer>
</template>
