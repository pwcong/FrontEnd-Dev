<template>
  <list-layout class="page-index">
    <van-nav-bar
      fixed
      title="Vue App"
      left-text="关闭"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <van-empty description="暂无内容" />
    </div>
  </list-layout>
</template>

<script>
export default {
  name: 'page-index',
  methods: {
    onClickLeft() {
      this.$root.goBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-index {
}
</style>
