
export interface StandardResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data?: any;
}

export interface CancelSubData {
  expiration_date: string;
  message: string;
  next_renewal: string;
}

export type CancelSubResponse = StandardResponse<CancelSubData>;
