<template lang="pug">
header.header
  .header__logo-action
    .header__logo
      #burger.burger
        .burger__item
      .header__logo-icon
        img( width="40" height="40" src="~@/assets/Shapes@2x.png" alt='Website Redesign')
      h2.header__logo-title
        | W
        span
          | ebsite &nbsp;
        | R
        span
          | edesign
      .header__logo-button
        app-dots/
    .header__action.header-action
      ul.header-action__avatar
        li.header-action__avatar-item
          app-avatar.logo
            a.logo__link(href="#")
              img( src="../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg" alt="avatar")
        li.header-action__avatar-item
          app-avatar.logo
            a.logo__link( href="#")
              img( src="../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg" alt="avatar")
        li.header-action__avatar-item
          app-avatar.logo
            a.logo__link(href="#")
              img( src="../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg" alt="avatar")
      .header-action__button
        app-button.header-action__button-item( name='share')
          | S
          span
            | hare
        app-button.button--chat(name='chat')
          i.button__icon.ico.ico--chat
          span
            | Chat
  .header__nav
    the-header-navigation/
</template>

<script>
import { defineComponent } from 'vue'
import AppDots from '@/components/ui/AppDots.vue'
import TheHeaderNavigation from '@/components/TheHeaderNavigation.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAvatar from '@/components/ui/AppAvatar.vue'

export default defineComponent({
  name: 'TheHeader',
  components: { AppButton, AppAvatar, AppDots, TheHeaderNavigation }
})
</script>

<style lang="scss" scoped>

.header {
  background-color: #fff;
  padding: 15px 15px 0;

  @media (min-width: 768px) {
    padding: 40px 30px 0;
  }

  &__logo-action {
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__logo {
    display: flex;
    align-items: center;
  }

  &__nav {
  }

  &__logo-icon {
    background-color: #ffc445;
    border-radius: 10px;
    @media (max-width: 767px) {
      display: none;
    }
  }

  &__logo-title {
    font-size: 25px;
    color: #131313;
    margin-left: 5px;
    @media (min-width: 767px) {
      margin-left: 15px;
      font-size: 32px;
    }

    > span {
      @media (max-width: 1023px) {
        display: none;
      }
    }
  }

  &__logo-button {
    margin-left: 10px;
    width: 30px;
    height: 30px;
    background: gray;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    background-color: #eaeaea;

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__action {
    display: flex;
    align-items: center;
  }
}

.header-action {
  &__avatar {
    display: flex;
    margin-right: 10px;
    @media (min-width: 767px) {
      margin-right: 15px;
    }
  }

  &__avatar-item {
    margin-left: 5px;
  }

  &__button {
    display: flex;
    justify-content: center;
  }

  &__button-item {
    margin-right: 5px;
    @media (min-width: 767px) {
      margin-right: 15px;
    }
  }
}

.ico {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;

  &--chat {
    background-image: url("../assets/Combined_Shape@1x.svg");
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

</style>
