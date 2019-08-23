const headerNavigation = [
  {
    name: '首页',
    path: '/home',
    key: '/home',
    icon: 'message',
  },
  {
    name: '我是卖家',
    path: '/seller',
    key: '/seller',
    icon: 'key',
  },
  {
    name: '我是买家',
    path: '/buyer',
    key: '/buyer',
    icon: 'shopping',
  },
];

const headerUserMenu = [
  {
    name: '我的账户',
    path: '/user',
    icon: 'user',
  },
  // {
  //   name: '我的收藏',
  //   path: '/Buyer/buy-works',
  //   icon: 'appstore'
  // },
  // {
  //   name: '授权查询',
  //   path: '/Buyer/shopping-cart',
  //   icon: 'shopping-cart'
  // },
  {
    name: '成为卖家',
    path: '/copyright/registration',
    icon: 'project',
  },
  {
    name: '登出',
    path: '/unlock',
    icon: 'unlock',
  },
];

const homeList = [
  {
    name: '全部',
    key: 'ALL',
  },
  {
    name: '音乐作品',
    key: 'AUDIO',
  },
  {
    name: '视频作品',
    key: 'VIDEO',
  },
  {
    name: '文学作品',
    key: 'WORD',
  },
  {
    name: '图片作品',
    key: 'PICTURE',
  },
];

const managementNavigation = [
  {
    name: '作者中心',
    img: require('@/assets/images/manage_icon_1.png'),
    icon: 'highlight',
    key: 'Author.jsx',
    to: '/copyright',
  },
  {
    name: '作品登记',
    img: require('@/assets/images/manage_icon_2.png'),
    icon: 'shopping-cart',
    key: 'registration',
    to: '/copyright/registration',
  },
  {
    name: '我的作品',
    img: require('@/assets/images/manage_icon_3.png'),
    icon: 'appstore',
    key: 'works',
    to: '/copyright/works',
  },
  {
    name: '我的商品',
    img: require('@/assets/images/manage_icon_4.png'),
    icon: 'appstore',
    key: 'product',
    to: '/copyright/product',
  },
  // {
  //   name: '交易管理',
  //   icon: 'setting',
  //   key: 'transaction',
  //   to: '/copyright/transaction'
  // }
];

const userNavigation = [
  {
    name: '我的商城',
    icon: 'appstore',
    key: 'Profile.jsx',
    to: '/Buyer',
  },
  {
    name: '已购买份数',
    icon: 'appstore',
    key: 'buy-works',
    to: '/Buyer/buy-works',
  },
  {
    name: '我的购物车',
    icon: 'appstore',
    key: 'shopping-cart',
    to: '/Buyer/shopping-cart',
  },
  {
    name: '订单管理',
    icon: 'appstore',
    key: 'transaction',
    to: '/Buyer/Transaction',
  },
];

export { managementNavigation, headerNavigation, headerUserMenu, homeList, userNavigation };
