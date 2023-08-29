export default interface IResponseUsers {
  items: IListUsers[];
  meta: IResponseMeta;
}

export interface IListUsers {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;
  salt: string;
  isVerified: boolean;
}

export interface IResponseMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
