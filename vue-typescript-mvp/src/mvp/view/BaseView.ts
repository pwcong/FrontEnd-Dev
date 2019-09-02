import AppItem from '../bean/AppItem';

interface IBaseView<T> {
}

export interface IAppView extends IBaseView<AppItem> {
  addItem: (item: AppItem) => void;
  alter: (msg: string) => void;
}
