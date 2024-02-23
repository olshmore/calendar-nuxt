<template lang="pug">
.calendar-month-year-picker
  .picker-item.month
    nuxt-icon.icon(
      name="chevron"
      @click="shiftMonth(-1)"
    )
    |
    p {{ selectedMonth.text }}
    |
    nuxt-icon.icon.icon-right(
      name="chevron"
      @click="shiftMonth(1)"
    )
  |
  .picker-item.year
    nuxt-icon.icon(
      name="chevron"
      @click="shiftYear(-1)"
    )
    |
    p {{ selectedYear }}
    |
    nuxt-icon.icon.icon-right(
      name="chevron"
      @click="shiftYear(1)"
    )
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { getMonths } from "@/utils/calendar";

interface Props {
  date: Date;
}

const props = withDefaults(defineProps<Props>(), {
  date: () => new Date()
});

const selectedDate = ref(props.date);

const months = getMonths();

const selectedMonth = computed(() => {
  return {
    value: props.date.getMonth() || months[0].value,
    text: months.find(month => month.value === props.date.getMonth())?.text ?? months[0].text
  };
});

const selectedYear = computed(() => props.date.getFullYear());

const emit = defineEmits(["select"]);

function shiftYear(shiftValue: number) {
  selectedDate.value.setFullYear(props.date.getFullYear() + shiftValue);

  emit("select", new Date(selectedDate.value));
}

function shiftMonth(shiftValue: number) {
  selectedDate.value.setMonth(props.date.getMonth() + shiftValue);

  emit("select", new Date(selectedDate.value));
}
</script>

<style lang="sass" scoped>
.calendar-month-year-picker
  display: flex
  align-items: center
  gap: 20px

  .picker-item
    display: flex
    align-items: center
    justify-content: center

    p
      padding: 12px 16px
      background: var(--white)
      cursor: pointer
      user-select: none
      text-align: center
      font-size: 18px
      font-style: normal
      font-weight: 500
      line-height: 24px
      width: 50px

    .icon
      padding: 8px
      cursor: pointer

      &:hover
        opacity: 0.8
        transition: 0.2s

      &-right
        transform: rotate(180deg)
</style>
