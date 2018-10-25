<template>
  <div id="app">
    <div class="container">
      <img :src="logo" alt="Logo">
      <div class="navs">
        <router-link class="nav" to="/">Index</router-link>
        <router-link class="nav" to="/counter">Counter</router-link>
        <router-link class="nav" to="/page1">Page1</router-link>
        <router-link class="nav" to="/page2">Page2</router-link>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  font-family: 'Microsoft YaHei', sans-serif;
}

.container {
  text-align: center;
  padding-top: 60px;

  .navs {
    border-bottom: 1px solid #ddd;

    .nav {
      display: inline-block;
      padding: 8px 0;
      width: 100px;
      text-align: center;
      color: #666;
      text-decoration: none;

      border-bottom: 2px solid transparent;

      transition: border 0.3s, color 0.3s;

      &:hover {
        color: #41b883;
        border-bottom: 2px solid #41b883;
      }

      &.router-link-exact-active {
        color: #41b883;
        border-bottom: 2px solid #41b883;
      }
    }
  }

  .content {
    margin-top: 50px;
    font-size: 46px;
  }
}
</style>

<script>
import logo from '../assets/imgs/vue.png';

export default {
  data() {
    return {
      logo
    };
  }
};
</script>
