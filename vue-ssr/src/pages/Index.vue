<template>
  <div class="index">
    <div class="counter">
      <div>{{counts}}</div>
      <button @click="plus">PLUS</button>
      <button @click="plusAsync">PLUS ASYNC</button>
    </div>
  </div>
</template>

<script>
import LOGO from '@/assets/imgs/vue.png';

import {
  SAMPLE_ACTIONS_INIT,
  SAMPLE_ACTIONS_PLUS,
  SAMPLE_ACTIONS_PLUS_ASYNC
} from '../store/types';

import sampleModule from '@/store/modules/sample';

export default {
  data() {
    return {
      logo: LOGO
    };
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    store.registerModule('sample', sampleModule);
    return store.dispatch(SAMPLE_ACTIONS_INIT, {
      counts: Math.round(Math.random() * 100)
    });
  },
  // 重要信息：当多次访问路由时，
  // 避免在客户端重复注册模块。
  destroyed() {
    this.$store.unregisterModule('sample');
  },
  methods: {
    plus(e) {
      console.log('plus');
      this.$store.dispatch(SAMPLE_ACTIONS_PLUS);
    },
    plusAsync(e) {
      console.log('plusAsync');
      this.$store
        .dispatch(SAMPLE_ACTIONS_PLUS_ASYNC, {
          time: 2000
        })
        .then(() => {
          alert('Plus Async');
        });
    }
  },
  computed: {
    counts() {
      return this.$store.state.sample.counts;
    }
  }
};
</script>

<style lang="scss"  scoped>
.index {
  padding: 24px;
  text-align: center;
  button {
    cursor: pointer;
    border: 1px solid #41b883;
    color: #41b883;
    padding: 8px;
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s;
    &:hover {
      background-color: #41b883;
      color: white;
    }
  }
}
</style>
