import axios from 'axios';

import { buildSelectionBase } from '@/components/selection-base';
import { positionMixin } from '@/mixins';
import { buildPropsHOC } from '@/utils';

export default buildPropsHOC(
  {
    mixins: [buildSelectionBase(), positionMixin],
  },
  'selection-address',
  {
    getOption: {
      type: Function,
      default: (_, option) =>
        new Promise(async (resolve, reject) => {
          try {
            const result = await axios.get(
              'https://restapi.amap.com/v3/geocode/regeo',
              {
                params: {
                  key: '66c039ccc1eb3b908ea450529cd5768e',
                  location: option.value,
                },
              }
            );
            const data = (result.data.regeocode || {}).addressComponent || {};

            resolve({
              ...option,
              streetName: data.township,
              streetId: data.towncode,
              districtName: data.district,
              districtId: data.adcode,
              cityName: data.city,
              cityId: data.citycode,
              provinceName: data.province,
            });
          } catch (e) {
            _.$toast.fail({
              message: '获取地址失败',
            });
            reject(e);
          }
        }),
    },
    getOptions: {
      type: Function,
      default: (_, params) =>
        new Promise(async (resolve) => {
          let options = [];
          try {
            let result;
            if (!params.keyword) {
              const position = await _.getPosition();
              result = await axios
                .get('https://restapi.amap.com/v3/place/around', {
                  params: {
                    key: '66c039ccc1eb3b908ea450529cd5768e',
                    location: `${position.longitude},${position.latitude}`,
                  },
                })
                .then((res) => res.data);
            } else {
              result = await axios
                .get(
                  `https://restapi.amap.com/v3/place/text?keywords=${
                    params.keyword || '深圳'
                  }&key=66c039ccc1eb3b908ea450529cd5768e`
                )
                .then((res) => res.data);
            }
            options = result.pois.map((d) => ({
              ...d,
              text: d.name,
              value: d.location,
            }));
          } catch (e) {
            _.$toast.fail({
              message: '获取地址失败',
            });
          }

          const map = new Map();
          options = options.filter((d) => {
            if (map.has(d.value)) {
              return false;
            }
            map.set(d.value, true);
            return true;
          });
          resolve({
            totalCount: options.length,
            data: options,
          });
        }),
    },
  }
);
