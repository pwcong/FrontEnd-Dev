export interface IBaseModel<T> {
  getData: () => Promise<T>;
  getDataAsync: (duration: number) => Promise<T>;
}
