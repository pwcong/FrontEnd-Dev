import config from '@/config';
import pkg from '@/../package.json';

const _MIDEA_COMMON = 'MideaCommon'; // 通用组件
const _MIDEA_USER = 'MideaUser'; // 用户信息相关
const _MIDEA_BARCODE = 'MideaBarcode'; // 二维码扫描相关
const _MIDEA_MAP = 'MideaMap'; // 地图定位相关
const _MIDEA_PDF = 'MideaPdf'; // 附近展示相关
const _MIDEA_ORG = 'Organization'; // 组织架构相关
const _Audio = 'Audio'; // 录音

let viewTimeOut = null;
let resumeFunc = null;

export default {
  /**
   * 获取设备平台
   * @returns {number}
   */
  getPlatForm() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    let flatform = 0;
    if (isAndroid) {
      flatform = 2;
    } else if (isiOS) {
      flatform = 1;
    }
    return flatform;
  },
  callApi(name, method, params) {
    /**
     * 调用cordova的方法
     * @param name {string} 方法组、类别
     * @param method {string} 方法名称
     * @param params {Array} 参数
     * @return {promise}
     */
    var promise = new Promise((resolve, reject) => {
      if (window['cordova']) {
        try {
          window['cordova'].exec(
            (msg) => {
              resolve(msg);
            },
            (msg) => {
              reject(msg);
            },
            name,
            method,
            params || []
          );
        } catch (e) {
          console.log('_error', 'widget error:', e);
          reject(e);
        }
      } else {
        console.log('_debug', 'Cordova is not exist');
      }
    });

    return promise;
  },
  /**
   * 验证密码，主要用于hr自助认证
   * @return {promise}
   */
  password() {
    return this.callApi(_MIDEA_COMMON, 'authPassword').then((message) => {
      if (message === 0) {
        this.password();
      } else if (message === -1) {
        this.exit();
      }
    });
  },
  /**
   * 显示菜单
   * @return {*|promise}
   */
  showMenu: function () {
    return this.callApi(_MIDEA_COMMON, 'showMenu', null);
  },
  /**
   * 显示导航
   * @return {*|promise}
   */
  showNav: function () {
    return this.callApi(_MIDEA_COMMON, 'showNav', null);
  },
  /**
   * 隐藏导航
   * @return {*|promise}
   */
  hideNav: function () {
    return this.callApi(_MIDEA_COMMON, 'hideNav', null);
  },
  /**
   * 退出应用
   * @return {*|promise}
   */
  exit: function () {
    return this.callApi(_MIDEA_COMMON, 'exit', null);
  },
  /**
   * 后退
   * @return {*|promise}
   */
  goBack: function () {
    return this.callApi(_MIDEA_COMMON, 'goBack', null);
  },
  /**
   * 开始监听手机摇动
   * @return {*|promise}
   */
  shake: function () {
    return this.callApi(_MIDEA_COMMON, 'shake', null);
  },
  /**
   * 停止监听手机摇动
   * @return {*|promise}
   */
  shakeStop: function () {
    return this.callApi(_MIDEA_COMMON, 'shakeStop', null);
  },
  /**
   * 显示悬浮菜单
   * @return {*|promise}
   */
  showFloat: function () {
    return this.callApi(_MIDEA_COMMON, 'showFloat', null);
  },
  /**
   * 隐藏悬浮菜单
   * @return {*|promise}
   */
  hideFloat: function () {
    return this.callApi(_MIDEA_COMMON, 'hideFloat', null);
  },
  /**
   * 获取当前语言
   * @return {*|promise}
   */
  language: function () {
    if (config.env === 'development') {
      return new Promise((resolve, reject) => {
        resolve({
          language: config.language,
        });
      });
    } else {
      return this.callApi(_MIDEA_COMMON, 'language', []);
    }
    // return this.callApi(_MIDEA_COMMON, 'language', null)
  },
  /**
   * 获取用户信息
   * @return {*|promise}
   */
  getUser: function () {
    // return this.callApi(_MIDEA_USER, 'getUser', null)
    if (config.env === 'development') {
      return Promise.resolve(config.testUser);
    } else {
      return this.callApi(_MIDEA_USER, 'getUser', []);
    }
  },
  /**
   * 启动扫码
   * @return {*|promise}
   */
  scan: function () {
    return this.callApi(_MIDEA_BARCODE, 'scan', null);
  },
  /**
   * 启动扫码
   * @return {*|promise}
   */
  scanNow: function () {
    return this.callApi(_MIDEA_BARCODE, 'scanNow', null);
  },
  /**
   * 获取扫码结果
   * @return {*|promise}
   */
  getScanExtra: function () {
    return this.callApi(_MIDEA_BARCODE, 'getScanExtra', null);
  },
  /**
   * 获取位置信息
   * @param arr {array} 参数
   * @return {*|promise}
   */
  location: function (arr) {
    return this.callApi(_MIDEA_MAP, 'location', arr);
  },
  /**
   * 开始更新位置信息
   * @param arr {array} 参数
   * @return {*|promise}
   */
  startUpdatingLocation: function (arr) {
    return this.callApi(_MIDEA_MAP, 'startUpdatingLocation', arr);
  },
  /**
   * 停止更新位置信息
   * @return {*|promise}
   */
  stopUpdatingLocation: function () {
    return this.callApi(_MIDEA_MAP, 'stopUpdatingLocation', null);
  },
  /**
   * 导航
   * @param arr {array} 参数
   * @return {*|promise}
   */
  navigation: function (arr) {
    return this.callApi(_MIDEA_MAP, 'navTo', arr);
  },
  /**
   * 拍照或选择图片
   * @param params {object} 参数
   * @return {*}
   */
  getPicture: function (params) {
    const imgPackageHeader = 'data:image/jpeg;base64,';
    if (config.env === 'development') {
      // 本地调试
      return new Promise((resolve, reject) => {
        resolve({
          base64Code: '',
          base64Url: imgPackageHeader + '',
        });
      });
    } else {
      // 测试或者生产环境
      let opt = {
        quality: params.quality || 75,
        destinationType: params.destinationType || 0,
        allowEdit: params.allowEdit || false,
        encodingType: params.encodingType || 0,
        targetWidth: params.targetWidth || 375,
        targetHeight: params.targetHeight || 667,
        saveToPhotoAlbum: params.saveToPhotoAlbum || false,
        sourceType: params.sourceType || 0,
        mediaType: params.mediaType || 0,
        correctOrientation: params.correctOrientation || true,
        cameraDirection: params.cameraDirection || 0,
      };
      return new Promise((resolve, reject) => {
        try {
          navigator['camera'].getPicture(
            (data) => {
              resolve({
                base64Code: data,
                base64Url: imgPackageHeader + data,
              });
            },
            (data) => {
              reject(data);
            },
            opt
          );
        } catch (e) {
          reject(e);
        }
      });
    }
  },
  /**
   * 获取通讯录
   * @param fields {string} 查找内容
   * @param options {array} 参数
   * @return {*}
   */
  getContact: function (fields, options) {
    var promise = new Promise((resolve, reject) => {
      try {
        navigator['service'].contacts.find(
          fields,
          function (msg) {
            resolve(msg);
          },
          function (msg) {
            reject(msg);
          },
          options
        );
      } catch (e) {
        reject(e);
      }
    });

    return promise;
  },
  /**
   * 组织架构单选
   * @return {*|promise}
   */
  orgChoose: function () {
    return this.callApi(_MIDEA_USER, 'orgChoose', null);
  },
  /**
   * 组织架构多选
   * @param p {array} 参数
   * @return {*|promise}
   */
  orgMuChoose: function (p) {
    return this.callApi(_MIDEA_USER, 'orgMuChoose', p);
  },
  /**
   * 根据组织id获取组织内容
   * @param p {array} 参数
   * {
      "withChild": true,
      "withUser": true,
      "departId": orgId
    }
   * @return {*|promise}
   */
  fetchDepart: function (p) {
    return this.callApi(_MIDEA_ORG, 'fetchDepart', p);
  },
  /**
   * 改变状态栏颜色-仅IOS
   * @param p {array} 参数 [r, g, b]
   * @return {*|promise}
   */
  changeColor: function (p) {
    return this.callApi(_MIDEA_COMMON, 'statusBarColor', p);
  },
  changeColorAndroid: function (p) {
    return this.callApi(_MIDEA_COMMON, 'statusBarColor4Android', p);
  },
  /**
   * 登出，注销用户
   * @return {*|promise}
   */
  logout: function () {
    return this.callApi(_MIDEA_COMMON, 'logout', null);
  },
  /**
   * 获取webview信息
   * @return {*|promise}
   */
  webview: function () {
    return this.callApi(_MIDEA_COMMON, 'webview', null);
  },
  /**
   * 获取屏幕信息
   * @return {*|promise}
   */
  screen: function () {
    return this.callApi(_MIDEA_COMMON, 'screen', null);
  },
  /**
   * 获取额外启动参数
   * @param params {array} 参数
   * @return {*|promise}
   */
  getExtra: function (params) {
    return this.callApi(_MIDEA_COMMON, 'getExtra', params || [pkg['identify']]);
  },
  /**
   * 获取设备信息
   * @return {*|promise}
   */
  getDeviceInfo: function () {
    return this.callApi(_MIDEA_COMMON, 'getDeviceInfo', null);
  },
  /**
   * 用外部浏览器打开链接
   * @param url {string} 链接地址url
   * @return {*|promise}
   */
  openUrl: function (url) {
    return this.callApi(_MIDEA_COMMON, 'openSysBrowser', [url]);
  },
  /**
   * h5事件监听
   * @param params {array} 参数
   * @return {*|promise}
   */
  statistics: function (params) {
    return this.callApi(_MIDEA_COMMON, 'onEvent', params);
  },
  /**
   * 分享
   * @param params {array} 参数
   * @return {*|promise}
   */
  share: function (params) {
    return this.callApi(_MIDEA_COMMON, 'share', params);
  },
  /**
   * 打开应用页面
   * @return {*|promise}
   */
  showAppView: function () {
    return this.callApi(_MIDEA_COMMON, 'showAppView', ['messageView']);
  },
  /**
   * 打开时间日期选择
   * @param params {array} 参数
   * @return {*}
   */
  showPicker: function (params) {
    var promise = new Promise((resolve, reject) => {
      if (window['datePicker']) {
        params = Object.assign(
          {
            date: new Date(),
            mode: 'date',
            type: 'day',
          },
          params
        );

        window['datePicker'] &&
          window['datePicker'].show(params, function (date) {
            resolve(date);
          });
      } else {
      }
    });
    return promise;
  },
  /**
   * 打开通讯录
   * @return {*|promise}
   */
  getPhoneMan: function () {
    return this.callApi(_MIDEA_USER, 'getContact', null);
  },
  /**
   * 打开个人设置页面
   * @return {*|promise}
   */
  goPersonalSet: function () {
    return this.callApi(_MIDEA_COMMON, 'showSetView', null);
  },
  /**
   * 打开“我的”页面
   * @return {*|promise}
   */
  goMyView: function () {
    return this.callApi(_MIDEA_COMMON, 'showMyView', null);
  },
  /**
   * 打开widget
   * @param params {array} 参数
   * @return {*|promise}
   */
  showWidget: function (params) {
    return this.callApi(_MIDEA_COMMON, 'showWidget', params);
  },
  /**
   * 显示键盘
   * @return {*|promise}
   */
  showInput: function () {
    return this.callApi(_MIDEA_COMMON, 'showInput', null);
  },
  /**
   * 隐藏键盘
   * @return {*|promise}
   */
  hideInput: function () {
    return this.callApi(_MIDEA_COMMON, 'hideInput', null);
  },
  /**
   * 打开消息页面
   * @return {*|promise}
   */
  showMessageView: function () {
    return this.callApi(_MIDEA_COMMON, 'showAppView', ['messageView']);
  },
  /**
   * 批量将图片转换成base64码
   * @param pictureList {array} 图片列表
   * @return {*|promise}
   */
  getBase64CodeFromPictures: function (pictureList) {
    return this.callApi(_MIDEA_COMMON, 'getBase64s', pictureList);
  },
  /**
   * 跳转到系统设置页面，
   * @param arr arr[0]为要跳转的对应的设置页面，暂时支持  蜂窝网络：CellularNetWork，WIFI：WIFI
   * @returns {*}
   */
  gotoSystemSetting: function (arr) {
    return this.callApi(_MIDEA_COMMON, 'gotoSystemSetting', arr);
  },
  /**
   * 附件展示
   * @param param {array} 附件链接url列表
   * @return {Promise}
   */
  readPdf: function (param) {
    return this.callApi(_MIDEA_COMMON, 'readPdf', param);
  },
  /**
   * 附件txt展示
   * @param param {array} 参数
   * @return {Promise}
   */
  showTxt: function (param) {
    return this.callApi(_MIDEA_PDF, 'showTxt', param);
  },
  /**
   * @description 获取底座密码
   * @returns {Promise}
   */
  getUserPassword: function () {
    return this.callApi(_MIDEA_USER, 'getUserPassword', []);
  },
  /**
   * @description 打电话（底座有bug）
   * @param phoneNumber {string}
   * @returns {Promise}
   */
  financeCall: function (phoneNumber) {
    return this.callApi(_MIDEA_COMMON, 'callPhone', [phoneNumber]);
  },
  /**
   *  跳转到 IM沟通
   * @param userId {string}
   * @returns {Promise}
   */
  imCommunicate: function (userId) {
    return this.callApi(_MIDEA_USER, 'vcard', [userId]);
  },
  /**
   *  是否禁用webview橡皮筋效果
   * @param params params '1': 启用 '0': 禁止
   * @returns {*}
   */
  setBounces(params) {
    return this.callApi(_MIDEA_COMMON, 'setBounces', [params]);
  },
  /**
   * 打开外链url
   * @param url {string} 链接地址url
   * @return {*|promise}
   */
  neiOpenUrl: function (url) {
    if (config.env === 'local') {
      window.open(url);
    } else {
      return this.callApi(_MIDEA_COMMON, 'openUrl', [url]);
    }
  },
  /**
   *  开始录音
   *  time 最大录音时间，单位：毫秒 (默认为15s)
   */
  playAudio() {
    return this.callApi(_Audio, 'startRecord', [{ maxRecordDuration: 60 }]);
  },
  /**
   *  停止录音
   */
  stopAudio() {
    return this.callApi(_Audio, 'stopRecord', []);
  },
  /**
   * 取消录音
   */
  cancelRecord() {
    return this.callApi(_Audio, 'cancelRecord', []);
  },
  /**
   *  判断安卓、ios
   * @param
   * @returns true:false
   */
  isAndroid() {
    let u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  },
  isIOS() {
    let u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  saveToGallery(url) {
    return this.callApi(_MIDEA_COMMON, 'saveToGallery', [url]);
  },
  /*
   **
   **  从其他 应用中返回 调用 传入的fun方法
   **  @param fun { Function } 回调方法
   **
   */
  viewAppear(fun) {
    if (this.isIOS) {
      clearTimeout(viewTimeOut);
      viewTimeOut = window.setInterval(function () {
        new Promise((resolve, reject) => {
          if (window['cordova']) {
            try {
              window['cordova'].exec(
                (msg) => {
                  fun();
                  // this.viewAppear(fun)
                  resolve(msg);
                },
                (msg) => {
                  reject(msg);
                },
                'MideaCommon',
                'moniterViewAppear',
                null
              );
            } catch (e) {
              reject(e);
            }
          } else {
          }
        });
      }, 1000);
    }
    if (this.isAndroid) {
      try {
        resumeFunc != null &&
          document.removeEventListener('resume', resumeFunc, false);
        resumeFunc = fun;
        document.addEventListener('resume', resumeFunc, false);
      } catch (e) {}
    }
  },
};
