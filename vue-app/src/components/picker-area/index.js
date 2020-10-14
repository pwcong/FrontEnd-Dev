import { Area } from 'vant';
import areaOptions from '@/data/area';
import { buildPropsHOC } from '@/utils';

export default buildPropsHOC(Area, 'picker-area', {
  areaList: {
    type: Object,
    default: () => areaOptions,
  },
});
