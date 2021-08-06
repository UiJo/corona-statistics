import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {of} from "rxjs";

import {NgApexchartsModule} from "ng-apexcharts";
import {StateAbbreviationType} from "../shared/models/state-abbreviation-type.model";
import {FilterNotifierService} from "../filter-notifier.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Component, Input} from "@angular/core";
import {InfoCardModel, InfoCardSimpleModel} from "../shared/models/info-card.model";
import {StatisticsService} from "../statistics.service";
import {Summary} from "../statistic.models";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";

@Component({selector: 'cs-info-card', template: ''})
class InfoCardComponent {
  @Input()
  model!: InfoCardModel;
}

@Component({selector: 'cs-info-card-simple', template: ''})
class InfoCardSimpleComponent {
  @Input()
  model!: InfoCardSimpleModel;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let filterNotifierServiceSpy: FilterNotifierServiceSpy;

  class FilterNotifierServiceSpy {
    stateChanged = of(StateAbbreviationType.BB);
    notifyStateChanged = jasmine.createSpy('notifyStateChanged(state: StateAbbreviationType)')
    .and.callFake(() => {
    });
  }

  class StatisticsServiceSpy {
    summary: Summary = {
      weekIncidence: 10,
      casesPer100k: 5,
      casesPerWeek: 8
    };
    fetchSummary = jasmine.createSpy('fetchSummary(stateAbbr: StateAbbreviationType = StateAbbreviationType.DE)')
    .and.returnValue(of(this.summary));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        InfoCardSimpleComponent,
        InfoCardComponent
      ],
      providers: [
        {provide: FilterNotifierService, useClass: FilterNotifierServiceSpy},
        {provide: StatisticsService, useClass: StatisticsServiceSpy}
      ],
      imports: [
        NgApexchartsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatMenuModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    filterNotifierServiceSpy = TestBed.inject(FilterNotifierService) as any;

    fixture.detectChanges();
    fixture.whenStable().then(() => fixture.detectChanges());
    fixture.whenRenderingDone().then(() => fixture.detectChanges());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 3 info cards', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const infoCharts = hostElement.querySelectorAll('cs-info-card');
    expect(infoCharts.length).toEqual(3);
  });

  it('should notify when state selection changes', () => {
    component.applyStateChanged({name: 'Hamburg', abbreviation: StateAbbreviationType.HH});
    expect(filterNotifierServiceSpy.notifyStateChanged).toHaveBeenCalled();
  });
});
