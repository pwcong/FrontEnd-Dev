import { BaseModel } from '../BaseModel';
import AppItem from '../../bean/AppItem';

export default class AppModelImpl implements BaseModel<AppItem> {
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
