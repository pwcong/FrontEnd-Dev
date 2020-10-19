export interface IUser {
  tokenId: string;
  userName: string;
  userCode: string;
}

interface _IUserState {
  user: IUser;
}

export type IUserState = Partial<_IUserState>;
