<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <keep-alive> -->
      <router-view class="router-view"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { DIRECTION_GETTERS_DIRECTION, LOADING_GETTERS_LOADING } from './store';

export default {
  name: 'app',
  data() {
    return {};
  },
  created() {
    // 全局后退方法
    this.$root.goBack = this.goBack;

    this.initApp();

    // 监听返回键
    document.addEventListener('backbutton', () => this.goBack(), false);
  },
  methods: {
    initApp() {
      if (this.$config.env !== 'development') {
        // DO SOMETHING
      }
    },
    goBack() {
      if (this.$route.path === '/') {
        if (this.$config.env !== 'development') {
          // EXIT
        }
      } else {
        this.$router.back();
      }
    },
  },
  computed: {
    ...mapGetters({
      loading: LOADING_GETTERS_LOADING,
      direction: DIRECTION_GETTERS_DIRECTION,
    }),
    transitionName() {
      return 'pop-' + (this.direction === 'reverse' ? 'out' : 'in');
    },
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  font-family: 'Microsoft YaHei', sans-serif;
  position: relative;
  height: 100%;
  width: 100%;
  color: #333333;
}

#app {
  background-color: #f4f4f4;
}

.router-view {
  width: 100%;
  height: 100%;
  position: relative;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
  overflow: auto;
}

.pop-out-enter-active,
.pop-out-leave-active,
.pop-in-enter-active,
.pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}

.pop-static-enter-active,
.pop-static-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}

.pop-static-enter-active {
  animation-name: popInStatic;
}

.pop-static-leave-active {
  animation-name: popInStatic;
}

.pop-out-enter-active {
  animation-name: popInLeft;
}

.pop-out-leave-active {
  animation-name: popOutRight;
}

.pop-in-enter-active {
  animation-name: popInRight;
}

.pop-in-leave-active {
  animation-name: popOutLeft;
}

@keyframes popInStatic {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutLeft {
  from {
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes popInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
