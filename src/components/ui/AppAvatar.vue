<template lang="pug">
.logo
  slot/
</template>

<script>
export default {
  name: 'AppAvatar'
}
</script>

<style lang="scss" itemscope>
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
</style>
