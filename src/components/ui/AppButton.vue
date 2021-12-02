<template lang="pug">
button.button
  slot/
</template>

<script>
export default {
  name: 'AppButton'
}
</script>

<style lang="scss" itemscope>

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
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    opacity: 0.8;
  }

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
  &--primary{
    background-color: #007bff;
  }
  &--secondary{
    background-color: #6c757d;
  }
}
</style>
