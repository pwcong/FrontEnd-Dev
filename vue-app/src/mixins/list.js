import _ from 'lodash';

export const listMixin = {
  name: 'list-mixin',
  data() {
    return {
      loading: false,
      loadingMore: false,
      list: [],
      params: {},
      pageNum: 1,
      pageCount: 20,
      totalCount: 0,
    };
  },
  computed: {
    hasMore() {
      return (
        this.pageCount * this.pageNum < this.totalCount &&
        this.list.length < this.totalCount
      );
    },
  },
};

export function buildListMixin(options) {
  options = Object.assign({}, options);

  const {
    immediate = true,
    properties = [],
    getDataPropName = 'getData',
    getParams = (_, params) => params,
    getData,
  } = options;

  return {
    name: 'list-mixin',
    mixins: [listMixin],
    props: {
      [getDataPropName]: {
        type: Function,
        default: getData,
      },
    },
    data() {
      return {
        ...properties.reduce((p, c) => {
          p[c] = undefined;
          return p;
        }, {}),
      };
    },
    methods: {
      onLoad: _.debounce(function (params) {
        this.loading = true;

        setTimeout(async () => {
          try {
            if (!this[getDataPropName]) {
              return;
            }

            params = getParams(
              this,
              Object.assign(
                {
                  pageNum: this.pageNum,
                  pageCount: this.pageCount,
                },
                params
              )
            );

            const targetParams = Object.keys(params).reduce((p, c) => {
              const v = params[c];
              if (v !== '' && v !== undefined && v !== null) {
                p[c] = v;
              }
              return p;
            }, {});

            const { data = [], totalCount = 0 } = await this[getDataPropName](
              this,
              targetParams
            );

            this.totalCount = totalCount;

            if (this.loadingMore) {
              this.list = this.list.concat(data);
            } else {
              this.list = data;
            }
          } finally {
            this.loading = false;
            this.loadingMore = false;
          }
        }, 200);
      }, 200),
      onRefresh: _.debounce(function () {
        if (this.loading) {
          return;
        }
        this.pageNum = 1;
        this.params = { ...this.params };
      }, 200),
      onLoadMore: _.debounce(function () {
        if (this.loading) {
          return;
        }
        this.loadingMore = true;
        this.pageNum++;
      }, 200),
    },
    watch: {
      ...properties.concat(['pageNum', 'pageCount']).reduce((p, c) => {
        p[c] = function (v) {
          if (['pageNum'].indexOf(c) < 0) {
            this.pageNum = 1;
          }
          this.params = Object.assign({}, this.params, {
            [c]: v,
          });
        };

        return p;
      }, {}),
      params: {
        immediate,
        handler(v) {
          this.onLoad(v);
        },
      },
    },
  };
}
