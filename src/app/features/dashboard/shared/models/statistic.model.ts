export interface Statistic {
  total: number;
  history: StatisticDataItem[];
}

export interface StatisticDataItem {
  date: string;
  value: number
}
