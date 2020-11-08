<template>
  <div class="index">
    <header>
      The Mercer Brothers' Magnificent Web Game Index
    </header>
    <section class="intro">
      <p>
        This is a list of web-based games you can play with your friends. All the games linked here are free to play and don't require an account.
      </p>
      <p>
        Built with 🧀 by <a href="https://github.com/tylermercer">Tyler Mercer</a> and <a href="https://github.com/drmercer">Dan Mercer</a>.
      </p>
    </section>
    <div class="container">
      <div class="search-container">
        <label for="search" class="search">
          <input v-model="query" id="search" type="search" autocomplete="off" placeholder="Filter games" />
        </label>
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
  --accent: #FFBB00;
  --bg-page: white;
  --bg-card: white;
  --bg-input-text: white;
  --border-card: var(--text-high-contrast);
  --selection-color: var(--accent);
  --selection-text-color: var(--bg-card);
  --text: #35495e;
  --text-high-contrast: black;
  --text-subtitle: #526488;
}

@media (prefers-color-scheme: dark) {
  :root {
    --accent: #DDA200;
    --bg-page: #111;
    --bg-card: #111;
    --bg-input-text: #111;
    --border-card: var(--text-high-contrast);
    --selection-color: var(--accent);
    --selection-text-color: var(--bg-card);
    --text: #eee;
  --text-high-contrast: white;
    --text-subtitle: #ddd;
  }
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
  color: var(--text-high-contrast);
}

* {
  box-sizing: border-box;
}

::selection {
  background-color: var(--selection-color);
  color: var(--selection-text-color);
}

header {
  margin-top: 40px;
  text-align: center;
  font-size: 2em;
  color: var(--text-high-contrast);
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 4px;
  padding: 20px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
}

.intro {
  max-width: 900px;
  padding: 0 40px;
  margin: 40px auto;
}

.intro a {
  text-decoration-color: var(--accent);
  text-decoration-thickness: 1.5px;
}

.intro p:not(:last-child) {
  margin-bottom: 1em;
}

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

.search-container .search {
  border-radius: 5px;
  margin-bottom: 10px;
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

.search input {
  border: none;
  outline: none;
  background-color: transparent;
}

.search:focus-within {
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
