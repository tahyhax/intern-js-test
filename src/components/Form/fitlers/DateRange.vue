<template lang="pug">
.date-range
  flat-pickr(
    v-model="date"
    class="date-range__calendar"
    :placeholder="placeholder"
    :name="name"
    :config="config"
    @onClose ="eventChange"
  )
</template>

<script>
import { defineComponent, toRef } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default defineComponent({
  name: 'DateRange',
  components: {
    flatPickr
  },

  props: {
    modelValue: {
      required: true,
      type: Array
    },
    name: {
      required: true,
      type: String
    },
    placeholder: {
      type: String,
      default: 'Select date range'
    },
    defaultDate: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const {
      modelValue: date,
      defaultDate
    } = toRef(props)
    const config = {
      mode: 'range',
      wrap: true,
      altFormat: 'Y-m-d',
      dateFormat: 'Y-m-d',
      altInput: true,
      allowInput: false,
      defaultDate
    }
    const eventChange = (selectedDates) => {
      emit('update:modelValue', selectedDates)
    }
    return {
      config,
      date,
      eventChange
    }
  }
})
</script>

<style lang="scss" itemscope>
.date-range {
  display: flex;
  justify-content: center;
  align-items: center;

  &__calendar {
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    outline: none;
    max-width: 100%;
    background: #eaeaea;
  }
}
</style>
