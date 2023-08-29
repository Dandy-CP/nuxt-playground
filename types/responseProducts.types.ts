export default interface IResponseProducts {
  items: IResponseItems[];
  meta: IResponseMeta;
}

export interface IResponseItems {
  id: string;
  productName: string;
  category: string;
  price: number;
  stock: number;
}

export interface IResponseMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
