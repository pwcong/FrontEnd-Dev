<template>
  <div class="index">
    <div class="counter">
      <span>{{counts}}</span>
      <button @click="plus">PLUS</button>
      <button @click="plusAsync">PLUS ASYNC</button>
    </div>
  </div>
</template>

<script>
import { SAMPLE_ACTIONS_PLUS, SAMPLE_ACTIONS_PLUS_ASYNC } from '../store/types';

export default {
  data() {
    return {};
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
