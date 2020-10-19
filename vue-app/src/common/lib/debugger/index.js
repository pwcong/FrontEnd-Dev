import VConsole from 'vconsole';

let vcInited = false;

export default {
  install() {
    if (!vcInited) {
      new VConsole();
      vcInited = true;
    }
  },
};
