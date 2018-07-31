export default abstract class BasePresenter<T> {
  constructor(public view: T) {}
}

export interface AppPresenter {
  initData: () => void;
  loadData: () => void;
  loadDataAsync: (duration: number) => void;
}
