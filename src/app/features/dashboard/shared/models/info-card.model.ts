import {StatisticType} from "./statistic-type.model";

export interface InfoCardSimpleModel {
  title: string;
  value: number;
}

export interface InfoCardModel extends InfoCardSimpleModel {
  color: string;
  statisticType: StatisticType;
}

