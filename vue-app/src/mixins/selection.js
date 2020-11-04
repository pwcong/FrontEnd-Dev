export function buildSelectionMixin(options) {
  options = Object.assign({}, options);

  const { valueType = Object, defaultValue = {} } = options;

  return {
    name: 'selection-mixin',
    components: {},
    props: {
      value: {
        type: valueType,
        default: () => defaultValue,
      },
      visible: {
        type: Boolean,
      },
    },
    data() {
      return {
        tempValue: this.getTempValue(),
        selectionContainer: () => document.body,
      };
    },
    methods: {
      getTempValue() {
        if (valueType === Array) {
          return [].concat(defaultValue).concat(this.$props.value);
        }
        return Object.assign({}, defaultValue, this.$props.value);
      },
      handleOk() {
        this.$emit('input', this.tempValue);
        this.$emit('change', this.tempValue);
        this.$emit('update:visible', false);
        this.$emit('close');
      },
      handleCancel() {
        this.$emit('update:visible', false);
        this.$emit('close');
      },
    },
    watch: {
      visible(v, ov) {
        if (!ov && v) {
          this.tempValue = this.getTempValue();
        }
      },
    },
  };
}
