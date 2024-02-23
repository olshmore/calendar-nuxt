<template lang="pug">
Calendar(
  v-model="selectedDate"
)
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const year = ref(route.params.year);
const month = ref(route.params.month);
const day = ref(route.params.day);

const selectedDate = ref(`${day.value}.${month.value}.${year.value}`);
</script>
