<template>
  <div
    :class="{
      'address-item': true,
      checked: checked,
    }"
  >
    <div class="name">{{ value.name }}</div>
    <div class="address">
      {{ value.pname + value.cityname + value.adname + value.address }}
    </div>
    <div v-if="currentPosition" class="position">
      <van-icon name="location-o" />
      <span>{{ !!countDistance ? countDistance + '米' : '未知' }}</span>
    </div>
  </div>
</template>

<script>
import { positionMixin } from '@/mixins';
export default {
  name: 'address-item',
  mixins: [positionMixin],
  props: {
    checked: Boolean,
    currentPosition: Object,
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    countDistance() {
      return this.calcDistance(this.currentPosition, {
        longitude: this.value.location.split(',')[0],
        latitude: this.value.location.split(',')[1],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.address-item {
  user-select: none;
  cursor: pointer;
  padding: 0.04rem 0.06rem;
  transition: all 0.2s;
  border: 1px solid transparent;
  border-radius: 0.02rem;

  .name {
    font-size: 0.14rem;
  }
  .position,
  .address {
    display: flex;
    align-items: center;
    margin-top: 0.04rem;
    font-size: 0.12rem;
    color: #999999;
  }
  &.checked {
    box-sizing: border-box;
    border: 1px solid $theme-color;
    background-color: rgba($theme-color, 0.05);
  }
}
</style>
