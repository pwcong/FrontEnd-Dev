<template>
  <div class="container">
    <img :src="logo" />
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import LOGO from '@/assets/imgs/vue.png';

export default {
  data() {
    return {
      logo: LOGO,
      title: 'Vue Multipage Demo'
    };
  }
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.container h1 {
  padding: 0;
  margin: 0;

  font-size: 48px;
  color: #333;
}
</style>

