<template>
  <div class="main-block">
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

            <div class="dots">
              <span class="dots__item"></span>
              <span class="dots__item"></span>
              <span class="dots__item"></span>
            </div>
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
        <ul class="nav">
          <li class="nav__item">
            <router-link class="nav__link"
                         :to="{name:'Tasks'}"
                         tag="nav__link--active"
            >Tasks</router-link>
          </li>
          <li class="nav__item"><a href="#" class="nav__link">Kanban</a></li>
          <li class="nav__item"><a href="#" class="nav__link nav__link--active">Activity</a></li>
          <li class="nav__item"><a href="#" class="nav__link">Calendar</a></li>
          <li class="nav__item"><a href="#" class="nav__link">Files</a></li>
        </ul>
      </div>
    </header>
    <section class="main-block__content">
      <div class="chat">
        <header class="chat__header">
          <h3>Today</h3>
        </header>
        <div class="chat__body">
          <div class="chat__message" v-for="(activity, key) in activities"
               :key="key"
               :class="{'chat__message--answer': activity.type === 'answer'}">
            <template v-if="activity.type !== 'answer'">
              <div class="chat__message-icon" :class="'chat__message-icon--' + activity.type">
                <img src="@/assets/Icon@3x.svg">
              </div>
            </template>
            <div class="chat__message-body">
              <div class="chat__message-content">
                <div class="chat__message-text">
                  <p> {{ activity.text }}</p>
                </div>
                <template v-if="activity.attachments">
                  <div class="chat__message-attachment" >
                    <a class="chat__message-attachment-item" href="#" v-for="(attachment, key) in activity.attachments" :key="key">
                      <img :src="attachment.src" :alt="attachment.description" data-key="0">
                    </a>
                  </div>
                </template>
              </div>
              <div class="chat__message-time">{{ activity.created }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      // user: {
      //   lastname: 'Jean',
      //   firstname: 'Gonzales',
      //   position: 'Product Owner',
      //   notifications: 3,
      //   tasks: {
      //     open: 11,
      //     complited: 372
      //   }
      // },
      activities: [
        {
          text: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
          type: 'complete',
          created: '8:40 PM'
        },
        {
          text: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          type: 'message',
          created: '7:32 PM'
        },
        {
          text: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
          type: 'answer',
          created: ''
        },
        {
          text: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
          type: 'attachment',
          created: '',
          attachments: [
            {
              src: 'https://via.placeholder.com/100?text=Image 1',
              description: 'Image 1'
            },
            {
              src: 'https://via.placeholder.com/100?text=Image 2',
              description: 'Image 2'
            },
            {
              src: 'https://via.placeholder.com/100?text=Image 3',
              description: 'Image 3'
            },
            {
              src: 'https://via.placeholder.com/100?text=Image 4',
              description: 'Image 4'
            }
          ]
        }]
    }
  },

  components: {}
})
</script>
<style lang="scss">
.sidebar-container {
  width: 270px;
  padding: 30px 0;
}

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

//.menu {
//  &__header {
//    text-transform: uppercase;
//    font-size: 12px;
//    color: #878787;
//    margin-bottom: 20px;
//  }
//
//  &__body {
//  }
//
//  &__item {
//    margin-bottom: 15px;
//  }
//
//  &__link {
//    color: #ffffff;
//    font-size: 14px;
//    transition: 0.2s linear;
//
//    &:hover {
//      opacity: 0.5;
//    }
//  }
//
//  &__item-count {
//    background-color: #ffc200;
//    font-size: 13px;
//    color: #131313;
//    border-radius: 50%;
//    padding: 2px 6px;
//    margin-left: 10px;
//  }
//}

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

.chat {
  padding: 15px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (min-width: 768px) {
    max-width: 730px;
    border-radius: 8px 8px 0 0;
    padding: 35px 30px 0 35px;
  }

  &__header {
    text-transform: uppercase;
    opacity: 0.5;
    font-size: 14px;
    color: #131313;
    margin-bottom: 2px;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__message {
    display: flex;
    margin-bottom: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #131313;
    padding: 10px 0;

    &--answer {
      max-width: 550px;
      align-self: center;
      font-size: 15px;
      padding: 20px 30px;
      border-radius: 10px;
      background-color: #f7f6f3;
    }
  }

  &__message-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 567px) {
      display: none;
    }

    &--complete {
      background-color: #cef9c6;
    }

    &--message {
      background-color: #fff8dd;
    }

    &--attachment {
      background-color: #e3efff;
    }
  }

  &__message-body {
    display: flex;
    flex: 1;
    font-size: 16px;
    line-height: 20px;
    justify-content: space-between;
  }

  &__message-content {
    max-width: 460px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &__message-attachment {
    display: flex;
    flex-wrap: wrap;
    align-self: self-start;
    margin: 0 -5px;
    margin-top: 20px;
  }

  &__message-attachment-item {
    padding: 0 5px;
    margin-bottom: 10px;

    & > img {
      border-radius: 8px;
    }
  }

  &__message-time {
    font-size: 14px;
    opacity: 0.7;
  }
}

</style>
