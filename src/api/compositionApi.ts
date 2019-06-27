import { callApiWorker } from '@/utils/httpUtils';

/**
 * 获取商品的详情
 * @param id 商品的id号
 */
export function getCompositionDetai(id: string) {
  return callApiWorker({
    baseURL: 'mallApi',
    options: {
      url: `/compositions/${id}`,
    },
  });
}

/**
 * 获取首页列表
 * @param params 获取不同列表的参数
 */
export function getCompositionHomeList(params: object) {
  return callApiWorker({
    baseURL: 'mallApi',
    options: {
      url: '/compositions/list',
      params,
    },
  });
}
