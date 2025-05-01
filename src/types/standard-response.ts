
export interface StandardResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data?: any;
}