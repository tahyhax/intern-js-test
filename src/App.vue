<template lang="pug">
.wrapper
  .container
    Sidebar(:user='user')/
    .main-block
      Header/
      section.main-block__content
        router-view/

</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Sidebar,
    Header
  },
  data () {
    return {
      user: {
        lastname: 'Jean',
        firstname: 'Gonzales',
        position: 'Product Owner',
        logo: '../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg', // NOTE  how  this  work
        notifications: 3,
        tasks: {
          open: 11,
          complete: 372
        }
      }
    }
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
