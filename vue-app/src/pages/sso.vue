<template>
  <div id="page-sso"></div>
</template>

<script>
import { Toast } from 'vant';

import config from '@/config';
import { USER_MUTATIONS_SET_USER } from '@/store';

export default {
  name: 'page-sso',
  created() {
    // 单点登录
    this.ssoLogin();
  },
  methods: {
    getUser() {
      return new Promise((resolve) => {
        if (config.env === 'development') {
          resolve(config.testUser);
          return;
        }
        // DO SOMETHING
      });
    },
    ssoLogin() {
      this.$store.commit(USER_MUTATIONS_SET_USER, null);
      const { returnUrl = '/' } = this.$route.query;

      const toast = Toast.loading({
        message: '自动登录中...',
        forbidClick: true,
        duration: 0,
      });

      // 调用原生接口获取用户信息
      this.getUser()
        .then((res) => {
          const { userCode, userName, tokenId } = res;

          this.$store.commit(USER_MUTATIONS_SET_USER, {
            tokenId,
            userCode,
            userName,
          });
          Toast.clear();
          this.$router.replace(decodeURIComponent(returnUrl));
        })
        .catch(() => {
          Toast.fail({
            message: '自动登录失败',
            forbidClick: true,
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-sso {
}
</style>
