<template lang="pug">
.event
  .btn(
    type="button"
    @click="openPopup()"
  )
    span +
  |
  Popup(
    :showPopup.sync="showPopup"
    :title="popupTitle"
    :id="eventId"
    @cancel="closePopup()"
    @ok="onPopupOk()"
    @remove="onPopupRemove()"
  )
    .popup-content
      input(
        v-model="form.dateString"
        name="date"
        placeholder="dd.mm.yyyy"
      )
      |
      input(
        v-model="form.title"
        name="title"
        placeholder="Title"
      )
      |
      input(
        v-model="form.description"
        name="description"
        placeholder="Description"
      )
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { type IEventForm } from "@/models/event";

interface Props {
  eventId: string;
}

const props = withDefaults(defineProps<Props>(), {
  eventId: ""
});

const EMPTY_FORM: IEventForm = {
  dateString: "",
  title: "",
  description: ""
};

const { createEvent, updateEvent, deleteEvent, getEventById } = useEventStore();

let form = reactive<IEventForm>({
  dateString: "",
  title: "",
  description: ""
});

watch(() => props.eventId, (id) => {
  if (!id) { return clearForm(); }

  const event = getEventById(id);

  if (!event) { return; }

  form = { ...event };

  openPopup();
});

const popupTitle = computed(() => props.eventId ? "Edit event" : "Create event");

const emit = defineEmits(["new-event", "stop-event"]);

function clearForm() {
  Object.assign(form, EMPTY_FORM);
}

const showPopup = ref(false);

function openPopup() {
  showPopup.value = true;
}

function closePopup() {
  showPopup.value = false;

  emit("stop-event");

  clearForm();
}

function onPopupOk() {
  props.eventId ? updateEvent({ id: props.eventId, data: form }) : createEvent(form);

  emit("new-event");

  closePopup();
}

function onPopupRemove() {
  if (!props.eventId) { return; }

  deleteEvent(props.eventId);

  emit("new-event");

  closePopup();
}
</script>

<style lang="sass" scoped>
.event
  .btn
    font-size: 20px

  .popup-content
    display: flex
    flex-direction: column
    gap: 8px
</style>
