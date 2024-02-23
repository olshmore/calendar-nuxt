<template lang="pug">
.app
  NuxtLink(to=`/calendar/${todayRoute || "2024/02/23"}`) Open calendar
</template>

<script setup lang="ts">
import { formatDateToRoute } from "@/utils/formatter";

const todayRoute = ref(formatDateToRoute(new Date()));
</script>

<style lang="sass" scoped>
.app
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  background: var(--background)
</style>
