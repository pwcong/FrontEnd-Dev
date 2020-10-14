import { buildSelectionBase } from '@/components/selection-base';
import { buildPropsHOC } from '@/utils';

export default buildPropsHOC(buildSelectionBase(), 'selection-org', {
  getText: {
    type: Function,
    default: (option) =>
      `${option.fdName}/${option.fdLoginName}/${option.fdNo}/${option.fdDeptName}`,
  },
  getOptions: {
    type: Function,
    default: (_, params) =>
      _.$tools
        .request(
          _.$config.api.postRequest('', {
            pageNum: params.pageNum,
            pageCount: params.pageCount,
            fdName: params.keyword,
          })
        )
        .then((res) => ({
          ...res,
          data: res.data.map((d) => ({
            ...d,
            value: d.fdLoginName,
            text: d.fdName,
          })),
        })),
  },
});
