import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {StateAbbreviationType} from "./shared/models/state-abbreviation-type.model";
import {TimeRangeType} from "./shared/models/time-range-type.model";
import {StatisticType} from "./shared/models/statistic-type.model";
import {Statistic, StatisticDataItem} from "./shared/models/statistic.model";
import {
  GermanyHistoryData,
  HistoryDataItem,
  StateHistoryData,
  StatesData,
  StatesSummary,
  StateSummary,
  Summary
} from "./statistic.models";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Fetches summary containing weekIncidence, casesPer100k and casesPerWeek.
   */
  public fetchSummary(stateAbbr: StateAbbreviationType = StateAbbreviationType.DE): Observable<Summary> {
    const url = this.getSummaryUrl(stateAbbr);
    if (stateAbbr === StateAbbreviationType.DE) {
      return this._httpClient.get<Summary>(url);
    } else {
      return this._httpClient.get<StatesSummary>(url).pipe(
        map(result => {
          const stateName = StateAbbreviationType[stateAbbr];
          return <Summary>result.data[stateName as keyof StateSummary];
        })
      );
    }
  }

  /**
   * Fetches the data for combinations of state, time range and statistic type.
   */
  public fetchData(stateAbbr: StateAbbreviationType = StateAbbreviationType.DE,
                   timeRange: TimeRangeType = TimeRangeType.ALL,
                   type: StatisticType = StatisticType.CASES): Observable<Statistic> {

    const url = this.getHistoryUrl(stateAbbr, timeRange, type);

    if (stateAbbr === StateAbbreviationType.DE) {
      return this._httpClient.get<GermanyHistoryData>(url).pipe(
        map(responses => {
          return StatisticsService.createStatistic(this.mapGermanyHistory(responses, type));
        })
      );
    } else {
      return this._httpClient.get<StateHistoryData>(url).pipe(
        map(responses => {
          return StatisticsService.createStatistic(this.mapStateHistory(responses, stateAbbr, type));
        })
      );
    }
  }

  public getHistoryUrl(stateAbbr: StateAbbreviationType, timeRange: TimeRangeType, type: StatisticType) {
    const days = timeRange === TimeRangeType.ALL ? '' : this._timeRangesToDaysMappings.get(timeRange);
    return `${API_URL}${StatisticsService.mapState(stateAbbr)}/history/${this.statisticTypes.get(type)}/${days}`;
  }

  public getSummaryUrl(stateAbbr: StateAbbreviationType) {
    return `${API_URL}${StatisticsService.mapState(stateAbbr)}`;
  }


  private static createStatistic(history: StatisticDataItem[]) {
    return {
      total: StatisticsService.mapHistoryItemsToTotals(history),
      history: history
    }
  }

  /** Counts total value based on history items.*/
  private static mapHistoryItemsToTotals(history: StatisticDataItem[]) {
    return history.map(historyItem => historyItem.value).reduce((a, b) => a + b, 0);
  }


  private mapGermanyHistory(response: GermanyHistoryData, type: StatisticType): StatisticDataItem[] {
    const t = this.statisticTypes.get(type);
    return response.data.map((historyItem: HistoryDataItem) => {
      return {
        date: historyItem.date,
        value: <number>historyItem[t as keyof HistoryDataItem]
      };
    });
  }

  private mapStateHistory(response: StateHistoryData, stateAbbr: StateAbbreviationType, type: StatisticType): StatisticDataItem[] {
    const s: string = StateAbbreviationType[stateAbbr];
    let history = response.data[s as keyof StatesData].history;
    const t = this.statisticTypes.get(type);
    return history.map((historyItem: HistoryDataItem) => {
      return {
        date: historyItem.date,
        value: <number>historyItem[t as keyof HistoryDataItem]
      };
    });
  }

  private static mapState(stateAbbr: StateAbbreviationType): string {
    if (stateAbbr === StateAbbreviationType.DE) {
      return 'germany';
    } else {
      return `states/${StateAbbreviationType[stateAbbr]}`;
    }
  }

  private _timeRangesToDaysMappings = new Map([
    [TimeRangeType.ALL, 0],
    [TimeRangeType.LAST_WEEK, 7],
    [TimeRangeType.LAST_2_WEEKS, 14],
    [TimeRangeType.LAST_3_WEEKS, 21],
    [TimeRangeType.LAST_4_WEEKS, 28],
  ]);

  private statisticTypes = new Map<StatisticType, string>([
    [StatisticType.CASES, 'cases'],
    [StatisticType.DEATHS, 'deaths'],
    [StatisticType.RECOVERED, 'recovered'],
  ]);
}

