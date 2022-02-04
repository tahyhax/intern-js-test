<template lang="pug">
vee-form(@submit="onSubmit" :validation-schema="schema" :initial-values="task" v-slot="{ errors, isSubmitting, handleReset, meta}" class="form" ref="form" )
  .form__field-wrap
    label.form__label Title
    Field(
      name="title"
      v-slot="{field, handleChange}"
      :class="{'form__input--error': errors.title}"
     )
      input.form__input(
        v-bind="field"
        placeholder="Title"
        :readonly="!isEditable"
        @change="handleChange"
      )
    ErrorMessage(
      name="title"
      as="div" class="form__error"
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
        :isDisabled="!isEditable"
        :class="{'form__input--error': errors.date}"
      )
    ErrorMessage(name="date" as="div" class="form__error")
  .form__field-wrap
    label.form__label Text
    Field(
      name="text"
      class="form__input"
      as="textarea"
      :readonly="!isEditable"
      placeholder="Text"
      :class="{'form__input--error': errors.text}"
    )
    ErrorMessage(name="text" as="div" class="form__error")
  .form__actions
      app-button.form__button.button--primary(v-if="!canEdit && !!task._id" @click="editCard" type="button") Edit
      app-button.form__button.button--secondary(v-if="canEdit" @click="cancelForm" type="button") Cancel
      app-button.form__button.button--primary(v-if="(meta.dirty && canEdit) || !task._id" :disabled="isSubmitting") Save

</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate'
import { object as YObject, string as YString } from 'yup'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import inputDateTime from '@/components/Form/InputDatePicker.vue'
import { ETaskStatus, ITask } from '@/types/task'

export default defineComponent({
  name: 'TaskCardDetail',
  components: {
    AppModal,
    AppButton,
    VeeForm,
    Field,
    ErrorMessage,
    inputDateTime
  },
  props: {
    task: {
      required: true,
      type: Object as PropType<ITask>
    }
  },
  setup (props, { emit }) {
    const { task } = toRefs(props)
    const canEdit = ref<boolean>(false)
    const isEditable = computed(() => canEdit.value || !task.value._id)
    const editCard = () => { canEdit.value = true }
    const cancelForm = () => {
      canEdit.value = false
    }
    const schema = YObject().shape({
      title: YString().required().label('title'),
      text: YString().required().label('text'),
      date: YString().required().nullable().label('date')
    })
    const onSubmit = (values: ITask): void => {
      const data = task.value._id ? { ...values, _id: task.value._id } : { ...values, status: ETaskStatus.todo }
      emit('onSubmit', data)
    }

    return { schema, onSubmit, cancelForm, isEditable, canEdit, editCard }
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
    //overflow: hidden;
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
