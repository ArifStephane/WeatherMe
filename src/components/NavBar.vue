<template>
  <div class="bg-primary text-text-primary">
    <div class="flex justify-between items-center px-4">
      <div class="">
        <VIcon name="Logo" class=""></VIcon>
        <p class="flex justify-end font-bold text--[18px]">{{ date }}</p>
      </div>
   
         <!-- <div class="px-2 font-bold  rounded-xl h-12 flex items-center" @click="toggleTheme()" :class="['bg-red-800 text-white']">
          {{ store.state.theme === 'dark' ? 'Light' : 'Dark' }} Mode
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue'



import { useDark, useToggle } from '@vueuse/core'


defineProps<{
 
  date?: string
 
}>();

 
</script>

<style scoped></style>
