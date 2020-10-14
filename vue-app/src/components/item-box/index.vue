<template>
  <div class="item-box">
    <div v-if="title" class="item-head">
      <div class="item-title">
        {{ title }}
      </div>
      <div class="item-action">
        <slot name="action" />
      </div>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: 'item-box',
  props: ['title']
};
</script>

<style lang="scss" scoped>
.item-box {
  width: 100%;
  background-color: white;
  .item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 0.48rem;
    background: #f4f4f4;
    padding: 0.12rem;
  }
  .item-title {
    font-size: 0.14rem;
    color: #666666;
    font-weight: bold;
  }
}
</style>
