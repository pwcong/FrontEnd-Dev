import _ from 'lodash';
import omit from 'omit.js';

export function buildPropsHOC(Component, componentName, properties) {
  return {
    name: componentName,
    mixins: [Component],
    props: properties,
  };
}

export function buildDataHOC(Component, componentName, options) {
  const {
    name = 'data',
    data,
    getData = (_, properties) => Promise.resolve([]),
    properties = {},
  } = options || {};

  return {
    name: componentName,
    mixins: [omit(Component, ['props'])],
    props: Object.assign({}, omit(Component.props, [name]), properties),
    data() {
      return {
        [name]: data,
      };
    },
    created() {
      this.handleInitData();
    },
    watch: {
      ...Object.keys(properties).reduce((p, c) => {
        p[c] = function () {
          this.handleInitData();
        };

        return p;
      }, {}),
    },
    methods: {
      handleInitData: _.debounce(function () {
        getData(this, this.$props).then((data) => (this[name] = data));
      }, 200),
    },
  };
}
