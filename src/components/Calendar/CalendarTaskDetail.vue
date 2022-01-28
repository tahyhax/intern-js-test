<template lang="pug">
vee-form(:initial-values="card" class="form")
  .form__field-wrap
    label.form__label Title
    Field(
      name="title"
      v-slot="{field}"
     )
      input.form__input(
        v-bind="field"
        :readonly="true"
      )
  .form__field-wrap
    label.form__label Date
    Field(
      name="date"
      class="form__input"
      v-slot="{field}"
    )
      input-date-time(
        name="date"
        v-bind="field"
        isDisabled="true"
      )
  .form__field-wrap
    label.form__label Text
    Field(
      name="text"
      class="form__input"
      as="textarea"
      :readonly="true"
    )
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Field, Form as VeeForm } from 'vee-validate'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import inputDateTime from '@/components/Form/InputDatePicker.vue'
import { ITask } from '@/types/task'

export default defineComponent({
  name: 'CalendarTaskDetail',
  components: {
    AppModal,
    AppButton,
    VeeForm,
    Field,
    inputDateTime
  },
  props: {
    card: {
      required: true,
      type: Object as PropType<ITask>
    }
  }

})
</script>

<style lang="scss" scoped>
$red: #FF0000FF;
$formBackground: #eeebe5;
$buttonColor: #FFFFFF;
.form {

  &__field-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__button {
    width: 100px;
    color: $buttonColor;
    margin-right: 10px;
  }

  &__label {
    color: #000000;
    margin: 0 0 5px 10px;
  }

  &__input {
    padding: 10px;
    background: #eaeaea;
    border-radius: 10px;
    outline: none;
    max-width: 100%;

    &--error {
      border: 1px solid $red;
    }
  }

  &__error {
    font-size: 13px;
    color: $red;
    margin: 5px 0 0 5px;
  }
}
</style>
