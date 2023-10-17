<template>
  <button @click="toggleTheme" :class="['text-' + textColor]">{{ store.state.theme === 'dark' ? 'Light' : 'Dark' }} Mode</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const textColor = computed(() => {
  return store.state.theme === 'dark' ? 'dark-text' : 'light-text';
});

const toggleTheme = () => {
  const newTheme = store.state.theme === 'dark' ? 'light' : 'dark';
  store.commit('setTheme', newTheme);
  console.log("rr",newTheme );
  

//   if (store.state.theme === 'dark' || ( store.state.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)){
//      document.documentElement.classList.add('dark')
//   }else{
//     document.documentElement.classList.remove('dark')
//   }
};
</script>

 