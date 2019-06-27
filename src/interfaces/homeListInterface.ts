export interface HomeListInterface {
  orderBy: [];
  orderByKey: string;
  orderByLoading: boolean;
  orderTotal: number;
  type: [];
  typeKey: string;
  typeLoading: boolean;
  typeTotal: number;
}

export interface HomeListApiInterface {
  [key: string]: string | number;
}
