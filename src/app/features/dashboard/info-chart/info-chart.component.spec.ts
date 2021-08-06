import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoChartComponent} from './info-chart.component';
import {NgApexchartsModule} from "ng-apexcharts";

describe('InfoChartComponent', () => {
  let component: InfoChartComponent;
  let fixture: ComponentFixture<InfoChartComponent>;

  const title = 'Recovered';
  const infoChartModel = {
    color: '#123456',
    title: title,
    values: [
      {date: '2021-07-26T00:00:00.000Z', value: 100},
      {date: '2021-07-27T00:00:00.000Z', value: 1000}
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoChartComponent],
      imports: [NgApexchartsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoChartComponent);
    component = fixture.componentInstance;
    component.chartModel = infoChartModel;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the apx-chart', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const infoChart = hostElement.querySelector('apx-chart');
    expect(infoChart).toBeTruthy();
  });
});
