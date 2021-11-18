<template lang="pug">
ul.nav
  li.nav__item
    router-link( class="nav__link"
                 :to={name:'Tasks'}
                 active-class="nav__link--active")
      | Tasks
  li.nav__item
    router-link(class="nav__link"
                :to="{name:'Kanban'}"
                active-class="nav__link--active")
      | Kanban
  li.nav__item
    router-link(class="nav__link"
                 :to="{name:'Activity'}"
                 active-class="nav__link--active")
      | Activity
  li.nav__item
    router-link(class="nav__link"
      :to="{name:'Calendar'}"
      active-class="nav__link--active")
      | Calendar
  li.nav__item
    router-link(class="nav__link"
      :to="{name:'Files'}"
      active-class="nav__link--active")
      | Files
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheHeaderNavigation'
})
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  background: #fff;
  padding-bottom: 15px;
  @media (max-width: 767px) {
    justify-content: flex-start;
  }

  &__item {
    margin-right: 15px;
    @media (min-width: 767px) {
      margin-right: 30px;
    }
  }

  &__link {
    position: relative;
    opacity: 0.7;
    color: #131313;
    font-size: 17px;
    @media (min-width: 767px) {
      font-size: 16px;
    }

    &:hover,
    &--active {
      opacity: 1;
      transition: 0.2s linear;

      &::after {
        position: absolute;
        content: "";
        left: 0;
        bottom: -15px;
        width: 100%;
        height: 2px;
        background-color: #ffc445;
      }
    }
  }

  &__section {
    background-color: #eeebe5;
    padding-top: 30px;
  }

  &__body {
    display: none;
    max-width: 730px;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;

    &--active {
      display: flex;
    }
  }
}
</style>
