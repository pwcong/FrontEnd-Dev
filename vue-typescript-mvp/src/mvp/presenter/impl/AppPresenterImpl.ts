import { AppView } from '../../view/BaseView';

import BasePresenter from '../BasePresenter';
import { AppPresenter } from '../BasePresenter';

import AppModelImpl from '../../model/impl/AppModelImpl';

export default class AppPresenterImpl extends BasePresenter<AppView>
  implements AppPresenter {
  model: AppModelImpl;

  constructor(view: AppView) {
    super(view);

    this.model = new AppModelImpl();
  }

  initData(): void {
    this.model.getData().then(data => {
      this.view.addItem(data);
    });
  }

  loadData(): void {
    this.model.getData().then(item => {
      this.view.addItem(item);
    });
  }

  loadDataAsync(duration: number): void {
    this.model.getDataAsync(duration).then(item => {
      this.view.addItem(item);
      this.view.alter('loadDataAsync: ' + item.name);
    });
  }
}
