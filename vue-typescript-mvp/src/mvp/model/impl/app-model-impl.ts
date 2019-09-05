import { IBaseModel } from '../base-model';
import AppItem from '../../bean/app-item';

export default class AppModelImpl implements IBaseModel<AppItem> {
  index: number = 1;

  getData(): Promise<AppItem> {
    return Promise.resolve(new AppItem('AppItem-' + this.index++));
  }

  getDataAsync(duration: number): Promise<AppItem> {
    let item = new AppItem('AppItem-' + this.index++);

    return new Promise<AppItem>((resolve, reject) => {
      setTimeout(() => {
        resolve(item);
      }, duration);
    });
  }
}
