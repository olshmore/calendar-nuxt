<template lang="pug">
.nb-popup
  transition(name="fade")
    .popup-overlay(
      v-if="showPopup"
      @click="closePopup()"
    )
      .popup-content(
        :class="classes"
        @click.stop
      )
        .header
          h2.title(v-if="title") {{ title }}
          |
          nuxt-icon.icon(
            name="close"
            @click="closePopup()"
          )
        |
        .slot
          slot
        |
        .popup-actions
          .popup-actions_container
            .btn(
              v-if="id"
              @click="remove()"
            )
              span Delete
            |
            .btn(
              @click="cancel()"
            )
              span Cancel
            |
            .btn(
              @click="ok()"
            )
              span Save
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  showPopup: boolean;
  variant?: string;
  title?: string;
  id?: string;
  okButtonLabel?: string;
  cancelButtonLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showPopup: false,
  variant: "",
  title: "",
  id: "",
  okButtonLabel: "Save",
  cancelButtonLabel: "Cancel"
});

const emit = defineEmits(["update:showPopup", "cancel", "ok", "remove"]);

function closePopup() {
  emit("update:showPopup", false);

  cancel();
}

function cancel() {
  emit("cancel");
}

function ok() {
  emit("ok");
}

function remove() {
  emit("remove");
}

const classes = computed(() => ({
  default: !props.variant,
  small: props.variant === "small",
  large: props.variant === "large",
  auto: props.variant === "auto"
}));
</script>

<style lang="sass">

.popup-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(var(--Rec-Black-rgb, 25, 29, 33), 0.4)
  display: flex
  justify-content: center
  align-items: center
  z-index: 1000

.popup-content
  border-radius: 20px
  background: var(--gray-100)

  .header
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0 16px

    h2.title
      /* H1 */
      font-size: 20px
      font-style: normal
      font-weight: 500
      line-height: 24px

    .icon
      cursor: pointer

  .slot
    padding: 0 16px 32px 16px

  &.default
    min-width: 455px
    height: fit-content

  &.small
    min-height: 556px
    width: 680px
    max-width: 680px

  &.large
    width: calc(100% - 128px - 128px)
    max-width: 1185px
    max-height: calc(100% - 32px)

  &.auto
    max-width: 1185px
    min-height: 524px
    max-height: calc(100% - 28px - 28px)

.popup-actions
  position: relative
  margin-top: auto

  &:before
    content: ""
    position: absolute
    height: 3px
    width: 100%
    margin: auto
    left: 0
    right: 0
    background: #E6E2E1

  &_container
    width: 100%
    display: flex
    justify-content: flex-end
    align-items: center
    padding: 16px
    gap: 8px
    box-sizing: border-box
</style>
