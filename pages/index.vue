<template>
  <div class="index">
    <button @click="toggleDarkMode" id="darkmode-toggle" alt="toggle dark mode">
      <img src="https://icongr.am/fontawesome/moon-o.svg?size=32"/>
    </button>
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
  created() {
    let isDarkMode = false;
    if (process.client) {
      let stored = localStorage.getItem('darkMode');
      if (stored != null) {
        console.log(stored, 'true');
        isDarkMode = stored === 'true';
        console.log(isDarkMode);
      }
      else {
        isDarkMode = !!window.matchMedia("(prefers-color-scheme: dark)");
      }
    }
    if (isDarkMode) {
      document.getElementsByTagName('html')[0]
        .classList.add('dark');
    }
  },
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
    },
    isDarkMode(newVal) {
      document.getElementsByTagName('html')[0]
        .classList.toggle('dark')
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', `${this.isDarkMode}`)
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

.dark {
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
.dark #darkmode-toggle {
  filter: invert(1)
}

#darkmode-toggle {
  background: none;
  border: none;
  outline: none;
  margin: 0 0 0 auto;
  display: block;
  padding: 0;
  opacity: 0.5;
}
#darkmode-toggle:focus {
  opacity: 1;
}
@media screen and (min-width: 600px) {
  #darkmode-toggle:hover {
    opacity: 1;
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
  margin-top: 20px;
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
  background-image: url(https://icongr.am/fontawesome/filter.svg?size=20);
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 10px;
}

.dark .search::before {
  filter: invert(1);
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
  color: var(--text-subtitle);
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
