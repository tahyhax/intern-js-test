<template lang="pug">
.card-status
  .card-status__container
    .card-status__icon(:class="[classIcon]") {{ status }}
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ETaskStatus } from '@/types/task'

export default defineComponent({
  name: 'AppCardStatusIcon',
  props: {
    status: {
      required: true,
      type: String as PropType<ETaskStatus>
    }
  },
  setup (props) {
    const classIcon = computed(() => `card-status__icon--${props.status}`)
    return { classIcon }
  }
})
</script>

<style lang="scss" scoped>
.card-status {
  display: flex;
  justify-content: center;
  border-radius: 0.3em;
  overflow: hidden;
  text-transform: uppercase;

  &__icon {
    padding: 4px 8px;

    &--todo {
      color: gray;
      border: solid 1px gray;
    }

    &--in-progress {
      color: #efc74e;
      border: solid 1px #efc74e;
    }

    &--done {
      color: green;
      border: solid 1px green;
    }
  }
}
</style>
