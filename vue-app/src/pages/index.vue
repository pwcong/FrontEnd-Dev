<template>
  <list-layout class="page-index">
    <van-nav-bar fixed left-text="关闭" left-arrow @click-left="onClickLeft">
      <span slot="title" @click="initVConsole">Vue App</span>
    </van-nav-bar>
    <div class="main">
      <van-empty description="暂无内容" />
    </div>
  </list-layout>
</template>

<script>
import Debugger from '@/common/lib/debugger';

let vcCount = 0;
let vcTimer = null;

export default {
  name: 'page-index',
  methods: {
    onClickLeft() {
      this.$root.goBack();
    },
    initVConsole() {
      clearTimeout(vcTimer);
      vcTimer = setTimeout(() => (vcCount = 0), 1000);
      vcCount += 1;
      if (vcCount >= 5) {
        Debugger.install();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-index {
}
</style>
