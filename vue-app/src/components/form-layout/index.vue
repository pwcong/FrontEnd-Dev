<template>
  <div class="form-layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'form-layout'
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.form-layout {
  /deep/.form-layout-main {
    position: absolute;
    height: calc(100vh - 46px);
    width: 100%;
    top: 46px;
    left: 0;
    padding-bottom: 44px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  /deep/.form-layout-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
}
</style>
