<template>
  <div class="container">
    <ul class="row list">
      <li class="item" v-for="(item, index) in items" :key="'item-' + index">{{ item.name }}</li>
    </ul>

    <div class="row">
      <button type="button" @click="handleAddItem">Add Item</button>
      <button type="button" @click="handleAddItemAsync">Add Item Async</button>
    </div>
  </div>
</template>

<style>
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { AppView } from "../mvp/view/BaseView";

import { AppPresenter } from "../mvp/presenter/BasePresenter";
import AppPresenterImpl from "../mvp/presenter/impl/AppPresenterImpl";

import AppItem from "../mvp/bean/AppItem";

@Component({
  props: {}
})
export default class App extends Vue implements AppView {
  presenter: AppPresenter;
  items: AppItem[] = [];

  constructor() {
    super();
    this.presenter = new AppPresenterImpl(this);
  }

  handleAddItem(e: MouseEvent) {
    this.presenter.loadData();
  }

  handleAddItemAsync(e: MouseEvent) {
    this.presenter.loadDataAsync(2000);
  }

  addItem(item: AppItem): void {
    this.items.push(item);
  }

  alter(msg: string): void {
    alert(msg);
  }

  mounted() {
    this.presenter.initData();
  }
}
</script>