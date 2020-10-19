import env from './env';
import qs from 'qs';

import store from '@/store';

export interface IConfig {
  testUser: object;
  apiMeta: object;
  env: string;
  baseUrl: object;
  picUrl: object;
  api: object;
  language: string;
}

const config: Partial<IConfig> = {};

// 模拟用户
config.testUser = {
  tokenId: '',
  userCode: 'weijian4.chen',
  userName: '陈尉建',
};

// 接口配置
config.apiMeta = {
  successKey: 'code', // 成功标识字段
  successValue: 0, // 成功标识值
  errorKey: 'msg', // 错误提示信息字段
  intercept: true, // 是否拦截错误信息
};

// 运行模式: development | test | production
config.env = env;

// 当前语言: CN | EN
config.language = 'CN';

config.baseUrl = {
  // 本地环境
  development: '',
  // 测试环境
  test: '',
  // 生产环境
  production: '',
};

config.picUrl = {
  development: '',
  // 测试环境
  test: '',
  // 生产环境
  production: '',
};

// 接口请求
config.api = {
  commonHeaders: function () {
    let headers = {
      'X-AUTH-DEBUGGER': config.env === 'development' ? 'true' : 'false',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const user = store.getState().user;
    if (user.user) {
      headers['tokenId'] = user.user.tokenId;
      headers['userCode'] = user.user.userCode;
    }

    return headers;
  },
  getRequest: function (func, params) {
    let requestUrl = `${config.baseUrl[config.env]}/${func}`;
    if (!!params) {
      requestUrl += `?${qs.stringify(params)}`;
    }

    return {
      url: requestUrl,
      method: 'get',
      headers: this.commonHeaders(),
      data: {},
      meta: config.apiMeta,
    };
  },
  postRequest: function (func, params) {
    return {
      url: `${config.baseUrl[config.env]}/${func}`,
      method: 'post',
      data: qs.stringify(params || {}),
      headers: this.commonHeaders(),
      meta: config.apiMeta,
    };
  },
  postRequestPic: function (func, params) {
    return {
      url: `${config.picUrl[config.env]}/${func}`,
      method: 'post',
      data: qs.stringify(params || {}),
      headers: this.commonHeaders(),
      meta: config.apiMeta,
    };
  },
};

export default config;
