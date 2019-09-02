<template>
  <div class="container">
    <img :src="logo" alt="Logo" />
    <welcome :text="text" />
  </div>
</template>

<style lang="scss">
.container {
  text-align: center;
  padding-top: 100px;
}
</style>

<script>
import logo from "../assets/imgs/vue.png";

import Welcome from "../components/Welcome.vue";

export default {
  components: {
    Welcome
  },
  data() {
    return {
      logo,
      text: "Hello World!"
    };
  }
};
</script>
