<template>
  <van-popup
    :get-container="selectionContainer"
    class="selection-base-wrapper"
    :value="visible"
    position="right"
    :style="{ width: '100%', height: '100vh' }"
  >
    <div
      :class="{
        'selection-base': true,
        'has-search': search,
      }"
    >
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

      <van-search
        v-if="search"
        v-model="keyword"
        placeholder="请输入搜索关键词"
      />

      <van-pull-refresh
        class="main"
        :value="loading && !loadingMore"
        @refresh="onRefresh"
      >
        <van-list
          :value="loadingMore"
          :finished="!hasMore"
          finished-text="没有更多了"
          @load="onLoadMore"
        >
          <div class="list">
            <div
              class="item-wrapper"
              v-for="(item, index) in tempOptions"
              :key="index"
              @click="handleChange(item)"
            >
              <slot
                name="item"
                :value="item"
                :index="index"
                :checked="isChecked(item)"
              >
                <div class="item">
                  <div class="checkbox">
                    <van-checkbox :value="isChecked(item)" />
                  </div>
                  <div class="text">
                    {{ getText(item) }}
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </van-popup>
</template>

<script>
import { buildSelectionMixin } from '@/mixins';

const selectionMixin = buildSelectionMixin({
  valueType: Array,
  defaultValue: [],
});

export default {
  name: 'selection-base',
  mixins: [selectionMixin],
  props: {
    search: {
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
    options: {
      type: Array,
      default: () => [],
    },
    getOption: {
      type: Function,
      default: (_, option) => Promise.resolve(option),
    },
    getText: {
      type: Function,
      default: (option) => option.text,
    },
  },
  data() {
    return {
      keyword: '',
    };
  },
  computed: {
    tempOptions() {
      if (!!this.getOptions) {
        return this.list;
      } else {
        return this.options.filter((o) =>
          !!this.keyword ? o.text.indexOf(this.keyword) > -1 : true
        );
      }
    },
  },
  methods: {
    async handleChange(item) {
      item = await this.getOption(this, item);

      if (this.isChecked(item)) {
        this.tempValue = this.tempValue.filter((d) => d.value !== item.value);
      } else {
        if (this.isMulti) {
          this.tempValue = this.tempValue.concat(item);
        } else {
          this.tempValue = [item];
        }
      }
    },
    isChecked(item) {
      return this.tempValue.findIndex((d) => d.value === item.value) > -1;
    },
  },
};
</script>
<style lang="scss" scoped>
.selection-base {
  .main {
    position: absolute;
    top: 46px;
    left: 0;
    width: 100%;
    height: calc(100% - 46px);
    overflow: auto;
  }

  .list {
    padding: 0 0.14rem;
  }

  .item-wrapper {
    border-bottom: 1px solid #eeeeee;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 0.1rem 0;
    .checkbox {
      .van-checkbox {
        margin-right: 0.12rem;
        border-bottom: none;
      }
    }
    .text {
      flex: 1;
      font-size: 0.14rem;
    }
  }

  &.has-search .main {
    top: 100px;
    height: calc(100% - 100px);
  }
}
</style>
