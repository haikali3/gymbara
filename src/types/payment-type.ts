export interface OrderItem {
  name: string;
  price: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: OrderItem[];
  total: string;
}

export type Subscription = {
  expiration_date: string | number | Date;
  url?: string;
  is_active: boolean;
};