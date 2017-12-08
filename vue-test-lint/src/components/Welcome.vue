<style lang="scss">
.welcome {
  font-size: 26px;
}
</style>
<template>

  <h1 class="welcome">{{text}}</h1>

</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Welcome'
    }
  },
  data() {
    return {
      ready: false
    };
  },
  mounted() {
    this.ready = true;
  }
};
</script>

