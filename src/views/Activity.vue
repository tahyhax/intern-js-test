<template lang="pug">
.activity
    header.activity__header
      h3 Today
    .activity__body
      .activity__message( v-for="(activity, key) in activities"
        :key="key"
        :class="{'activity__message--answer': activity.type === 'answer'}")
        template(v-if="activity.type !== 'answer'")
          .activity__message-icon(:class="'activity__message-icon--' + activity.type")
            img(src="@/assets/Icon@3x.svg")
        .activity__message-body
          .activity__message-content
            .activity__message-text
              p {{ activity.text }}
            template(v-if="activity.attachments")
              .activity__message-attachment
                a.activity__message-attachment-item(href="#" v-for="(attachment, key) in activity.attachments"
                  :key="key"
                  @click="updateNotification(key)")
                  img(:src="attachment.src" :alt="attachment.description")
          .activity__message-time {{ activity.created }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { userMutationTypes } from '@/store/modules/user'

export default defineComponent({
  name: 'activity',
  setup: function () {
    const store = useStore()
    const activities = computed(() => store.state.activity.activities)
    const updateNotification = (index: number): void => {
      store.commit(`user/${userMutationTypes.UPDATE_NOTIFICATION}`, index)
    }
    return {
      activities,
      updateNotification
    }
  }
})
</script>

<style lang="scss" scoped>
.activity {
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
