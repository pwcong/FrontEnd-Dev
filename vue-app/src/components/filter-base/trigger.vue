<template>
  <div
    :class="{
      'filter-trigger': true,
      active: isActive,
    }"
    @click="handleClick"
  >
    <van-icon name="filter-o" />
  </div>
</template>

<script>
export default {
  name: 'filter-trigger',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isActive() {
      let active = false;
      Object.keys(this.value).forEach((k) => {
        if (k !== null && k !== undefined && k !== '') {
          active = true;
        }
      });
      return active;
    },
  },
  methods: {
    handleClick() {
      this.$emit('click', arguments);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.filter-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 54px;
  height: 54px;
  background-color: white;
  transition: all 0.2s;
  &:active {
    background-color: #f5f5f5;
  }
  .van-icon {
    font-size: 0.18rem;
  }

  &.active .van-icon {
    color: $theme-color;
  }
}
</style>
