import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FilterNotifierService} from "../filter-notifier.service";
import {of} from "rxjs";
import {StatisticsService} from "../statistics.service";
import {StatisticType} from "../shared/models/statistic-type.model";
import {StateAbbreviationType} from "../shared/models/state-abbreviation-type.model";
import {Component, Input} from "@angular/core";
import {InfoChartModel} from "../info-chart/info-chart.model";
import {InfoCardComponent} from "./info-card.component";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {TimeRangeType} from "../shared/models/time-range-type.model";

@Component({selector: 'cs-info-chart', template: ''})
class InfoChartComponent {
  @Input()
  infoChartData!: InfoChartModel;

  @Input()
  chartModel!: InfoChartModel;
}

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;
  let statisticsServiceSpy: StatisticsServiceSpy;

  const title = 'Recovered';
  const infoCardModel = {
    title: title,
    value: 100,
    color: 'red',
    statisticType: StatisticType.RECOVERED
  };

  class FilterNotifierServiceSpy {
    stateChanged = of(StateAbbreviationType.BB);
  }

  class StatisticsServiceSpy {
    statisticDataItems = [
      {date: '2021-07-26T00:00:00.000Z', value: 100},
      {date: '2021-07-27T00:00:00.000Z', value: 10}
    ];

    statistics = {
      total: 110,
      history: this.statisticDataItems
    };
    fetchData = jasmine.createSpy('fetchData(stateAbbr: StateAbbreviationType = StateAbbreviationType.DE, timeRange: TimeRangeType = TimeRangeType.ALL, type: StatisticType = StatisticType.CASES)')
    .and.returnValue(of(this.statistics));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InfoCardComponent,
        InfoChartComponent
      ],
      imports: [
        MatCardModule,
        MatMenuModule
      ],
      providers: [
        {provide: FilterNotifierService, useClass: FilterNotifierServiceSpy},
        {provide: StatisticsService, useClass: StatisticsServiceSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
    component.model = infoCardModel;
    statisticsServiceSpy = TestBed.inject(StatisticsService) as any;
    fixture.detectChanges();
    fixture.whenStable().then(() => fixture.detectChanges());
    fixture.whenRenderingDone().then(() => fixture.detectChanges());

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data when time range changes', () => {
    component.applyTimeRange({name: 'all', value: TimeRangeType.ALL});
    expect(statisticsServiceSpy.fetchData).toHaveBeenCalled();
  });


  it('should display the chart', waitForAsync(() => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const infoChart = hostElement.querySelector('cs-info-chart');
    expect(infoChart).toBeTruthy();
  }));

  it('should display title and value', () => {
    const hostEl: HTMLElement = fixture.nativeElement;
    const titleEl = hostEl.querySelector('.title');
    const valueEl = hostEl.querySelector('.value');
    expect(titleEl!.textContent).toBe(infoCardModel.title);
    expect(valueEl!.textContent).toBe(infoCardModel.value.toString());
  });
});
