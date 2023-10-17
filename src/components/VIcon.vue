<template>
    <span>
        <component :is="component" />
    </span>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import ErrorIconVue from "@/components/icons/ErrorIcon.vue";
const prop = defineProps<{ name: string }>();

const component = defineAsyncComponent({
    loader: () => import(`@/components/icons/${prop.name[0].toUpperCase() + prop.name.substring(1)}.vue`),
    errorComponent: ErrorIconVue,
});
</script>
<style></style>
