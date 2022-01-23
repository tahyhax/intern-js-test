<template lang="pug">
aside#sidebar.sidebar.sidebar-container
    .sidebar__logo-search.logo-search
      .logo-search__logo
        img.logo-search__logo-img(src="../assets/Logo@3x.svg" alt="sidebar-logo")
        h1.logo-search__logo-title
          | Projectus
      form.logo-search__search
        .logo-search__search-icon
          button.logo-search__search-button( name="search")
            img( src="../assets/Search@3x.svg" alt="search")
        input.logo-search__search-input.logo-search__search-input--hidden(type="text" placeholder="Search")
    div.sidebar__user-info.user-info
      .user-info__about
        app-avatar.user-info__logo.logo--big
          img(src="../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg" alt="Jean Gonzales")
        .user-info__about-text
          p.user-info__text--fname {{ fullName }}
          p.user-info__text--job {{ user.position }}
      .user-info__dots
        app-dots/
    .sidebar__tasks
      .sidebar__tasks-item
        p.sidebar__tasks-title(@click="updateTask('complete')") {{ user.task.complete }}
        p.sidebar__tasks-subtitle
          | Completed Tasks
      .sidebar__tasks-item
        p.sidebar__tasks-title(@click="updateTask('open')") {{ user.task.open }}
        p.sidebar__tasks-subtitle(@click="($router.push({name:'Tasks'}))")
          | Open Tasks
    .sidebar__menu
      nav.menu
        p.menu__header Menu
        ul.menu__body
          li.menu__item
            a.menu__link(href="#") Home
          li.menu__item
            a.menu__link(href="#") My Tasks
          li.menu__item
            a.menu__link(href="#") Notifications
            span.menu__item-count
              span {{ user.notifications }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import AppDots from '@/components/ui/AppDots.vue'
import AppAvatar from '@/components/ui/AppAvatar.vue'
import { useStore } from 'vuex'
import { userMutationTypes } from '@/store/modules/user'

export default defineComponent({
  name: 'TheSidebar',
  components: {
    AppAvatar,
    AppDots
  },
  setup: function () {
    const store = useStore()
    const user = computed(() => store.state.user.user)
    const fullName = computed(() => store.getters['user/fullName'])
    const updateTask = (type: 'complete' | 'open') => {
      const revertType = type === 'complete' ? 'open' : 'complete'
      const messageConfirm = 'Are you sure you want to change the number of tasks?'
      if (validateTask(type)) {
        const messageError = `All tasks are ${revertType} !`
        alert(messageError)
        return false
      }
      if (confirm(messageConfirm)) {
        store.commit(userMutationTypes.CALCULATE_TASK_INFO, { type, revertType })
      }
    }
    const validateTask = (type: 'complete' | 'open'): boolean => {
      return !user.value.task[type]
    }

    return {
      user,
      fullName,
      updateTask
    }
  }

})
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 270px;
  padding: 30px 0;
}

.sidebar {
  min-height: 100%;
  font-size: 14px;
  color: #ffffff;
  z-index: 1;

  &--active {
    z-index: 1;
  }

  &__logo-search {
    margin-bottom: 30px;
  }

  &__user-info {
    margin-bottom: 20px;
  }

  &__tasks {
    display: flex;
    margin-bottom: 30px;
    padding: 0 20px 0 30px;
  }

  &__tasks-item {
    @media (min-width: 767px) {
      cursor: pointer;
    }

    &:last-child {
      margin-left: 20px;
    }
  }

  &__tasks-title {
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 2px;
  }

  &__tasks-subtitle {
    opacity: 0.5;
    font-size: 12px;
  }

  &__menu {
    padding: 0 30px;
  }

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    &--active {
      display: block;
      width: 75%;
    }
  }
  @media (max-width: 367px) {
    &--active {
      display: block;
      width: 100%;
    }
  }
}

.logo-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 30px;

  &__logo {
    display: flex;
    align-items: center;
  }

  &__logo-img {
    margin-right: 15px;
  }

  &__logo-title {
    font-size: 16px;
    color: #ffffff;
    text-transform: uppercase;
  }

  &__search {
    display: flex;
    align-items: center;
  }

  &__search-icon {
    &--hidden {
      display: none;
    }
  }

  &__search-button {
    background-color: transparent;
    cursor: pointer;
  }

  &__search-input {
    width: 100%;
    padding: 5px;
    border-radius: 15px;
    margin-left: 5px;

    &--hidden {
      display: none;
    }
  }
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #202020;
  padding: 16px 20px 16px 30px;

  &__about {
    display: flex;
    justify-content: space-between;
  }

  &__about-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  }

  &__logo {
  }

  &__text {
    display: flex;
    flex-direction: row;

    &--fname {
      font-size: 14px;
      color: #ffffff;
      margin-bottom: 2px;
    }

    &--job {
      font-size: 12px;
      color: #9b9b9b;
    }

    &__dots {
    }
  }
}

.menu {
  &__header {
    text-transform: uppercase;
    font-size: 12px;
    color: #878787;
    margin-bottom: 20px;
  }

  &__body {
  }

  &__item {
    margin-bottom: 15px;
  }

  &__link {
    color: #ffffff;
    font-size: 14px;
    transition: 0.2s linear;

    &:hover {
      opacity: 0.5;
    }
  }

  &__item-count {
    background-color: #ffc200;
    font-size: 13px;
    color: #131313;
    border-radius: 50%;
    padding: 2px 6px;
    margin-left: 10px;
  }
}

</style>
