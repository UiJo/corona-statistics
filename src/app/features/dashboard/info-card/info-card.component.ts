import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {TimeRange} from "./time-range.model";
import {TimeRangeType} from "../shared/models/time-range-type.model";
import {StateAbbreviationType} from "../shared/models/state-abbreviation-type.model";
import {InfoChartModel} from "../info-chart/info-chart.model";
import {InfoCardModel} from "../shared/models/info-card.model";
import {StatisticsService} from "../statistics.service";
import {FilterNotifierService} from "../filter-notifier.service";


@Component({
  selector: 'cs-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss', '../shared/scss/card.scss']
})
/**
 * Displays title, value and chart.
 * Fetches the data from a service.
 * Reacts to notification about the state change.
 */
export class InfoCardComponent implements OnInit, OnDestroy {

  private _timeRanges: TimeRange[] = [
    {name: 'All', value: TimeRangeType.ALL},
    {name: 'Last Week', value: TimeRangeType.LAST_WEEK},
    {name: 'Last 2 Weeks', value: TimeRangeType.LAST_2_WEEKS},
    {name: 'Last 3 Weeks', value: TimeRangeType.LAST_3_WEEKS},
    {name: 'Last 4 Weeks', value: TimeRangeType.LAST_4_WEEKS}
  ];
  get timeRanges(): TimeRange[] {
    return this._timeRanges;
  }

  private _selectedTimeRange = this._timeRanges[1];
  get selectedTimeRange(): TimeRange {
    return this._selectedTimeRange;
  }

  private _state!: StateAbbreviationType;

  private _chartModel!: InfoChartModel;
  get chartModel(): InfoChartModel {
    return this._chartModel;
  }

  @Input()
  model!: InfoCardModel;

  private _unsubscribeAll = new Subject<any>();

  constructor(private _statisticsService: StatisticsService,
              private _filterNotifierService: FilterNotifierService) {
  }

  ngOnInit(): void {
    this._filterNotifierService.stateChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(state => {
      this._state = state;
      this.refresh();
    });

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  applyTimeRange(timeRange: TimeRange) {
    this._selectedTimeRange = timeRange;
    this.refresh();
  }

  private refresh() {
    this._statisticsService.fetchData(this._state, this._selectedTimeRange.value, this.model.statisticType)
    .subscribe(
      statistic => {
        this.model.value = statistic.total;
        this._chartModel = {
          title: this.model.title,
          color: this.model.color,
          values: statistic.total > 0 ? statistic.history : []
        }
      }
    );
  }


}


