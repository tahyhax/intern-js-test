<template lang="pug">
vee-form(@submit="onSubmit" :validation-schema="schema" :initial-values="card" v-slot="{ errors, isSubmitting, handleReset}" class="form" ref="form" )
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
      app-button.form__button.button--primary(v-if="!isEditable" @click="editCard") Edit
      app-button.form__button.button--secondary(v-if="isEditable" @click="cancelForm") Cancel
      app-button.form__button.button--primary(v-if="isEdited" :disabled="isSubmitting") Save

</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { ErrorMessage, Field, Form as VeeForm, FormActions, FormState } from 'vee-validate'
import { object as YObject, string as YString } from 'yup'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import inputDateTime from '@/components/Form/InputDatePicker.vue'
import { ITask } from '@/types/task'

export default defineComponent({
  name: 'KanbanCardDetail',
  components: {
    AppModal,
    AppButton,
    VeeForm,
    Field,
    ErrorMessage,
    inputDateTime
  },
  props: {
    card: {
      required: true,
      type: Object as PropType<ITask>
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const isEditable = ref<boolean>(false)

    const cardOldValue = { ...props.card }
    // debugger
    // const isEdited = () => [...Object.keys(props.card)].every(key => {
    //   return JSON.stringify(props.card[key]) !== JSON.stringify(cardOldValue[key])
    // })
    //
    const isEdited = computed(() => { return Object.entries(cardOldValue).sort().toString() !== Object.entries(props.card).sort().toString() })
    const editCard = () => { isEditable.value = true }
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
    const closeModel = () => {
      emit('onCloseForm')
    }
    const cancelForm = () => {
      isEditable.value = false
      // closeModel()
    }
    return { schema, onSubmit, cancelForm, isEditable, isEdited, editCard, cardOldValue }
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
