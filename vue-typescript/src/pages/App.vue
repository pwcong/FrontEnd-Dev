<template>
    <div class="container">
        <h1>
            {{title}}
        </h1>
        <h2>
            {{helloCounts}}
        </h2>

        <button type="button" @click="handleButtonClick">Plus</button>

    </div>
</template>

<style>
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {}
})
export default class App extends Vue {
  // data
  title: string = 'Hello World !';
  counts: number = 0;

  // methods
  handleButtonClick(e: MouseEvent) {
    this.counts++;
  }

  // computed
  get helloCounts(): string {
    return 'Hello Counts: ' + this.counts;
  }

  mounted() {}
}
</script>