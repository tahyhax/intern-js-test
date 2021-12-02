<template lang="pug">
.task-from
  h3.task-from__head
    | Create
  .task-form__body
    vee-form(@submit="onSubmit" :validation-schema="schema" :initial-values="task" v-slot="{ errors, isSubmitting, handleReset}" class="form" ref="form" )
      .form__field-wrap
        label.form__label Title
        Field(name="title"  class="form__input" :class="{'form__input--error': errors.title}")
        ErrorMessage(name="title" as="div" class="form__error")
      .form__field-wrap
        label.form__label Date
        Field(name="date"  class="form__input" :class="{'form__input--error': errors.date}" v-slot="{field}")
          input-date-time(name="date" v-bind="field" )
        ErrorMessage(name="date" as="div" class="form__error" :class="{'form__input--error': errors.date}")
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
import { Form as VeeForm, Field, ErrorMessage, FormActions, FormState } from 'vee-validate'
import * as Yup from 'yup'
import AppButton from '@/components/ui/AppButton.vue'
import inputDateTime from '@/components/Form/InputDatePicker.vue'
import { ITasks } from '@/types/tasks'

export default defineComponent({
  name: 'TaskFrom',
  components: {
    AppButton,
    VeeForm,
    Field,
    ErrorMessage,
    inputDateTime
  },
  data () {
    const schema = Yup.object().shape({
      title: Yup.string().required().label('title'),
      text: Yup.string().required().label('text'),
      date: Yup.string().required().nullable().label('date')
    })
    return {
      schema,
      task: {
        title: '',
        text: '',
        date: '',
        status: 'open'
      } as ITasks
    }
  },

  methods: {
    // NOTE как сделать правильно параметр actions
    onSubmit (values:ITasks, actions:FormActions<Partial<FormState<string>>>):void {
      this.$emit('onSubmit', values)
      actions.resetForm()
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
    justify-content: end;
  }

  &__button {
    width: 100px;
    color: $buttonColor;
    margin-right:10px;
  }

  &__label {
    margin: 0 0 5px 10px;
  }

  &__input {
    padding: 5px;
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
