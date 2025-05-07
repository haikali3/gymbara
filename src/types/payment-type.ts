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
  cancel_at_period_end: boolean;
  subscription_id: string;
  expiration_date: string | number | Date;
  url?: string;
  is_active: boolean;
};

export type RenewSubscriptionResponse = {
  subscription_id: string;
  expiration_date: string;
  url: string;
};