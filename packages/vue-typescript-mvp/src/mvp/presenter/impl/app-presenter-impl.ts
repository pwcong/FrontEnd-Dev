import { IAppView } from '../../view/base-view';

import BasePresenter, { IAppPresenter } from '../base-presenter';

import AppModelImpl from '../../model/impl/app-model-impl';

export default class AppPresenterImpl extends BasePresenter<IAppView>
  implements IAppPresenter {
  model: AppModelImpl;

  constructor(view: IAppView) {
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
