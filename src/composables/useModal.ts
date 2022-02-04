import { ref } from 'vue'

export default function useModal () {
  const isActiveForm = ref<boolean>(false)
  const isTaskShow = ref<boolean>(false)
  const handlerOpenForm = () => {
    isActiveForm.value = true
  }
  const handlerCloseForm = (): void => {
    isActiveForm.value = false
  }
  return { isActiveForm, handlerOpenForm, handlerCloseForm }
}
