<template>
  <div class="container">
    <div>
      <div>
        <input v-model="query" type="search" autocomplete="off" />
        <ul v-if="games.length">
          <li v-for="game in games" :key="game.slug">
            <NuxtLink :to="game.path">{{ game.name }}<span v-if="game.implOf"> (clone of {{game.implOf}})</span></NuxtLink>
          </li>
        </ul>
        <p v-else-if="query">
          No results
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      games: [],
      query: ''
    };
  },
  watch: {
    async query (query) {
      if (!query) {
        this.games = []
        return
      }

      this.games = await (this as any).$content()
        .only(['name', 'slug', 'path', 'implOf'])
        .limit(12)
        .search(query)
        .fetch()
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
