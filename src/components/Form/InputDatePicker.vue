<template>
<flat-pickr
    v-model="date"
    @onChange="eventChange"
    class="input-date"
    :config="config"
    :placeholder="placeholder"
    :name="name"/>
</template>

<script>
import { defineComponent, ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default defineComponent({
  name: 'InputDateTime',
  components: {
    flatPickr
  },

  props: {
    name: {
      required: true,
      type: String
    },
    placeholder: {
      type: String,
      default: 'Select date'
    }
  },
  setup (props, context) {
    const config = {
      altFormat: 'Y-m-d H:i',
      altInput: true,
      enableTime: true,
      minDate: new Date().toUTCString()
    }
    const date = ref(new Date(context.attrs.modelValue).toUTCString())
    return { config, date }
  },

  methods: {
    focus () {
      this.$refs.input.focus()
    },
    eventChange (selectedDates, dateStr, instance) {
      this.$emit('update:modelValue', dateStr)
    }
  }
})
</script>

<style lang="scss" itemscope>
.input-date {
  padding: 5px;
  border-radius: 10px;
  overflow: hidden;
  outline: none;
  max-width: 100%;
}
</style>
