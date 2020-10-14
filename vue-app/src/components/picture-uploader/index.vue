<template>
  <div class="picture-uploader">
    <div class="picture-item" v-for="(item, index) in tempValue" :key="index">
      <van-loading v-if="item.loading" />
      <van-image
        class="picture"
        v-if="!item.loading"
        width="0.7rem"
        height="0.7rem"
        fit="conver"
        :src="item.src"
      />
      <van-icon
        class="delete"
        v-if="!item.loading && !readonly"
        name="cross"
        @click="onDelete(item, index)"
      />
    </div>
    <div
      v-if="!readonly && canUpload"
      class="picture-item"
      @click="show = true"
    >
      <van-icon name="photograph" />
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
      @cancel="show = false"
    />
  </div>
</template>

<script>
export default {
  name: 'picture-uploader',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    isMulti: {
      type: Boolean,
      default: () => false,
    },
    readonly: {
      type: Boolean,
      default: () => false,
    },
    max: {
      type: Number,
    },
  },
  data() {
    return {
      show: false,
      actions: [
        { name: '拍照', value: 1 },
        { name: '本地上传', value: 2 },
      ],
      tempValue: [],
    };
  },
  computed: {
    canUpload() {
      if (
        (!this.isMulti && this.tempValue.length >= 1) ||
        (this.isMulti && this.tempValue.length >= this.max)
      ) {
        return false;
      }

      return true;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.tempValue = v;
      },
    },
  },
  methods: {
    getPicture() {
      return Promise.resolve({});
    },
    onSelect(item) {
      this.getPicture().then(async (imgObj) => {
        const newPicture = {
          ...imgObj,
          loading: true,
        };

        try {
          this.tempValue.push(newPicture);

          const res = await this.$tools.request(
            this.$config.api.postRequestPic('', {
              imgStr: JSON.stringify([newPicture.base64Url]),
            })
          );

          const { createFile = [], fileUrl = [] } = res.data || {};

          newPicture.createFile = createFile[0];
          newPicture.fileUrl = fileUrl[0];
          newPicture.src = fileUrl[0];
          newPicture.loading = false;

          this.tempValue = [...this.tempValue];

          this.$emit('input', this.tempValue);
          this.$emit('change', this.tempValue);
        } catch (e) {
          this.tempValue = this.tempValue.filter((v) => v !== newPicture);
        }
      });

      this.show = false;
    },
    onDelete(_, index) {
      this.tempValue.splice(index, 1);
      this.$emit('input', this.tempValue);
      this.$emit('change', this.tempValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.picture-uploader {
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
  .picture-item {
    width: 0.7rem;
    height: 0.7rem;
    background-color: #f7f8fa;
    text-align: center;
    font-size: 0.2rem;
    line-height: 0.7rem;
    position: relative;
    color: #999999;

    &:not(:first-child) {
      margin-left: 0.1rem;
    }
    .delete {
      background-color: $theme-color;
      color: white;
      font-size: 0.14rem;
      position: absolute;
      right: 0.01rem;
      top: 0.01rem;
      border-radius: 50%;
      width: 0.16rem;
      height: 0.16rem;
      line-height: 0.16rem;
      text-align: center;
    }
  }
}
</style>
