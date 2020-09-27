export default abstract class BasePresenter<T> {
  constructor(public view: T) {}
}

export interface IAppPresenter {
  initData: () => void;
  loadData: () => void;
  loadDataAsync: (duration: number) => void;
}
