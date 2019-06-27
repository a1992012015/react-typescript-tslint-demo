export interface AxiosInterface {
  baseURL?: 'authApi' |'mallApi';
  options: {
    url: string;
    method?: 'post' | 'get' | 'put' | 'delete';
    params?: object;
    headers?: object;
    data?: object;
  };
}

export interface RequestConfigInterface {
  requestType: string;
  successType: string;
  errorType: string;
  isToken?: false;
  baseURL?: 'authApi' |'mallApi';
  storeKey: string;
  options: {
    url: string;
    method?: 'post' | 'get' | 'put' | 'delete';
    params?: object;
    headers?: object;
    data?: object;
  };
}

export interface CompositionListInterface {
  orderBy: [];
  orderByKey: string;
  orderByLoading: boolean;
  orderTotal: number;
  type: [];
  typeKey: string;
  typeLoading: boolean;
  typeTotal: number;
}

export type RequestFullInterface = CompositionListInterface;
