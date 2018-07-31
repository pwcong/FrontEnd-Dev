export interface BaseModel<T> {
  getData: () => Promise<T>;
  getDataAsync: (duration: number) => Promise<T>;
}
