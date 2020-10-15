import areaOptions from '@/data/area';

export const area = {
  province_list: Object.keys(areaOptions.province_list)
    .filter((k) => ['900000'].indexOf(k) < 0)
    .reduce(
      (p, c) => {
        p[c] = areaOptions.province_list[c];
        return p;
      },
      {
        100000: '全国',
      }
    ),
  city_list: areaOptions.city_list,
};

const province_list = Object.keys(area.province_list).map((k) => ({
  text: area.province_list[k],
  value: k,
}));

const city_list = Object.keys(area.city_list).map((k) => ({
  text: area.city_list[k],
  value: k,
}));

export default province_list.map((p) => ({
  ...p,
  children: [
    ...city_list
      .filter((c) => c.value.slice(0, 2) === p.value.slice(0, 2))
      .map((c) => ({
        ...c,
        ptext: p.text,
        pvalue: p.value,
      })),
  ],
}));
