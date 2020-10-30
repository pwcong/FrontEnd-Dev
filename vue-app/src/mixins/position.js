export default {
  name: 'position-mixin',
  data() {
    return {
      position: {},
    };
  },
  methods: {
    calcDistance(pos1, pos2) {
      const { latitude: lat1, longitude: lng1 } = pos1;

      const { latitude: lat2, longitude: lng2 } = pos2;

      if (!lat1 || !lng1 || !lat2 || !lng2) {
        return '';
      }

      const rad = (d) => {
        return (Number(d) * Math.PI) / 180.0;
      };

      let radLat1 = rad(lat1);
      let radLat2 = rad(lat2);
      let a = radLat1 - radLat2;
      let b = rad(lng1) - rad(lng2);
      let s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137; // EARTH_RADIUS
      s = Math.round(s * 10000) / 10; // 输出为米
      s = Math.round(s);
      return s;
    },
    calcPosition(pos, distance) {
      const { longitude, latitude } = pos;

      const d = (distance / 1.5) * 0.00001;

      const toString = (d) => (Math.round(d * 100000) / 100000).toString();

      return {
        longitude: toString(
          Number(longitude) + d * (Math.random() > 0.5 ? 1 : -1)
        ),
        latitude: toString(
          Number(latitude) + d * (Math.random() > 0.5 ? 1 : -1)
        ),
      };
    },
    getPosition() {
      return new Promise(async (resolve, reject) => {
        resolve({
          longitude: '',
          latitude: '',
        });
      });
    },
  },
};
