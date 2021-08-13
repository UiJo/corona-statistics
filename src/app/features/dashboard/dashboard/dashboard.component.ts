import {Component, OnInit} from '@angular/core';
import {State} from "./state.model";
import {StateAbbreviationType} from "../shared/models/state-abbreviation-type.model";
import {InfoCardModel, InfoCardSimpleModel} from "../shared/models/info-card.model";
import {FilterNotifierService} from "../filter-notifier.service";
import {StatisticType} from "../shared/models/statistic-type.model";
import {StatisticsService} from "../statistics.service";

@Component({
  selector: 'cs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
/**
 * Displays corona statistic as cards.
 */
export class DashboardComponent implements OnInit {

  private _states: State[] = [
    {name: 'All states', abbreviation: StateAbbreviationType.DE},
    {name: 'Baden-Württemberg', abbreviation: StateAbbreviationType.BW},
    {name: 'Bayern', abbreviation: StateAbbreviationType.BY},
    {name: 'Brandeburg', abbreviation: StateAbbreviationType.BB},
    {name: 'Berlin', abbreviation: StateAbbreviationType.BE},
    {name: 'Bremen', abbreviation: StateAbbreviationType.HB},
    {name: 'Hamburg', abbreviation: StateAbbreviationType.HH},
    {name: 'Hessen', abbreviation: StateAbbreviationType.HE},
    {name: 'Mecklenburg-Vorpommern', abbreviation: StateAbbreviationType.MV},
    {name: 'Niedersachsen', abbreviation: StateAbbreviationType.NI},
    {name: 'Nordrhein-Westfalen', abbreviation: StateAbbreviationType.NW},
    {name: 'Rheinland-Pfalz', abbreviation: StateAbbreviationType.RP},
    {name: 'Saarland', abbreviation: StateAbbreviationType.SL},
    {name: 'Sachsen-Anhalt', abbreviation: StateAbbreviationType.ST},
    {name: 'Sachsen', abbreviation: StateAbbreviationType.SN},
    {name: 'Schleswig-Holstein', abbreviation: StateAbbreviationType.SH},
    {name: 'Thüringen', abbreviation: StateAbbreviationType.TH},
  ];

  private _selectedState: State = this._states[1];
  get selectedState(): State {
    return this._selectedState;
  }

  private readonly _cardCases: InfoCardModel;
  private readonly _cardDeaths: InfoCardModel;
  private readonly _cardRecovered: InfoCardModel;

  private readonly _cardWeekIncidence: InfoCardSimpleModel;
  private readonly _cardCasesPerWeek: InfoCardSimpleModel;
  private readonly _cardCasesPer100K: InfoCardSimpleModel;

  get cardCases(): InfoCardModel {
    return this._cardCases;
  }

  get cardDeaths(): InfoCardModel {
    return this._cardDeaths;
  }

  get cardRecovered(): InfoCardModel {
    return this._cardRecovered;
  }

  get states(): State[] {
    return this._states;
  }

  get cardWeekIncidence(): InfoCardSimpleModel {
    return this._cardWeekIncidence;
  }

  get cardCasesPerWeek(): InfoCardSimpleModel {
    return this._cardCasesPerWeek;
  }

  get cardCasesPer100K(): InfoCardSimpleModel {
    return this._cardCasesPer100K;
  }

  constructor(private _filterNotifierService: FilterNotifierService,
              private _statisticsService: StatisticsService) {

    this._cardCases = this.createCardModel(StatisticType.CASES, 'Cases', '#38BDF8');
    this._cardDeaths = this.createCardModel(StatisticType.DEATHS, 'Deaths', '#FB7185');
    this._cardRecovered = this.createCardModel(StatisticType.RECOVERED, 'Recovered', '#34D399');

    this._cardWeekIncidence = this.createSimpleCardModel('Week incidence');
    this._cardCasesPerWeek = this.createSimpleCardModel('Cases per week');
    this._cardCasesPer100K = this.createSimpleCardModel('Cases per 100K');
  }

  ngOnInit(): void {
    this.refreshSimpleCards();
  }

  applyStateChanged(state: State) {
    this._selectedState = state;
    this.refreshSimpleCards();
  }

  private createCardModel(statisticType: StatisticType, title: string, color: string): InfoCardModel {
    return {
      title: title,
      value: 0,
      color: color,
      statisticType: statisticType
    }
  }

  private createSimpleCardModel(title: string) {
    return {
      title: title,
      value: 0
    }
  }

  private refreshSimpleCards() {
    this._filterNotifierService.notifyStateChanged(this._selectedState.abbreviation);
    this._statisticsService.fetchSummary(this._selectedState.abbreviation)
    .subscribe(summary => {
      this._cardWeekIncidence.value = summary.weekIncidence;
      this._cardCasesPer100K.value = summary.casesPer100k;
      this._cardCasesPerWeek.value = summary.casesPerWeek;
    });
  }


}


