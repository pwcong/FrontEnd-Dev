import env from './env';
import qs from 'qs';

import store, { USER_GETTERS_USER } from '@/store';

const config = {};

// 模拟用户
config.testUser = {
  tokenId: 'xxx',
  userCode: 'xxx',
  userName: 'xxx',
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

    const user = store.getters[USER_GETTERS_USER];
    if (!!user) {
      headers = {
        ...headers,
        tokenId: user.tokenId,
        userCode: user.userCode,
      };
    }

    return headers;
  },
  getRequest: function (func, params, options) {
    options = Object.assign(
      {
        meta: config.apiMeta,
        baseUrl: config.baseUrl,
      },
      options
    );

    const { baseUrl, headers } = options;

    let requestUrl = `${baseUrl[config.env]}/${func}`;
    if (!!params) {
      requestUrl += `?${qs.stringify(params)}`;
    }

    return {
      url: requestUrl,
      method: 'get',
      headers: headers || this.commonHeaders(),
      data: {},
      options,
    };
  },
  postRequest: function (func, params, options) {
    options = Object.assign(
      {
        meta: config.apiMeta,
        baseUrl: config.baseUrl,
      },
      options
    );

    const { baseUrl, headers } = options;

    return {
      url: `${baseUrl[config.env]}/${func}`,
      method: 'post',
      data: qs.stringify(params || {}),
      headers: headers || this.commonHeaders(),
      options,
    };
  },
  postRequestPic: function (func, params, options) {
    return this.postRequest(
      func,
      params,
      Object.assign({}, options, {
        baseUrl: config.picUrl,
      })
    );
  },
};

export default config;
