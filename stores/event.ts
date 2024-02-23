import { ref } from "vue";
import { defineStore } from "pinia";
import { stringToDateFormat, formatDateToString } from "@/utils/formatter";
import { type IEventForm, type IEvent } from "@/models/event";
import { generateUUID } from "@/utils/generateUUID";

const SAMPLE_EVENTS: IEventForm[] = [
  {
    dateString: "23.02.2024",
    title: "Go for a walk",
    description: "Walk the dog"
  },
  {
    dateString: "24.02.2024",
    title: "Go for a walk 2",
    description: "Walk the cat"
  },
  {
    dateString: "25.02.2024",
    title: "Go for a walk 3",
    description: "Walk the hamster"
  }
];

export const useEventStore = defineStore("event", () => {
  const sampleEvents = SAMPLE_EVENTS.map(event => ({
    ...event,
    date: stringToDateFormat(event.dateString),
    id: generateUUID()
  }));

  const events = ref<IEvent[]>(sampleEvents);

  function getEventById(id: string): IEvent | null {
    return events.value.find(event => event.id === id) ?? null;
  }

  function createEvent(event: IEventForm) {
    events.value.push({
      ...event,
      date: stringToDateFormat(event.dateString),
      id: generateUUID()
    });
  }

  function updateEvent({ id, data }: { id: string, data: IEventForm }) {
    const event = getEventById(id);

    if (!event) { return; };

    Object.assign(event, data);
  }

  function deleteEvent(id: string) {
    events.value = events.value.filter(event => event.id !== id);
  }

  function getEventsForDate(date: Date): IEvent[] {
    return events.value.filter(event => event.dateString === formatDateToString(date));
  }

  return {
    events,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate
  };
});
