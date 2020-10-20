import 'minireset.css';

import config from '@/config';
import Flexible from '@/common/lib/flexible';
import Debugger from '@/common/lib/debugger';

import 'antd-mobile/dist/antd-mobile.less';
import '@/assets/css/antd.scss';

Flexible.install();

if (config.env === 'test') {
  Debugger.install();
}
