import AppItem from '../bean/app-item';

interface IBaseView<T> {
}

export interface IAppView extends IBaseView<AppItem> {
  addItem: (item: AppItem) => void;
  alter: (msg: string) => void;
}
