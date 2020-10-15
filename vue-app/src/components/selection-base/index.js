import { buildListMixin } from '@/mixins/list';
import SelectionBase from './index.vue';

export function buildSelectionBase() {
  const listMixin = buildListMixin({
    properties: ['keyword'],
    getDataPropName: 'getOptions',
  });

  return {
    name: 'selection-base',
    mixins: [listMixin, SelectionBase],
  };
}
