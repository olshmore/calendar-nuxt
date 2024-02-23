<template lang="pug">
.calendar
  .calendar_actions
    CalendarMonthYearPicker(
      :date="selectedDate"
      @select="selectDate"
    )
    |
    CreateUpdateEvent(
      :event-id="editingEventId"
      @new-event="onEvent()"
      @stop-event="onStopEvent()"
    )
  |
  .calendar_content
    CalendarDays(
      :date="selectedDate"
      :month-dates="monthDates"
      :key="calendarDaysKey"
      @select="selectDate"
      @edit-event="editEvent"
    )
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import { formatDateToString, formatDateToRoute, stringToDateFormat } from "@/utils/formatter";
import { type TDate } from "@/models/event";

const { getEventsForDate } = useEventStore();

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: "Enter date"
  }
});

const selectedDate = ref<Date>(stringToDateFormat(props.modelValue));

let monthDates: TDate[] = reactive([]);

onMounted(() => {
  init();
});

function init() {
  setMonthDays();
}

function setMonthDays() {
  setPreviousMonthDays();
  setCurrentMonthDays();
  setNextMonthDays();
}

const daysCounter = ref(0);

function setPreviousMonthDays() {
  const date = selectedDate.value;

  const daysInPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const firstDayOfMonth = new Date(Date.UTC(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), 1));
  const firstDayOfMonthWeekDay = firstDayOfMonth.getDay() - 1;

  const year = date.getFullYear();
  const month = date.getMonth() - 1;

  for (let i = daysInPreviousMonth - firstDayOfMonthWeekDay + 1; i <= daysInPreviousMonth; i += 1) {
    monthDates.push({
      date: new Date(year, month, i),
      disabled: true,
      events: []
    });

    daysCounter.value += 1;
  }
}

function setCurrentMonthDays() {
  const numOfDays = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth() + 1, 0).getDate();

  for (let i = 0; i < numOfDays; i += 1) {
    const date = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), i + 1);

    monthDates.push({
      date,
      disabled: false,
      events: getEventsForDate(date)
    });

    daysCounter.value += 1;
  }
}

function setNextMonthDays() {
  for (let i = 1; i <= 6 * 7 - daysCounter.value; i += 1) {
    monthDates.push({
      date: new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth() + 1, i),
      disabled: true,
      events: []
    });
  }
}

function resetCurrentMonth() {
  monthDates = [];

  daysCounter.value = 0;

  setMonthDays();
}

async function selectDate(date: Date) {
  selectedDate.value = new Date(date);

  await navigateTo({ path: `/calendar/${formatDateToRoute(selectedDate.value)}`, replace: true });

  resetCurrentMonth();
}

const emit = defineEmits(["update:modelValue"]);

const emitUpdate = () => {
  emit("update:modelValue", formatDateToString(selectedDate.value));
};

watch(() => selectedDate.value, () => { emitUpdate(); });

const calendarDaysKey = ref(0);

function onEvent() {
  resetCurrentMonth();

  calendarDaysKey.value += 1;
}

function onStopEvent() {
  editingEventId.value = "";
}

const editingEventId = ref("");

function editEvent(id: string) {
  editingEventId.value = id;
}
</script>

<style lang="sass" scoped>
.calendar
  padding: 0 16px
  height: 100vh
  display: flex
  flex-flow: column

  &_actions
    flex: 0 1 auto
    display: flex
    align-items: center
    justify-content: space-between

  &_content
    flex: 1 1 auto
    box-sizing: border-box
    font-size: 13px
    width: 100%
    transition: all 0.3s ease
    border: 1px solid var(--gray-200)
    border-radius: 16px
    background: var(--white)
    cursor: pointer
    margin-bottom: 16px
</style>
