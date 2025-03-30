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