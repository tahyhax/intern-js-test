<template lang="pug">
.wrapper
  .container
    slot(name='sidebar')
    .main-block
      slot(name='header')
      section.main-block__content
        slot(name='content')
</template>

<script>
import { defineComponent } from 'vue'
import TheSidebar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'

export default defineComponent({
  name: 'TheLayout',
  components: {
    TheSidebar,
    TheHeader
  }
})
</script>

<style lang="scss" scoped>

.wrapper {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  display: flex;
  @media (max-width: 767px) {
    max-width: none;
  }
}

.main-block {
  display: flex;
  flex: 1;
  flex-direction: column;

  &__content {
    background-color: #eeebe5;
    overflow-y: auto;
    height: 100vh;
    @media (min-width: 768px) {
      padding-top: 30px;
      display: flex;
      flex: 1;
      justify-content: center;
    }
  }
}
</style>
