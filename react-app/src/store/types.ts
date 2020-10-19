export * from './models';
import { IUserState } from './models';

export interface IStoreState {
  user: IUserState;
}
