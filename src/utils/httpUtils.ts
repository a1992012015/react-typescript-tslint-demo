import { environments } from '@/environments';
import { AxiosInterface } from '@/interfaces/requestInterface';
import { store } from '@/store';
import axios from 'axios';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      console.log(error);
      console.log(response);
      if (response) {
        return Promise.reject(response.data);
      } else if (error.status) {
        console.log('status', error.status);
      } else {
        return Promise.reject({
          status_code: 0,
          massage: '网络连接失败',
        });
      }
    },
);

export const callApiWorker = (config: AxiosInterface) => {
  const { auth } = store.getState();
  const axiosConfig = {
    ...config.options,
    baseURL: config.baseURL ? environments[config.baseURL] : environments.authApi,
    headers: {
      Authorization: `${auth.token.token_type} ${auth.token.access_token}`,
      ...config.options.headers,
    },
  };
  return axios(axiosConfig).then((response: any) => {
    if (response.data.status_code && response.data.status_code !== 200) {
      return Promise.reject(response.data);
    }
    return response.data;
  });
};
