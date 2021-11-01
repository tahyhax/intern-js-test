<template>
  <header class="header">
    <div class="header__logo-action">
      <div class="header__logo">
        <div id="burger" class="burger">
          <div class="burger__item"></div>
        </div>
        <div class="header__logo-icon">
          <img width="40" height="40" src="../assets/Shapes@2x.png" alt='Website Redesign'>
        </div>
        <h2 class="header__logo-title">W<span>ebsite</span> R<span>edesign</span>
        </h2>
        <div class="header__logo-button">
          <Dots/>
        </div>
      </div>
      <div class="header__action header-action">
        <ul class="header-action__avatar">
          <li class="header-action__avatar-item logo">
            <a href="#" class="logo__link">
              <img src="../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg" alt="avatar">
            </a>
          </li>
          <li class="header-action__avatar-item logo">
            <a href="#" class="logo__link">
              <img src="../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg" alt="avatar">
            </a>
          </li>
          <li class="header-action__avatar-item logo">
            <a href="#" class="logo__link">
              <img src="../assets/images/8081b26e05bb4354f7d65ffc34cbbd67.jpeg" alt="avatar">
            </a>
          </li>
        </ul>
        <div class="header-action__button">
          <button name='share' class="button header-action__button-item">S <span>hare</span>
          </button>
          <button name='chat' class="button button--chat"><i
            class="button__icon ico ico--chat"></i>
            <span>Chat</span></button>
        </div>
      </div>
    </div>
    <div class="header__nav">
      <Header-Navigation/>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue'
import Dots from '@/components/Dots.vue'
import HeaderNavigation from '@/components/HeaderNavigation.vue'

export default defineComponent({
  name: 'Header',
  components: { Dots, HeaderNavigation }
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

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #eaeaea;
  font-size: 14px;
  color: #131313;
  padding: 0;
  border-radius: 50%;

  @media (min-width: 767px) {
    border-radius: 15px;
    padding: 7px 15px;
    width: 100%;
    height: 100%;
  }

  > span {
    @media (max-width: 767px) {
      display: none;
      font-weight: bold;
    }
  }

  &__icon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }

  &--chat {
    color: #ffc200;
    background: #fff8dd;
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

</style>
