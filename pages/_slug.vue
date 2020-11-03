<template>
  <article>
    <h1>{{name}}</h1>
    <p v-if="implOf">Clone of {{implOf}}</p>
    <p>{{description}}</p>
    <p><a :href="url" target="_blank" rel="noreferrer nofollow">Launch</a></p>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData(context) {
    console.log(context.params.slug);
    const game = await (context as any).$content(context.params.slug).fetch();
    console.log(game);
    return { ...game }
  }
})
</script>

<style scoped>

</style>