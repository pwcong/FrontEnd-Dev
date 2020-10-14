<template>
  <div
    :class="{
      'list-layout': true,
      'has-toolbar': hasToolbar,
      'has-search': hasSearch,
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'list-layout',
  props: {
    hasToolbar: Boolean,
    hasSearch: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.list-layout {
  
  .toolbar {
    position: fixed;
    width: 100%;
    left: 0;
    top: 46px;
    z-index: 10;
    box-sizing: border-box;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12);

    /deep/.van-dropdown-menu__bar {
      box-shadow: none;
      border-bottom: 1px solid #eeeeee;
    }
  }

  .main {
    position: absolute;
    top: 46px;
    height: calc(100vh - 46px);
    left: 0;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  &.has-toolbar .main {
    top: 100px;
    height: calc(100vh - 100px);
  }

  &.has-search .main {
    top: 148px;
    height: calc(100vh - 148px);
  }
}
</style>
