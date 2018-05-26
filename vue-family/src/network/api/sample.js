import request from '../request';

import api from './api';

export function test() {
  return request(api.sample.test.url(), api.sample.test.method, {}, {});
}
