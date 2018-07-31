import AppItem from '../bean/AppItem';

interface BaseView<T> {
}

export interface AppView extends BaseView<AppItem> {
  addItem: (item: AppItem) => void;
  alter: (msg: string) => void;
}
