<template>
  <div class="bg-bg-primary text-text-primary">
    <div class="flex justify-between items-center px-4">
      <div class="">
        <VIcon name="Logo"></VIcon>
        <p class="flex justify-end font-bold text-xl">{{ date }}</p>
      </div>
   
      <!-- <VPanel></VPanel> -->
         <div class="px-2 font-bold  rounded-xl h-12 flex items-center" @click="toggleTheme()" :class="['bg-red-800 text-white']">
          {{ store.state.theme === 'dark' ? 'Light' : 'Dark' }} Mode
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue'
import { useStore } from 'vuex'



import { useDark, useToggle } from '@vueuse/core'
import VPanel from '@/components/VPanel.vue'


defineProps<{
 
  date?: string
 
}>();
const store = useStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)
const toggleThem = () => {
    const newTheme = store.state.theme === 'dark' ? 'light' : 'dark'
    store.commit('setTheme', newTheme)
  }

function toggleTheme() {
 toggleThem();
  toggleDark()
}
</script>

<style scoped></style>
