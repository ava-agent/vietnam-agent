import {ExchangeRate, PriceReference, ExchangeTip, QuickAmount} from '../types';

export const exchangeRate: ExchangeRate = {
  from: 'CNY',
  to: 'VND',
  rate: 3500,
  lastUpdated: '2026-01-01',
};

export const quickAmounts: QuickAmount[] = [
  {cny: 50, label: '¥50'},
  {cny: 100, label: '¥100'},
  {cny: 200, label: '¥200'},
  {cny: 500, label: '¥500'},
  {cny: 1000, label: '¥1000'},
  {cny: 2000, label: '¥2000'},
  {cny: 5000, label: '¥5000'},
];

export const priceReferences: PriceReference[] = [
  {
    id: 'price_1',
    name: '一杯咖啡',
    vndPrice: 35000,
    cnyEquivalent: 10,
    icon: '☕',
    category: '饮品',
  },
  {
    id: 'price_2',
    name: '一碗河粉 (Pho)',
    vndPrice: 50000,
    cnyEquivalent: 14,
    icon: '🍜',
    category: '餐饮',
  },
  {
    id: 'price_3',
    name: '法棍三明治 (Banh Mi)',
    vndPrice: 25000,
    cnyEquivalent: 7,
    icon: '🥖',
    category: '餐饮',
  },
  {
    id: 'price_4',
    name: '一瓶啤酒',
    vndPrice: 20000,
    cnyEquivalent: 6,
    icon: '🍺',
    category: '饮品',
  },
  {
    id: 'price_5',
    name: '一瓶矿泉水',
    vndPrice: 10000,
    cnyEquivalent: 3,
    icon: '💧',
    category: '饮品',
  },
  {
    id: 'price_6',
    name: 'Grab打车(5公里)',
    vndPrice: 50000,
    cnyEquivalent: 14,
    icon: '🚗',
    category: '交通',
  },
  {
    id: 'price_7',
    name: '一顿中档餐厅',
    vndPrice: 200000,
    cnyEquivalent: 57,
    icon: '🍽️',
    category: '餐饮',
  },
  {
    id: 'price_8',
    name: '经济酒店(一晚)',
    vndPrice: 500000,
    cnyEquivalent: 143,
    icon: '🏨',
    category: '住宿',
  },
  {
    id: 'price_9',
    name: '越南按摩(1小时)',
    vndPrice: 250000,
    cnyEquivalent: 71,
    icon: '💆',
    category: '休闲',
  },
  {
    id: 'price_10',
    name: '椰子',
    vndPrice: 30000,
    cnyEquivalent: 9,
    icon: '🥥',
    category: '饮品',
  },
  {
    id: 'price_11',
    name: '春卷',
    vndPrice: 40000,
    cnyEquivalent: 11,
    icon: '🥟',
    category: '餐饮',
  },
  {
    id: 'price_12',
    name: '景点门票(均价)',
    vndPrice: 150000,
    cnyEquivalent: 43,
    icon: '🎫',
    category: '游览',
  },
];

export const exchangeTips: ExchangeTip[] = [
  {
    id: 'tip_1',
    title: '在哪里换钱最划算？',
    content:
      '推荐在越南当地的金店(Tiệm Vàng)换钱，汇率最好。其次是银行和ATM。机场汇率最差，建议少换一点应急即可。胡志明市滨城市场附近和范五老街一带有很多金店。',
    icon: 'cash',
  },
  {
    id: 'tip_2',
    title: 'ATM取现注意事项',
    content:
      '越南ATM每次取现上限一般200-500万越南盾(约400-1000元)。建议使用BIDV、Vietcombank等大银行的ATM。注意ATM可能会收取22,000-55,000越南盾手续费。',
    icon: 'card',
  },
  {
    id: 'tip_3',
    title: '小面额越南盾很重要',
    content:
      '越南盾面额大(最大50万盾)，日常消费要用到各种面额。建议换钱时要一些小面额纸币(1万、2万、5万盾)，方便给小费和坐公交。',
    icon: 'wallet',
  },
  {
    id: 'tip_4',
    title: '砍价和小费',
    content:
      '在越南市场购物记得砍价，一般从报价的3-5折开始还价。餐厅一般不需要小费，但高档餐厅会收5-10%服务费。酒店可给行李员1-2万越南盾小费。',
    icon: 'pricetag',
  },
  {
    id: 'tip_5',
    title: '快速心算技巧',
    content:
      '越南盾换算人民币的快速方法：去掉3个零再除以3.5。例如100,000越南盾 ≈ 100÷3.5 ≈ 28元人民币。简单记忆：1万盾约3元。',
    icon: 'calculator',
  },
];
