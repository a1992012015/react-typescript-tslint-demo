import { HOME_LIST_GET_LIST, HOME_LIST_GET_LIST_ERROR, HOME_LIST_GET_LIST_SUCCESS } from '@/store/action-type/homeListType';
import { SHOPPING_CARD_DETAIL, SHOPPING_CARD_DETAIL_ERROR, SHOPPING_CARD_DETAIL_SUCCESS } from '@/store/action-type/shoppingCartType';
import { requestApiFetch } from '@/store/action/requestAction';

/**
 * 获取商品的详情
 * @param id 商品的id号
 */
export function getCompositionDetai(id: string) {
  return requestApiFetch({
    requestType: SHOPPING_CARD_DETAIL,
    successType: SHOPPING_CARD_DETAIL_SUCCESS,
    errorType: SHOPPING_CARD_DETAIL_ERROR,
    baseURL: 'mallApi',
    storeKey: 'compositionDetail',
    options: {
      url: `/compositions/${id}`,
    },
  });
}

/**
 * 获取首页列表
 * @param params 获取不同列表的参数
 */
export function getComposotionHomeList(params: object) {
  return requestApiFetch({
    requestType: HOME_LIST_GET_LIST,
    successType: HOME_LIST_GET_LIST_SUCCESS,
    errorType: HOME_LIST_GET_LIST_ERROR,
    baseURL: 'mallApi',
    storeKey: '',
    options: {
      url: '/compositions/list',
      params,
    },
  });
}
