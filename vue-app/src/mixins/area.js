export default {
  name: 'area-mixin',

  methods: {
    getAreaText(v) {
      return v
        .map((d) => `${!!d.ptext ? `${d.ptext}/` : ''}${d.text}`)
        .join(';');
    },
    getAreaDetail(area) {
      area = area.filter((d) => d.value !== '100000');

      const detail = new Map();

      // 获取省份数据
      area.forEach((d) => {
        if (d.value.slice(2) === '0000') {
          // 省
          if (!detail.has(d.value)) {
            detail.set(d.value, {
              ...d,
              children: new Map(),
            });
          }
        } else {
          // 市/区
          const { ptext, pvalue } = d;

          if (ptext && pvalue) {
            if (!detail.has(pvalue)) {
              detail.set(pvalue, {
                text: ptext,
                value: pvalue,
                children: new Map(),
              });
            }
          }
        }
      });

      // 获取区数据
      area.forEach((d) => {
        const { value, pvalue } = d;

        const t = detail.get(pvalue);

        if (d.value.slice(2) === '0000' || !pvalue || !t) {
          return;
        }

        t.children.set(value, d);
      });

      return Array.from(detail.values()).map((d) => ({
        ...d,
        children: Array.from(d.children.values()),
      }));
    },
  },
};
