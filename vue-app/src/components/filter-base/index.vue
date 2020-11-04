<template>
  <van-popup
    class="filter-base-wrapper"
    :value="visible"
    position="right"
    @click-overlay="handleCancel"
    :style="{ width: '80vw', height: '100vh' }"
  >
    <div class="filter-base">
      <div class="filter-header">
        <div class="filter-title">{{ title }}</div>
        <div class="filter-close" @click="handleCancel">
          <van-icon name="cross" />
        </div>
      </div>
      <div class="filter-list" v-if="options.length > 0">
        <div class="filter-item" v-for="(item, index) in options" :key="index">
          <template v-if="item.type === 'input'">
            <van-field
              placeholder="请输入"
              :label="item.label"
              v-model="tempValue[item.key]"
            />
          </template>
          <template v-else-if="item.type === 'number'">
            <van-field
              :label="item.label"
              type="number"
              v-model="tempValue[item.key]"
              placeholder="请输入"
            />
          </template>
          <template v-else-if="item.type === 'switch'">
            <van-field readonly :label="item.label">
              <template #input>
                <van-switch size="0.18rem" v-model="tempValue[item.key]" />
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'radio'">
            <van-field readonly :label="item.label">
              <template #input>
                <div class="filter-item__radio">
                  <van-radio-group
                    direction="horizontal"
                    v-model="tempValue[item.key]"
                  >
                    <van-radio
                      v-for="(o, i) in (item.props || {}).options || []"
                      :key="i"
                      :name="o.value"
                    >
                      {{ o.text }}
                    </van-radio>
                  </van-radio-group>
                </div>
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'checkbox'">
            <van-field readonly :label="item.label">
              <template #input>
                <div class="filter-item__checkbox">
                  <van-checkbox-group
                    v-model="tempValue[item.key]"
                    direction="horizontal"
                  >
                    <van-checkbox
                      v-for="(o, i) in (item.props || {}).options || []"
                      :key="i"
                      :name="o.value"
                      >{{ o.text }}</van-checkbox
                    >
                  </van-checkbox-group>
                </div>
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'stepper'">
            <van-field readonly :label="item.label">
              <template #input>
                <van-stepper
                  v-model="tempValue[item.key]"
                  :min="(item.props || {}).min"
                  :max="(item.props || {}).max"
                />
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'calendar'">
            <van-field
              readonly
              clickable
              is-link
              placeholder="请选择"
              :name="item.key"
              :value="item.getText(tempValue[item.key])"
              :label="item.label"
              @click="visibles[item.key] = true"
            />
            <van-calendar
              :default-date="tempValue[item.key]"
              :get-container="selectionContainer"
              :title="`选择${item.label}`"
              :type="(item.props || {}).type"
              :min-date="(item.props || {}).minDate"
              :max-date="(item.props || {}).maxDate"
              v-model="visibles[item.key]"
              @confirm="
                (tempValue[item.key] = $event) && (visibles[item.key] = false)
              "
            />
          </template>
          <template v-else-if="item.type === 'picker'">
            <van-field
              readonly
              clickable
              is-link
              placeholder="请选择"
              :name="item.key"
              :value="item.getText(tempValue[item.key])"
              :label="item.label"
              @click="visibles[item.key] = true"
            />
            <van-popup
              :get-container="selectionContainer"
              v-model="visibles[item.key]"
              position="bottom"
            >
              <component
                :is="item.component || 'van-picker'"
                show-toolbar
                :title="`选择${item.label}`"
                :columns="(item.props || {}).columns"
                @cancel="visibles[item.key] = false"
                @confirm="
                  (tempValue[item.key] = $event) && (visibles[item.key] = false)
                "
              />
            </van-popup>
          </template>
          <template v-else-if="item.type === 'selection'">
            <van-field
              readonly
              clickable
              is-link
              placeholder="请选择"
              :name="item.key"
              :value="item.getText(tempValue[item.key])"
              :label="item.label"
              @click="visibles[item.key] = true"
            />

            <component
              :is="item.component || 'selection-base'"
              :title="`选择${item.label}`"
              :search="(item.props || {}).search"
              :options="(item.props || {}).options"
              :getOptions="(item.props || {}).getOptions"
              :is-multi="(item.props || {}).isMulti"
              v-model="tempValue[item.key]"
              :visible.sync="visibles[item.key]"
            />
          </template>
          <template v-else>
            <div class="filter-tips">
              {{ `暂不支持该类型筛选器(${item.type})` }}
            </div>
          </template>
        </div>
      </div>
      <div v-else class="filter-empty">
        <van-empty description="暂无筛选项" />
      </div>
      <div class="filter-action" v-if="options.length > 0">
        <div class="filter-btn" @click="tempValue = {}">重置</div>
        <div class="filter-btn filter-btn-ok" @click="handleOk">确定</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { buildSelectionMixin } from '@/mixins';

const selectionMixin = buildSelectionMixin({
  valueType: Object,
  defaultValue: {},
});

export default {
  name: 'filter-base',
  mixins: [selectionMixin],
  props: {
    title: {
      type: String,
      default: '筛选',
    },
    options: {
      type: Array,
      default: () => [
        // {
        //   type: 'input',
        //   key: 'input',
        //   label: '输入框',
        // },
        // {
        //   type: 'number',
        //   key: 'number',
        //   label: '数字输入框',
        // },
        // {
        //   type: 'switch',
        //   key: 'switch',
        //   label: '开关',
        // },
        // {
        //   type: 'radio',
        //   key: 'radio',
        //   label: '单选框',
        //   props: {
        //     options: [
        //       {
        //         value: '1',
        //         text: '1',
        //       },
        //       {
        //         value: '2',
        //         text: '2',
        //       },
        //       {
        //         value: '3',
        //         text: '3',
        //       },
        //     ],
        //   },
        // },
        // {
        //   type: 'checkbox',
        //   key: 'checkbox',
        //   label: '复选框',
        //   props: {
        //     options: [
        //       {
        //         value: '1',
        //         text: '1',
        //       },
        //       {
        //         value: '2',
        //         text: '2',
        //       },
        //       {
        //         value: '3',
        //         text: '3',
        //       },
        //     ],
        //   },
        // },
        // {
        //   type: 'stepper',
        //   key: 'stepper',
        //   label: '步进器',
        //   props: {
        //     min: -10,
        //     max: 10,
        //   },
        // },
        // {
        //   type: 'calendar',
        //   key: 'calendar',
        //   label: '日历',
        //   getText: (v) => (!!v ? v.toString() : ''),
        // },
        // {
        //   type: 'picker',
        //   key: 'picker',
        //   label: '选择器',
        //   component: '',
        //   getText: (v) => (v || {}).text,
        //   props: {
        //     columns: [
        //       {
        //         value: '1',
        //         text: '1',
        //       },
        //       {
        //         value: '2',
        //         text: '2',
        //       },
        //       {
        //         value: '3',
        //         text: '3',
        //       },
        //     ],
        //   },
        // },
        // {
        //   type: 'selection',
        //   key: 'selection',
        //   label: '选择器',
        //   component: '',
        //   getText: (v) => (v || []).map((d) => d.text).join(';'),
        //   props: {
        //     options: [
        //       {
        //         value: '1',
        //         text: '1',
        //       },
        //       {
        //         value: '2',
        //         text: '2',
        //       },
        //       {
        //         value: '3',
        //         text: '3',
        //       },
        //     ],
        //   },
        // },
      ],
    },
  },
  data() {
    const visibles = this.options.reduce((p, c) => {
      if (['calendar', 'picker', 'selection'].indexOf(c.type) > -1) {
        p[c.key] = false;
      }
      return p;
    }, {});

    return {
      visibles,
    };
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.filter-base {
  position: relative;
  width: 100%;
  height: 100%;

  .filter-header {
    position: absolute;
    left: 0;
    font-size: 0.16rem;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-bottom: 1px solid #dddddd;
    z-index: 1;
  }

  .filter-close {
    position: absolute;
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    font-size: 0.18rem;
    color: #666666;
    transition: all 0.2s;

    &:active {
      background-color: #f5f5f5;
    }
  }

  .filter-action {
    display: flex;
    position: absolute;
    bottom: 0;
    box-shadow: 0 -2px 12px rgba(100, 101, 102, 0.12);
    width: 100%;
    background-color: white;
  }

  .filter-btn {
    flex: 2;
    text-align: center;
    height: 50px;
    line-height: 50px;
    position: relative;
    transition: all 0.2s;
    color: #666666;

    &-ok {
      color: $theme-color;
      flex: 3;
    }

    &:active {
      background-color: #f5f5f5;
    }

    &:not(:last-child)::after {
      content: '';
      height: 0.2rem;
      width: 1px;
      position: absolute;
      right: 0;
      top: 50%;
      background-color: rgba(100, 101, 102, 0.12);
      transform: translateY(-50%);
    }
  }

  .filter-tips {
    padding: 0.14rem 0;
    font-size: 0.12rem;
    color: #999999;
  }

  .filter-list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 50px 0.12rem;
  }
  .filter-item {
    &:not(:last-child) {
      border-bottom: 1px solid #eeeeee;
    }

    .van-cell {
      padding-left: 0;
      padding-right: 0;
    }

    &__radio {
      .van-radio {
        margin-bottom: 6px;
      }
    }
    &__checkbox {
      .van-checkbox {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
