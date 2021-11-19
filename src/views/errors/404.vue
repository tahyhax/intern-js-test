<template lang="pug">
.page-error.page-error--404
  h3.page-error__code
    | 404
  .page-error__description
    p
      | It seems that you're lost in a perpetual black hole.
      | Let us help guide you out and get you back home.

  router-link(:to="{path:'/'}")
    app-button.page-error__button
      | Go to home page
</template>

<script>
import AppButton from '../../components/ui/AppButton'
export default {
  name: '404',
  components: { AppButton }
}
</script>

<style lang="scss" itemscope>
.page-error {
  &__code {
     font-size: 8em;
     font-weight: bold;
    margin-bottom: 10px;
   }
  &__description{
    font-size: 1.2em;
    margin-bottom: 25px;
  }
  &__button{
    transition: all 1s ease-out;;
    width: 250px;
    height: 30px;
    background: #ffc200;
    opacity: 1;
    font-size: 1.1rem;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
