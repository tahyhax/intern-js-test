<template lang="pug">
the-layout
  template(v-slot:sidebar)
    the-sidebar(v-show="isActiveSidebar")/
  template(v-slot:header)
    the-header(v-model="isBurgerActive")/
  template(v-slot:default)
    router-view/

</template>

<script lang="ts">
import { computed, ref, defineComponent, onUnmounted } from 'vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import TheHeader from '@/components/TheHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    TheLayout,
    TheSidebar,
    TheHeader
  },
  setup () {
    const BURGER_BREAKPOINT = 767
    const isBurgerActive = ref<boolean>(false)
    const clientWidth = ref<number>(window.innerWidth)
    const isActiveSidebar = computed(() => { return (clientWidth.value < BURGER_BREAKPOINT && isBurgerActive.value) || clientWidth.value >= BURGER_BREAKPOINT })

    window.addEventListener('resize', handleResize)
    function handleResize () {
      clientWidth.value = window.innerWidth
    }
    onUnmounted(() => { window.removeEventListener('resize', handleResize) })

    return { isBurgerActive, isActiveSidebar, clientWidth }
  }

})
</script>
<style lang="scss">
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

ul,
ol,
li {
  list-style: none;
}

img {
  vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: inherit;
  font-style: inherit;
}

html,
body {
  height: 100%;
  line-height: 1;
  font-size: 16px;
  background-color: #000000;
  font-family: Helvetica, sans-serif;
}

</style>
