<template lang="pug">
app-modal(
  :isActive="isActiveForm"
  @onClose="handlerOnCLose"
  )
  template(#header)
    | Create Task
  template(#body)
     vee-form(@submit="onSubmit" :validation-schema="schema" :initial-values="taskTemplate" v-slot="{ errors, isSubmitting, handleReset}" class="form" ref="form" )
        .form__field-wrap
          label.form__label Title
          Field(name="title"  class="form__input" :class="{'form__input--error': errors.title}")
          ErrorMessage(name="title" as="div" class="form__error")
        .form__field-wrap
          label.form__label Date
          Field(name="date"  class="form__input" v-slot="{field}")
            input-date-time(name="date" v-bind="field"  :class="{'form__input--error': errors.date}")
          ErrorMessage(name="date" as="div" class="form__error")
        .form__field-wrap
          label.form__label Text
          Field(name="text" class="form__input"  as="textarea" :class="{'form__input--error': errors.text}")
          ErrorMessage(name="text" as="div" class="form__error")
        .form__actions
            app-button.form__button.button--secondary(@click="handleReset") Reset
            app-button.form__button.button--primary(:disabled="isSubmitting") Create

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ErrorMessage, Field, Form as VeeForm, FormActions, FormState } from 'vee-validate'
import { object as YObject, string as YString } from 'yup'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import inputDateTime from '@/components/Form/InputDatePicker.vue'
import { ETaskStatus, ITask } from '@/types/task'
import { uuid } from '@/utils'

export default defineComponent({
  name: 'TaskFrom',
  components: {
    AppButton,
    AppModal,
    VeeForm,
    Field,
    ErrorMessage,
    inputDateTime
  },
  props: {
    isActiveForm: {
      type: Boolean,
      default: false
    }
  },
  setup: function (props, { emit }) {
    const taskTemplate = {
      _id: uuid(),
      title: '',
      text: '',
      date: '',
      status: ETaskStatus.todo,
      createdAt: new Date().toISOString()
    } as ITask

    const schema = YObject().shape({
      title: YString().required().label('title'),
      text: YString().required().label('text'),
      date: YString().required().nullable().label('date')
    })
    const onSubmit = (values: ITask, actions: FormActions<Partial<FormState<string>>>): void => {
      emit('onSubmit', values)
      actions.resetForm()
      closeModel()
    }
    const closeModel = (): void => {
      emit('onCloseForm')
    }

    const handlerOnCLose = (): void => {
      closeModel()
    }

    return {
      taskTemplate, schema, onSubmit, handlerOnCLose
    }
  }
})
</script>

<style lang="scss" scoped>
$red: #FF0000FF;
$formBackground: #eeebe5;
$buttonColor: #FFFFFF;
.task-from {
  background: $formBackground;
  padding: 15px;
  border-radius: 15px;

  &__head {
    margin-bottom: 15px;
  }

  &__body {
  }
}

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
    margin: 0 0 5px 10px;
  }

  &__input {
    padding: 10px;
    background: #eaeaea;
    border-radius: 10px;
    overflow: hidden;
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
