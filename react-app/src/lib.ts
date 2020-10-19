import 'minireset.css';

import config from '@/config';
import Flexible from '@/common/lib/flexible';
import Debugger from '@/common/lib/debugger';

import '@ionic/react/css/core.css';
import '@/assets/css/ionic.scss';

Flexible.install();

if (config.env === 'test') {
  Debugger.install();
}
