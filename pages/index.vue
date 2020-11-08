<template>
  <div class="index">
    <header>
      The Mercer Bros. Magnificent Web Game Index
    </header>
    <div class="container">
      <div class="search">
        <input v-model="query" type="search" autocomplete="off" placeholder="Filter games" />
      </div>
      <div class="results">
        <ul v-if="games.length">
          <li v-for="game in games" :key="game.slug">
            {{ game.name }}
          </li>
        </ul>
        <p v-else-if="query" class="no-results">
          No results
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _games from '@/content/games.json'
import Fuse from 'fuse.js'

export default Vue.extend({
  data() {
    return {
      games: _games,
      query: '',
      fuse: new Fuse(_games, {
        shouldSort: false,
        keys: ['name','description','implOf','url']
      })
    };
  },
  watch: {
    async query (query) {
      if (!query) {
        this.games = _games
        return
      }

      this.games = this.fuse.search(query).map(r => r.item)
    }
  }
})
</script>

<style>

:root {
  --accent: chartreuse;
  --bg-page: #eee;
  --bg-card: white;
  --bg-input-text: white;
  --selection-color: var(--accent);
  --selection-text-color: var(--bg-card);
  --text: #35495e;
  --text-subtitle: #526488;
}

html {
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
  background: var(--bg-page);
  caret-color: var(--accent);
  color: var(--text);
}

::selection {
  background-color: var(--selection-color);
  color: var(--selection-text-color);
}

header {
  text-align: center;
  font-size: 2em;
}

.container {
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.search {
  padding: 10px;
  font-size: 1.5em;
}

.search input {
  border-radius: 5px;
  margin-bottom: 10px;
  background: var(--bg-input-text);
  border: none;
  outline: none;
  padding: 10px;
  border-bottom: 2px solid var(--bg-input-text);
  width: 100%;
  text-align: center;
  color: inherit;
}

.search input:focus {
  border-bottom-color: var(--accent);
}

.results ul {
  padding: 0;
  list-style: none;
}

.results ul li {
  margin: 10px;
  box-shadow: 0px 4px 6px 0px rgba(50,50,93,0.11) , 0px 1px 3px 0px rgba(0,0,0,0.08);
  border-radius: 5px;
  background: var(--bg-card);
  padding: 10px;
}

.no-results {
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: var(--text-subtitle);
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
