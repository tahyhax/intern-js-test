<template>
  <div class="task">
    <header class="task__header">
      <h3>Today</h3>
    </header>
    <div class="task__body">
      <div class="task__message" v-for="(task, key) in tasks"
           :key="key">
          <div class="task__message-icon" :class="'task__message-icon--' + task.type">
            <img src="@/assets/Icon@3x.svg">
          </div>
        <div class="task__message-body">
          <div class="task__message-content">
            <div class="task__message-text">
              <p> {{ task.text }}</p>
            </div>
          </div>
          <div class="task__message-time">{{ task.created }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Tasks',
  data () {
    return {
      tasks: [
        { title: 'task 1', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', status: 'open', created: '8:15 PM', updated: '', creator: 'manager', updater: '' },
        { title: 'task 2', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', status: 'complete', created: '5:15 PM', updated: '', creator: 'manager', updater: '' }
      ]
    }
  }
})
</script>
<style lang="scss" scoped>
.task {
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
