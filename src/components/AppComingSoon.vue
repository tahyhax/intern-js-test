<template lang="pug">
.coming-soon
  p.coming-soon__title Coming Soon
  .coming-soon__description
    slot
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppComingSoon'
})
</script>

<style lang="scss" scoped>
.coming-soon{
  &__title {
    font-size: 2rem;
    margin-bottom: 15px;
  }
}
</style>
