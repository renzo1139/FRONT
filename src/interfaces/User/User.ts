export interface IUser {
  id: number;
  name: string;
  password: string;
  role: string;
  permissions: IPermissions[];
  created_at: string;
}

export interface IPermissions {
  id: number;
  name: string;
  user: IUser[];
  created_at: string;
}

export interface IDeleteUser {
  id: number;
}

export interface INewUser {
  name: string;
  password: string;
  role: string;
}

export interface IDeleteOrAddAdmin {
  id: number;
}
