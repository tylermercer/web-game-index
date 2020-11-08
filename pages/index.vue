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
            <div class="game">
              <a class="title" :href="game.url" rel="noreferrer nofollow">{{ game.name }}</a>
              <span class="subtitle" v-if="game.implOf">based on {{game.implOf}}</span>
              <span class="description" v-if="game.description">{{ game.description }} </span>
            </div>
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
        // shouldSort: false,
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
  --accent: #00aa00;
  --bg-page: white;
  --bg-card: white;
  --bg-input-text: white;
  --border-card: var(--text);
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
  color: var(--text);
}

a {
  color: var(--accent);
}

* {
  box-sizing: border-box;
}

::selection {
  background-color: var(--selection-color);
  color: var(--selection-text-color);
}

header {
  text-align: center;
  font-size: 2em;
  color: var(--accent);
}

.container {
  display: flex;
  flex-direction: column;
}

.search {
  margin: 0 auto;
  width: 400px;
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
  border: 2px solid var(--border-card);
  width: 100%;
  text-align: center;
  color: inherit;
}

.search input:focus {
  border-color: var(--accent);
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
}

.game {
  border-radius: 5px;
  background: var(--bg-card);
  border: 2px solid var(--border-card);
  padding: 10px;
  width: 300px;
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
  color: #888;
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
