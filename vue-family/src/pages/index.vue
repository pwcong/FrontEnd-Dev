<template>
  <div class="index">
    <div class="counter">
      <span>{{counts}}</span>
      <div>
        <button @click="plus">PLUS</button>
        <button @click="plusAsync">PLUS ASYNC</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SAMPLE_ACTIONS_PLUS, SAMPLE_ACTIONS_PLUS_ASYNC } from "../store/types";

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

<style lang="scss" scoped>
.index {
  text-align: center;

  .counter {
    span {
      font-size: 32px;
      padding: 24px;
      display: block;
    }

    button {
      border: 1px solid #41b883;
      background-color: white;
      padding: 8px 16px;
      color: #41b883;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #41b883;
        color: white;
      }
    }
  }
}
</style>
