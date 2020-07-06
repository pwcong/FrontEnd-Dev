import { PREFIX_CLASSNAME } from './config';

export { default as classnames } from 'classnames';

export function getPrefixCls(cls?: string, customPrefix?: string) {
  return cls ? `${customPrefix || PREFIX_CLASSNAME}-${cls}` : PREFIX_CLASSNAME;
}
