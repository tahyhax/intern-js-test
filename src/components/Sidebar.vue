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
      .user-info__logo.logo.logo--big
        img(src="../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg" alt="Jean Gonzales")
      .user-info__about-text
        p.user-info__text--fname {{ fullname }}
        p.user-info__text--job {{ user.position }}
    .user-info__dots
      <Dots/>
  .sidebar__tasks
    .sidebar__tasks-item
      p.sidebar__tasks-title(@click="updateCompletedTasks") {{ user.tasks.complete }}
      p.sidebar__tasks-subtitle
        | Completed Tasks
    .sidebar__tasks-item
      p.sidebar__tasks-title(@click="updateOpenTasks") {{ user.tasks.open }}
      p.sidebar__tasks-subtitle
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
import { defineComponent } from 'vue'
import Dots from '@/components/Dots.vue'

export default defineComponent({
  name: 'Sidebar',
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  components: { Dots },
  computed: {
    fullname (): string {
      return `${this.user.lastname}  ${this.user.firstname}`
    }
  },

  methods: {
    updateCompletedTasks (): void {
      this.$emit('updateTasks', 'complete')
    },
    updateOpenTasks (): void {
      this.$emit('updateTasks', 'open')
    }
  }

})
</script>

<style lang="scss" scoped>

.logo {
  border-radius: 50%;
  overflow: hidden;

  width: 25px;
  height: 25px;
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }

  &__link {
  }

  img {
    width: 100%;
    height: 100%;
  }

  &--big {
    width: 50px;
    height: 50px;
  }
}

.sidebar-container {
  width: 270px;
  padding: 30px 0;
}

.sidebar {
  min-height: 100%;
  font-size: 14px;
  color: #ffffff;

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
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    width: 40%;
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

.burger {
  position: relative;
  display: block;
  padding: 10px 10px;
  background-color: #f2f2f2;
  border-radius: 50%;
  z-index: 100;
  @media (min-width: 767px) {
    display: none;
  }

  &--active {
    top: 3px;
  }

  &--active & {
    &__item {
      background: transparent;
    }

    &__item::after {
      transform: translateY(-8px) rotate(-45deg);
    }

    &__item::before {
      transform: translateY(8px) rotate(45deg);
    }
  }

  &__item {
    position: relative;
    margin-top: 8px;
    margin-bottom: 8px;

    &,
    &::after,
    &::before {
      display: block;
      width: 20px;
      height: 2px;
      background-color: #222;
      transition-property: background-color, transform;
      transition-duration: 0.3s;
    }

    &::after,
    &::before {
      position: absolute;
      content: "";
    }

    &::after {
      top: 8px;
    }

    &::before {
      top: -8px;
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
