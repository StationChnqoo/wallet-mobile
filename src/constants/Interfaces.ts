export interface FundsCount {
  /** 涨跌额 */
  f3: number;
  /** 股票代码 */
  f12: string;
  /** 涨 跌 平 */
  f104: number;
  f105: number;
  f106: number;
}

export interface FundsValue {
  /** 股票价格 * 1000 */
  f43: number;
  /** 股票代号 */
  f57: string;
  /** 股票名字 */
  f58: string;
  /** 成交量 */
  f47: number;
  /** 成交额 */
  f48: number;
  /** 涨跌幅 */
  f170: number;
  /** 详情接口或者图片趋势的时候用 */
  code: string;
}

export interface Fonts {
  DOSIS: 'Dosis';
}

export interface FundsRank {
  /** 债券代号 */
  f12: string;
  /** 涨跌幅 */
  f3: number;
  /** 板块名字 */
  f14: string;
}

export interface PlanBuy {
  id: number; // 月份
  money: number; // 购买金额
  currentPrice: number; // 当前价格
  count: number; // 购买份额
}