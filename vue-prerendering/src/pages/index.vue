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
import LOGO from "@/assets/imgs/vue.png";

import { SAMPLE_ACTIONS_PLUS, SAMPLE_ACTIONS_PLUS_ASYNC } from "../store/types";

export default {
  data() {
    return {
      logo: LOGO
    };
  },
  methods: {
    plus(e) {
      console.log("plus");
      this.$store.dispatch(SAMPLE_ACTIONS_PLUS);
    },
    plusAsync(e) {
      console.log("plusAsync");
      this.$store
        .dispatch(SAMPLE_ACTIONS_PLUS_ASYNC, {
          time: 2000
        })
        .then(() => {
          alert("Plus Async");
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
