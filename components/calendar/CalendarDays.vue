<template lang="pug">
.calendar-days
  .cell.month(
    v-for="(weekDay, index) in weekDays"
    :key="index"
  ) {{ weekDay }}
  |
  .cell.date(
    v-for="(monthDate, index) in monthDates"
    :key="index"
    :class="getCellClasses(monthDate)"
    @click="selectDay($event, monthDate)"
  ) {{ monthDate.date.getDate() }}
    .events
      .event(
        v-for="event in monthDate.events"
        :key="event.id"
        @click.stop.prevent="editEvent(event.id)"
      ) {{ event.title }}
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getWeekDayNames } from "@/utils/calendar";
import { type TDate } from "@/models/event";

const CLASS_NAMESPACE = "date";

interface Props {
  date: Date;
  monthDates: TDate[]
}

const props = withDefaults(defineProps<Props>(), {
  date: () => new Date(),
  monthDates: () => []
});

const selectedDate = ref(props.date);

const weekDays = getWeekDayNames();

function getCellClasses(day: TDate) {
  const isSelected = selectedDate.value.toLocaleDateString() === day.date.toLocaleDateString();

  return {
    [`${CLASS_NAMESPACE}_selected`]: isSelected,
    [`${CLASS_NAMESPACE}_disabled`]: day.disabled
  };
}

const emit = defineEmits(["select", "edit-event"]);

function selectDay(event: PointerEvent, day: TDate) {
  event.stopPropagation();

  selectedDate.value = day.date;

  emit("select", selectedDate.value);
}

function editEvent(id: string) {
  emit("edit-event", id);
}
</script>

<style lang="sass" scoped>
.calendar-days
  height: 100%
  display: grid
  grid-template-columns: repeat(7, 1fr)
  grid-auto-rows: minmax(30px, auto)
  text-align: center
  font-weight: 400
  font-size: 15px

  .cell
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    border-radius: 8px
    border-top: 0.5px solid var(--gray-200)
    border-left: 0.5px solid var(--gray-200)
    color: var(--gray-300)
    font-size: 12px
    font-style: normal
    font-weight: 500
    user-select: none

  .month
    color: var(--green)
    font-weight: 500
    font-size: 12px
    border: none

  .date
    &:hover
      background: var(--gray-100)
      cursor: pointer

    &_selected
      background: var(--green)
      color: var(--white)

      &:hover
        background: var(--green)

    &_disabled
      color: var(--gray-200)
      background: var(--gray-100)
      opacity: 0.8
      z-index: 0

  .event
    position: relative
    width: fit-content
    padding-left: 16px
    z-index: 10

    &:before
      content: ""
      position: absolute
      height: 8px
      width: 8px
      border-radius: 50%
      margin: auto
      left: 0
      top: 0
      bottom: 0
      background: var(--purple)
</style>
