<template>
  <div class="container">
    <div class="search-container">
      <label for="search" class="search">
        <input v-model="query" id="search" type="search" autocomplete="off" placeholder="Filter games" />
      </label>
    </div>
    <div class="results">
      <ul v-if="filteredGames.length">
        <li v-for="game in filteredGames" :key="game.url">
          <div class="game">
            <a class="title" :href="game.url" rel="noreferrer nofollow">{{ game.name }}</a>
            <span class="subtitle" v-if="game.implOf">based on {{ game.implOf }}</span>
            <span class="description" v-if="game.description">{{ game.description }}</span>
          </div>
        </li>
      </ul>
      <p v-else-if="query" class="no-results">
        No results
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Fuse from 'fuse.js'

// Props
const props = defineProps<{
  games: Array<{
    name: string
    description?: string
    implOf?: string
    url: string
  }>
}>()

const query = ref('')

const fuse = new Fuse(props.games, {
  keys: ['name', 'description', 'implOf', 'url']
})

const filteredGames = computed(() => {
  if (!query.value) return props.games
  return fuse.search(query.value).map(r => r.item)
})
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.search-container {
  margin: 0 auto;
  padding: 10px;
  font-size: 1.5em;
}

.search::before {
  content: '';
  background-image: url(https://icongr.am/fontawesome/search.svg?size=20);
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 10px;
}

@media (prefers-color-scheme: dark) {
  background-image: url(https://icongr.am/fontawesome/search.svg?size=20&color=ffffff);
}

.search-container .search {
  border-radius: 5px;
  background: var(--bg-input-text);
  border: none;
  outline: none;
  display: flex;
  align-items: stretch;
  border: 2px solid var(--border-card);
  width: 100%;
  text-align: center;
  color: inherit;
}
.search-container::after {
  display: block;
  content: '';
  width: 0%;
  height: 2.5px;
  margin: 1px auto;
  background-color: var(--accent);
  transition: width 0.15s ease-out;
}
.search-container:focus-within::after {
  width: 90%;
}

.search input {
  border: none;
  outline: none;
  background-color: transparent;
}

.results ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0;
  list-style: none;
}

.results li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  width: 300px;
}

.game {
  border-radius: 5px;
  background: var(--bg-card);
  border: 2px solid var(--border-card);
  padding: 10px;
  box-shadow: 4px 4px 0 var(--accent);
}

.game .title {
  display: block;
  font-weight: bold;
  margin-top: -4px;
}
.game .subtitle {
  display: block;
  font-size: 0.7rem;
  margin-top: 2px;
  color: var(--text-subtitle);
}

.game .description {
  display: block;
  margin-top: 4px;
  font-weight: 300;
  color: var(--text-subtitle);
}

.no-results {
  text-align: center;
}

.links {
  padding-top: 15px;
}
</style>
