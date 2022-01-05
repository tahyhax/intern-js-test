<template>
  <div class="modal">
    <div class="modal__dialog" :class="{'active' : isActive}">
      <div class="modal__content">
        <button class="modal__close" @click="close">
          <i class="fa fa-times"></i>
        </button>
        <h3 class="modal__header">
          <slot name="header"></slot>
        </h3>
        <div class="modal__body">
          <slot name="body"></slot>
        </div>
        <div class="modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>

    <div class="modal__overlay"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppModal',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const close = () => emit('onClose')

    return { close }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  flex-direction: column;

  &__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 1000;
    opacity: 0;
    background: #000000;
    transition: all .25s;
  }

  &__dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    max-width: calc(100% / 2 - 15%);
    min-width: 320px;
    height: auto;
    z-index: 2000;
    visibility: hidden;
    backface-visibility: hidden;
    transform: translateX(-50%) translateY(-50%);
    perspective: 1300px;

    &.active {
      opacity: 1;
      visibility: visible;

      ~ .modal__overlay {
        opacity: .9;
        visibility: visible;
      }

      .modal__content {
        transform: rotateX(0deg);
        opacity: 1;
      }
    }

  }

  &__content {
    background: #fafafa;
    border-radius: 2px;
    padding: 24px;
    color: #131313;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(-60deg);
    transform-origin: 50% 0;
    opacity: 0;
    transition: all .25s;
  }

  &__close {
    position: absolute;
    right: -16px;
    top: -16px;
    color: #fff;
    background: #673ab7;
    border: 0;
    outline: 0;
    border-radius: 50%;
    font-size: 16px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  &__header {
    text-align: center;
    font-weight: 300;
    font-size: 24px;
    color: rgba(0, 0, 0, .45);
  }

  &__body {
    color: #ffffff;
    display: flex;
    margin: 0 auto;
    width: 100%;
    //max-width: 400px;
    flex-direction: column;
  }

  &__footer {
    margin: 10px 0
  }
}
</style>
