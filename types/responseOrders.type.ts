export default interface IResponseOrder {
  items: IListItemsOrder[];
  meta: IResponseMetaOrder;
}

export interface IListItemsOrder {
  id: string;
  buyerName: string;
  addressBuyer: string;
  shippingMethode: string;
  items: IResponseItemsOrder[];
  totalPrice: number;
  invoice: string;
  buyDate: string;
  isPaid: boolean;
  paymentMethode: string;
}

export interface IResponseItemsOrder {
  idProduct: string;
  productName: string;
  quantity: number;
  price: number;
  notes: string;
}

export interface IResponseMetaOrder {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
