<template>
  <van-popup
    class="treeselect-area-wrapper"
    :value="visible"
    position="right"
    :style="{ width: '100%', height: '100vh' }"
  >
    <div class="treeselect-area">
      <van-nav-bar
        :title="title"
        left-text="取消"
        left-arrow
        @click-left="handleCancel"
      >
        <template #right>
          <div style="color: white">
            <span
              @click="tempValue = []"
              v-if="!!tempValue.length"
              style="margin-right: 0.1rem"
            >
              清空
            </span>
            <span @click="handleOk">
              {{ `确定${!!tempValue.length ? `(${tempValue.length})` : ''}` }}
            </span>
          </div>
        </template>
      </van-nav-bar>

      <div class="main">
        <van-tree-select
          :items="data"
          :active-id="activeId"
          @click-item="handleChange"
          :main-active-index.sync="activeIndex"
          height="100%"
        />
      </div>
    </div>
  </van-popup>
</template>

<script>
import data from './data';

export default {
  name: 'treeselect-area',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
    },
    title: {
      type: String,
      default: '选择',
    },
    isMulti: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tempValue: [],
      activeIndex: 0,
      data: data.map((d) => ({
        ...d,
        children: [
          {
            ...d,
            id: d.value,
            text: d.value === '100000' ? d.text : '全省/市/区',
            _text: d.text,
          },
        ].concat(
          d.children.map((_d) => ({
            ..._d,
            id: _d.value,
          }))
        ),
      })),
    };
  },

  computed: {
    activeId() {
      return this.tempValue.map((d) => d.value);
    },
  },

  methods: {
    handleOk() {
      this.$emit('input', this.tempValue);
      this.$emit('change', this.tempValue);
      this.$emit('update:visible', false);
    },
    handleCancel() {
      this.$emit('cancel');
      this.$emit('update:visible', false);
    },
    handleChange(item) {
      let finalValue = [];
      if (this.isChecked(item)) {
        finalValue = this.tempValue.filter((d) => d.value !== item.value);
      } else {
        if (!this.isMulti) {
          finalValue = [item];
        } else {
          if (item.value === '100000') {
            finalValue = [item];
          } else if (item.value.slice(2) === '0000') {
            finalValue = this.tempValue
              .filter((d) => d.value !== '100000')
              .filter((d) => d.value.slice(0, 2) !== item.value.slice(0, 2))
              .concat([item]);
          } else {
            finalValue = this.tempValue
              .filter((d) => d.value !== '100000')
              .filter((d) => d.value !== `${item.value.slice(0, 2)}0000`)
              .concat([item]);
          }
        }
      }

      this.tempValue = finalValue.map((d) => ({
        ...d,
        text: d._text || d.text,
      }));
    },
    isChecked(item) {
      return this.tempValue.findIndex((d) => d.value === item.value) > -1;
    },
  },
  watch: {
    visible(v, ov) {
      if (!ov && v) {
        this.tempValue = this.$props.value;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.treeselect-area {
  .main {
    height: calc(100vh - 46px);
    overflow: auto;
  }
}
</style>
