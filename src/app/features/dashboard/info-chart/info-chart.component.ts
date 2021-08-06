import {Component, Input} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import {InfoChartModel} from "./info-chart.model";

@Component({
  selector: 'cs-info-chart',
  templateUrl: './info-chart.component.html',
  styleUrls: ['./info-chart.component.scss']
})
export class InfoChartComponent {

  @Input()
  set chartModel(value: InfoChartModel) {
    this._series = [
      {data: value.values.map(v => v.value)}
    ];

    this._yaxis.max = Math.max(...value.values.map(v => v.value)) * 1.1;

    this._xAxis = {
      axisBorder: {show: false},
      axisTicks: {show: false},
      tooltip: {enabled: false},
      type: "datetime",
      categories: value.values.map(v => v.date)
    };

    this._series[0].name = value.title;
    this._series[0].color = value.color;
    this._fill.colors?.push(value.color);
    this._stroke.colors?.push(value.color);
    this._colors?.push(value.color);

  }

  private _series: ApexAxisChartSeries;
  private readonly _chart: ApexChart;
  private _xAxis: ApexXAxis;
  private readonly _yaxis: ApexYAxis;
  private readonly _stroke: ApexStroke;
  private readonly _fill: ApexFill;
  private readonly _tooltip: ApexTooltip;
  private _colors: string[];

  get series(): ApexAxisChartSeries {
    return this._series;
  }

  get chart(): ApexChart {
    return this._chart;
  }

  get xAxis(): ApexXAxis {
    return this._xAxis;
  }

  get yaxis(): ApexYAxis {
    return this._yaxis;
  }

  get stroke(): ApexStroke {
    return this._stroke;
  }

  get fill(): ApexFill {
    return this._fill;
  }

  get tooltip(): ApexTooltip {
    return this._tooltip;
  }

  constructor() {
    this._series = [];
    this._xAxis = {};

    this._chart = {
      foreColor: 'inherit',
      animations: {
        speed: 300,
        animateGradually: {
          enabled: false
        }
      },
      sparkline: {enabled: true},
      height: '100%',
      width: '100%',
      type: "area",
      toolbar: {show: false},
      zoom: {enabled: false}
    };

    this._stroke = {
      curve: "smooth",
      colors: []
    };

    this._yaxis = {
      axisTicks: {show: false},
      axisBorder: {show: false},
      show: false
    };

    this._fill = {
      colors: [],
      opacity: 0.5
    };

    this._colors = [];
    this._tooltip = {
      followCursor: true,
      theme: 'dark'
    };
  }


}
