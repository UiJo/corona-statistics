import {StatisticDataItem} from "../shared/models/statistic.model";

export interface InfoChartModel {
  color: string;
  title: string;
  values: StatisticDataItem[];
}

