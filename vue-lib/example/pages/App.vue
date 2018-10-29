<template>
  <div class="container">
    <img :src="logo" alt="Logo">
    <div>
      <test-component label="Hello World!" />
    </div>
  </div>
</template>

<style lang="scss">
.container {
  text-align: center;
  padding-top: 100px;
}
</style>

<script>
import logo from './assets/imgs/vue.png';

import { TestComponent } from '../../src/index';

export default {
  data() {
    return {
      logo
    };
  },
  components: {
    TestComponent
  }
};
</script>
