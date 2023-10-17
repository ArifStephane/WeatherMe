<template>
  <!-- <div>
    <p :class="['text-' + textColor]">Hello World</p>
    <button @click="toggleTheme">Toggle Theme</button>
  </div> -->
  <RouterView />
</template>

<script setup lang="ts">
// import { computed } from 'vue';
// import { useStore } from 'vuex';
import { RouterView } from 'vue-router'


 

// const store = useStore();

// const textColor = computed(() => {
//   return store.state.theme === 'dark' ? 'dark-text' : 'light-text';
// });

// const toggleTheme = () => {
//   const newTheme = store.state.theme === 'dark' ? 'light' : 'dark';
//   store.commit('setTheme', newTheme);
//   console.log("rr",newTheme );
  
// };
</script>

<style scoped>

</style>
