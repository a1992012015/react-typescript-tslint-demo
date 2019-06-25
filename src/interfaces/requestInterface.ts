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
