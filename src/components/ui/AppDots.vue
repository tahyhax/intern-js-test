<template lang="pug">
.dots
  span.dots__item
  span.dots__item
  span.dots__item

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppDots'
})
</script>

<style lang="scss" scoped>
.dots {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;

  &__item {
    height: 4px;
    width: 4px;
    background: #9b9b9b;
    border-radius: 50%;
    display: inline-block;
    margin: 0 1px;
  }
}
</style>
