import axios from 'axios';
import { Toast } from 'vant';

const instance = axios.create({
  timeout: 10000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config.loadingTimer = setTimeout(
      () =>
        Toast.loading({
          message: '请求中...',
          duration: 0,
          forbidClick: true,
        }),
      2000
    );
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    clearTimeout(response.config.loadingTimer);

    const { config = {}, data = {} } = response;

    const { options = {} } = config;

    const { intercept = true, successKey, successValue, errorKey } =
      options.meta || {};

    if (intercept) {
      if (data[successKey] !== successValue) {
        const message = data[errorKey] || '请求失败';
        Toast.fail({
          message,
          forbidClick: true,
        });
        const error = new Error(message);
        error.response = response;
        error.data = data;
        throw error;
      }
    }

    return data;
  },
  function (error) {
    clearTimeout(error.config.loadingTimer);

    if (error.code === 'ECONNABORTED') {
      Toast.fail({
        message: '请求超时',
        forbidClick: true,
      });
    } else {
      Toast.fail({
        message: error.response.statusText,
        forbidClick: true,
      });
    }

    return Promise.reject(error);
  }
);

export default {
  request: instance.request,
};
