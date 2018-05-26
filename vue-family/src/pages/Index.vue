<template>
  <div class="index">
    <img :src="logo"/>
    <p>Hello World!</p>

    <div class="counter">
      <span>{{counts}}</span>
      <button @click="plus">PLUS</button>
      <button @click="plusAsync">PLUS ASYNC</button>

    </div>

  </div>
</template>

<script>
import LOGO from '@/assets/imgs/vue.png';

import { SAMPLE_ACTIONS_PLUS, SAMPLE_ACTIONS_PLUS_ASYNC } from '../store/types';

export default {
  data() {
    return {
      logo: LOGO
    };
  },
  methods: {
    plus(e) {
      this.$store.dispatch(SAMPLE_ACTIONS_PLUS);
    },
    plusAsync(e) {
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
      return this.$store.getters.counts;
    }
  }
};
</script>

<style scoped>
.index {
  padding: 24px;
  text-align: center;
}
</style>
