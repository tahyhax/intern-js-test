<template lang="pug">
the-layout
  template(v-slot:sidebar)
    the-sidebar(:user='user' @updateTask="updateTask")/
  template(v-slot:header)
    the-header/
  template(v-slot:content)
    router-view(@click="notificationIndex")/
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
  data () {
    return {
      user: {
        lastname: 'Jean',
        firstname: 'Gonzales',
        position: 'Product Owner',
        logo: '../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg', // NOTE  how  this  work
        notifications: 3,
        task: {
          open: 11,
          complete: 372
        }
      }
    }
  },
  methods: {
    updateTask (type: 'complete'|'open') {
      const revertType = type === 'complete' ? 'open' : 'complete'
      const messageConfirm = 'Are you sure you want to change the number of tasks?'
      if (this.validateTask(type)) {
        const messageError = `All tasks are ${revertType} !`
        alert(messageError)
        return false
      }

      if (confirm(messageConfirm)) {
        this.user.task[type]--
        this.user.task[revertType]++
      }
    },
    validateTask (type: 'complete'|'open'):boolean {
      return !this.user.task[type]
    },
    notificationIndex (): void {
      // TODO cant  catch index param from emit
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

</style>
