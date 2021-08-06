import {TestBed} from '@angular/core/testing';
import {StatisticsService} from './statistics.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CoreModule} from "@app-core/core.module";
import {StateAbbreviationType} from "./shared/models/state-abbreviation-type.model";
import {TimeRangeType} from "./shared/models/time-range-type.model";
import {StatisticType} from "./shared/models/statistic-type.model";

describe('StatisticsService', () => {
  let service: StatisticsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [StatisticsService]
    });
    service = TestBed.inject(StatisticsService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should fetch all cases in germany from the beginning', () => {

    const mockResponseHistory = {
      "data": [{"recovered": 141, "date": "2021-07-26T00:00:00.000Z"},
        {"recovered": 126, "date": "2021-07-27T00:00:00.000Z"},
        {"recovered": 70, "date": "2021-07-28T00:00:00.000Z"},
        {"recovered": 46, "date": "2021-07-29T00:00:00.000Z"}
      ]
    };

    service.fetchData(StateAbbreviationType.DE, TimeRangeType.ALL, StatisticType.CASES).subscribe(
      statistics => {
        expect(statistics).not.toBeNull();
        expect(statistics.history.length).toEqual(4);
      }
    );

    const reqHistory = httpMock.expectOne(service.getHistoryUrl(StateAbbreviationType.DE, TimeRangeType.ALL, StatisticType.CASES));
    expect(reqHistory.request.method).toBe('GET');

    reqHistory.flush(mockResponseHistory);
    httpMock.verify();
  });


  it('should fetch recovered for Germany in the last 4 weeks', () => {

    const mockResponseHistory = {
      "data": [
        {"recovered": 1051, "date": "2021-07-06T00:00:00.000Z"},
        {"recovered": 856, "date": "2021-07-07T00:00:00.000Z"},
        {"recovered": 849, "date": "2021-07-08T00:00:00.000Z"},
        {"recovered": 825, "date": "2021-07-09T00:00:00.000Z"},
        {"recovered": 661, "date": "2021-07-10T00:00:00.000Z"},
        {"recovered": 266, "date": "2021-07-11T00:00:00.000Z"},
        {"recovered": 640, "date": "2021-07-12T00:00:00.000Z"},
        {"recovered": 1481, "date": "2021-07-13T00:00:00.000Z"},
        {"recovered": 1370, "date": "2021-07-14T00:00:00.000Z"},
        {"recovered": 1265, "date": "2021-07-15T00:00:00.000Z"},
        {"recovered": 1338, "date": "2021-07-16T00:00:00.000Z"}
      ]
    };

    service.fetchData(StateAbbreviationType.DE, TimeRangeType.LAST_4_WEEKS, StatisticType.RECOVERED).subscribe(
      statistics => {
        expect(statistics).not.toBeNull();
        expect(statistics.history.length).toEqual(mockResponseHistory.data.length);
      }
    );

    const reqHistory = httpMock.expectOne(service.getHistoryUrl(StateAbbreviationType.DE, TimeRangeType.LAST_4_WEEKS, StatisticType.RECOVERED));
    expect(reqHistory.request.method).toBe('GET');
    reqHistory.flush(mockResponseHistory);
    httpMock.verify();
  });


  it('should fetch deaths for Hamburg from the beginning', () => {

    const mockResponseHistory = {
      "data": {
        "HH": {
          "id": 2,
          "name": "Hamburg",
          "history": [{"deaths": 0, "date": "2020-02-29T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-03-01T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-03-02T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-03-03T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-03-04T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-03-05T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-03-06T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-03-07T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-03-08T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-03-09T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-03-10T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-03-11T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-03-12T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-03-13T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-03-14T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-03-15T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-03-16T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-03-17T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-03-18T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2020-03-19T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-03-20T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-03-21T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-03-22T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-03-23T00:00:00.000Z"
          }, {"deaths": 3, "date": "2020-03-24T00:00:00.000Z"}, {
            "deaths": 13,
            "date": "2020-03-25T00:00:00.000Z"
          }, {"deaths": 6, "date": "2020-03-26T00:00:00.000Z"}, {
            "deaths": 9,
            "date": "2020-03-27T00:00:00.000Z"
          }, {"deaths": 10, "date": "2020-03-28T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-03-29T00:00:00.000Z"
          }, {"deaths": 4, "date": "2020-03-30T00:00:00.000Z"}, {
            "deaths": 8,
            "date": "2020-03-31T00:00:00.000Z"
          }, {"deaths": 8, "date": "2020-04-01T00:00:00.000Z"}, {
            "deaths": 14,
            "date": "2020-04-02T00:00:00.000Z"
          }, {"deaths": 21, "date": "2020-04-03T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2020-04-04T00:00:00.000Z"
          }, {"deaths": 8, "date": "2020-04-05T00:00:00.000Z"}, {
            "deaths": 11,
            "date": "2020-04-06T00:00:00.000Z"
          }, {"deaths": 23, "date": "2020-04-07T00:00:00.000Z"}, {
            "deaths": 9,
            "date": "2020-04-08T00:00:00.000Z"
          }, {"deaths": 3, "date": "2020-04-09T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-04-10T00:00:00.000Z"
          }, {"deaths": 4, "date": "2020-04-11T00:00:00.000Z"}, {
            "deaths": 8,
            "date": "2020-04-12T00:00:00.000Z"
          }, {"deaths": 6, "date": "2020-04-13T00:00:00.000Z"}, {
            "deaths": 8,
            "date": "2020-04-14T00:00:00.000Z"
          }, {"deaths": 5, "date": "2020-04-15T00:00:00.000Z"}, {
            "deaths": 9,
            "date": "2020-04-16T00:00:00.000Z"
          }, {"deaths": 9, "date": "2020-04-17T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-04-18T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-04-19T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2020-04-20T00:00:00.000Z"
          }, {"deaths": 3, "date": "2020-04-21T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2020-04-22T00:00:00.000Z"
          }, {"deaths": 8, "date": "2020-04-23T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-04-24T00:00:00.000Z"
          }, {"deaths": 4, "date": "2020-04-25T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2020-04-26T00:00:00.000Z"
          }, {"deaths": 3, "date": "2020-04-27T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-04-28T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-04-29T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-04-30T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-01T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-02T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-03T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2020-05-04T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-05-05T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-05-06T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-05-07T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-05-08T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-09T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-10T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-05-11T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-12T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-13T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-05-14T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-15T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-16T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-05-17T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-18T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-19T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-05-20T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-21T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-22T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-23T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-24T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-25T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-26T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-27T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-28T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-29T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-05-30T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-05-31T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-01T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-02T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-03T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-04T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-05T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-06T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-07T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-08T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-09T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-10T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-11T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-12T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-13T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-14T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-15T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-16T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-17T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-18T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-19T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-20T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-21T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-22T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-23T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-24T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-25T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-26T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-27T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-28T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-06-29T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-06-30T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-01T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-02T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-03T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-04T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-07-05T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-06T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-07T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-08T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-09T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-10T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-11T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-12T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-13T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-14T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-15T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-16T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-17T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-18T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-19T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-20T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-07-21T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-22T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-23T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-24T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-25T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-26T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-27T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-28T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-29T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-07-30T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-07-31T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-01T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-02T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-08-03T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-04T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-05T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-06T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-07T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-08T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-09T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-08-10T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-11T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-12T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-13T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-14T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-15T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-16T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-17T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-08-18T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-19T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-20T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-21T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-22T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-23T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-24T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-25T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-26T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-27T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-28T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-29T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-08-30T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-08-31T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-01T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-02T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-03T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-09-04T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-05T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-06T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-07T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-08T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-09T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-09-10T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-11T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-09-12T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-13T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-09-14T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-15T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-16T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-17T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-18T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-19T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-20T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-21T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-22T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-23T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-24T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-25T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-09-26T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-27T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-09-28T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-09-29T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-09-30T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-10-01T00:00:00.000Z"
          }, {"deaths": 5, "date": "2020-10-02T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2020-10-03T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-10-04T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-10-05T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-10-06T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-10-07T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-10-08T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-10-09T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-10-10T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-10-11T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-10-12T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-10-13T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-10-14T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-10-15T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-10-16T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2020-10-17T00:00:00.000Z"
          }, {"deaths": 1, "date": "2020-10-18T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2020-10-19T00:00:00.000Z"
          }, {"deaths": 2, "date": "2020-10-20T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-10-21T00:00:00.000Z"
          }, {"deaths": 9, "date": "2020-10-22T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2020-10-23T00:00:00.000Z"
          }, {"deaths": 3, "date": "2020-10-24T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-10-25T00:00:00.000Z"
          }, {"deaths": 6, "date": "2020-10-26T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2020-10-27T00:00:00.000Z"
          }, {"deaths": 7, "date": "2020-10-28T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2020-10-29T00:00:00.000Z"
          }, {"deaths": 4, "date": "2020-10-30T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2020-10-31T00:00:00.000Z"
          }, {"deaths": 0, "date": "2020-11-01T00:00:00.000Z"}, {
            "deaths": 5,
            "date": "2020-11-02T00:00:00.000Z"
          }, {"deaths": 14, "date": "2020-11-03T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2020-11-04T00:00:00.000Z"
          }, {"deaths": 7, "date": "2020-11-05T00:00:00.000Z"}, {
            "deaths": 5,
            "date": "2020-11-06T00:00:00.000Z"
          }, {"deaths": 7, "date": "2020-11-07T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2020-11-08T00:00:00.000Z"
          }, {"deaths": 11, "date": "2020-11-09T00:00:00.000Z"}, {
            "deaths": 13,
            "date": "2020-11-10T00:00:00.000Z"
          }, {"deaths": 5, "date": "2020-11-11T00:00:00.000Z"}, {
            "deaths": 10,
            "date": "2020-11-12T00:00:00.000Z"
          }, {"deaths": 11, "date": "2020-11-13T00:00:00.000Z"}, {
            "deaths": 12,
            "date": "2020-11-14T00:00:00.000Z"
          }, {"deaths": 3, "date": "2020-11-15T00:00:00.000Z"}, {
            "deaths": 8,
            "date": "2020-11-16T00:00:00.000Z"
          }, {"deaths": 10, "date": "2020-11-17T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2020-11-18T00:00:00.000Z"
          }, {"deaths": 15, "date": "2020-11-19T00:00:00.000Z"}, {
            "deaths": 9,
            "date": "2020-11-20T00:00:00.000Z"
          }, {"deaths": 13, "date": "2020-11-21T00:00:00.000Z"}, {
            "deaths": 7,
            "date": "2020-11-22T00:00:00.000Z"
          }, {"deaths": 6, "date": "2020-11-23T00:00:00.000Z"}, {
            "deaths": 13,
            "date": "2020-11-24T00:00:00.000Z"
          }, {"deaths": 10, "date": "2020-11-25T00:00:00.000Z"}, {
            "deaths": 9,
            "date": "2020-11-26T00:00:00.000Z"
          }, {"deaths": 4, "date": "2020-11-27T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2020-11-28T00:00:00.000Z"
          }, {"deaths": 3, "date": "2020-11-29T00:00:00.000Z"}, {
            "deaths": 7,
            "date": "2020-11-30T00:00:00.000Z"
          }, {"deaths": 11, "date": "2020-12-01T00:00:00.000Z"}, {
            "deaths": 10,
            "date": "2020-12-02T00:00:00.000Z"
          }, {"deaths": 13, "date": "2020-12-03T00:00:00.000Z"}, {
            "deaths": 19,
            "date": "2020-12-04T00:00:00.000Z"
          }, {"deaths": 10, "date": "2020-12-05T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2020-12-06T00:00:00.000Z"
          }, {"deaths": 8, "date": "2020-12-07T00:00:00.000Z"}, {
            "deaths": 9,
            "date": "2020-12-08T00:00:00.000Z"
          }, {"deaths": 12, "date": "2020-12-09T00:00:00.000Z"}, {
            "deaths": 20,
            "date": "2020-12-10T00:00:00.000Z"
          }, {"deaths": 24, "date": "2020-12-11T00:00:00.000Z"}, {
            "deaths": 15,
            "date": "2020-12-12T00:00:00.000Z"
          }, {"deaths": 13, "date": "2020-12-13T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2020-12-14T00:00:00.000Z"
          }, {"deaths": 18, "date": "2020-12-15T00:00:00.000Z"}, {
            "deaths": 18,
            "date": "2020-12-16T00:00:00.000Z"
          }, {"deaths": 25, "date": "2020-12-17T00:00:00.000Z"}, {
            "deaths": 15,
            "date": "2020-12-18T00:00:00.000Z"
          }, {"deaths": 9, "date": "2020-12-19T00:00:00.000Z"}, {
            "deaths": 5,
            "date": "2020-12-20T00:00:00.000Z"
          }, {"deaths": 22, "date": "2020-12-21T00:00:00.000Z"}, {
            "deaths": 32,
            "date": "2020-12-22T00:00:00.000Z"
          }, {"deaths": 20, "date": "2020-12-23T00:00:00.000Z"}, {
            "deaths": 5,
            "date": "2020-12-24T00:00:00.000Z"
          }, {"deaths": 4, "date": "2020-12-25T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2020-12-26T00:00:00.000Z"
          }, {"deaths": 6, "date": "2020-12-27T00:00:00.000Z"}, {
            "deaths": 12,
            "date": "2020-12-28T00:00:00.000Z"
          }, {"deaths": 15, "date": "2020-12-29T00:00:00.000Z"}, {
            "deaths": 31,
            "date": "2020-12-30T00:00:00.000Z"
          }, {"deaths": 6, "date": "2020-12-31T00:00:00.000Z"}, {
            "deaths": 8,
            "date": "2021-01-01T00:00:00.000Z"
          }, {"deaths": 11, "date": "2021-01-02T00:00:00.000Z"}, {
            "deaths": 14,
            "date": "2021-01-03T00:00:00.000Z"
          }, {"deaths": 19, "date": "2021-01-04T00:00:00.000Z"}, {
            "deaths": 16,
            "date": "2021-01-05T00:00:00.000Z"
          }, {"deaths": 13, "date": "2021-01-06T00:00:00.000Z"}, {
            "deaths": 13,
            "date": "2021-01-07T00:00:00.000Z"
          }, {"deaths": 13, "date": "2021-01-08T00:00:00.000Z"}, {
            "deaths": 9,
            "date": "2021-01-09T00:00:00.000Z"
          }, {"deaths": 7, "date": "2021-01-10T00:00:00.000Z"}, {
            "deaths": 17,
            "date": "2021-01-11T00:00:00.000Z"
          }, {"deaths": 12, "date": "2021-01-12T00:00:00.000Z"}, {
            "deaths": 10,
            "date": "2021-01-13T00:00:00.000Z"
          }, {"deaths": 19, "date": "2021-01-14T00:00:00.000Z"}, {
            "deaths": 10,
            "date": "2021-01-15T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-01-16T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2021-01-17T00:00:00.000Z"
          }, {"deaths": 7, "date": "2021-01-18T00:00:00.000Z"}, {
            "deaths": 14,
            "date": "2021-01-19T00:00:00.000Z"
          }, {"deaths": 6, "date": "2021-01-20T00:00:00.000Z"}, {
            "deaths": 8,
            "date": "2021-01-21T00:00:00.000Z"
          }, {"deaths": 7, "date": "2021-01-22T00:00:00.000Z"}, {
            "deaths": 8,
            "date": "2021-01-23T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-01-24T00:00:00.000Z"}, {
            "deaths": 10,
            "date": "2021-01-25T00:00:00.000Z"
          }, {"deaths": 12, "date": "2021-01-26T00:00:00.000Z"}, {
            "deaths": 7,
            "date": "2021-01-27T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-01-28T00:00:00.000Z"}, {
            "deaths": 11,
            "date": "2021-01-29T00:00:00.000Z"
          }, {"deaths": 6, "date": "2021-01-30T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-01-31T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-02-01T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-02-02T00:00:00.000Z"
          }, {"deaths": 6, "date": "2021-02-03T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-02-04T00:00:00.000Z"
          }, {"deaths": 6, "date": "2021-02-05T00:00:00.000Z"}, {
            "deaths": 5,
            "date": "2021-02-06T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-02-07T00:00:00.000Z"}, {
            "deaths": 7,
            "date": "2021-02-08T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-02-09T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-02-10T00:00:00.000Z"
          }, {"deaths": 7, "date": "2021-02-11T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2021-02-12T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-02-13T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-02-14T00:00:00.000Z"
          }, {"deaths": 7, "date": "2021-02-15T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2021-02-16T00:00:00.000Z"
          }, {"deaths": 8, "date": "2021-02-17T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-02-18T00:00:00.000Z"
          }, {"deaths": 6, "date": "2021-02-19T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-02-20T00:00:00.000Z"
          }, {"deaths": 4, "date": "2021-02-21T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2021-02-22T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-02-23T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-02-24T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-02-25T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2021-02-26T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-02-27T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2021-02-28T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-03-01T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-03-02T00:00:00.000Z"
          }, {"deaths": 4, "date": "2021-03-03T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-03-04T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-03-05T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-03-06T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-03-07T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-03-08T00:00:00.000Z"
          }, {"deaths": 5, "date": "2021-03-09T00:00:00.000Z"}, {
            "deaths": 5,
            "date": "2021-03-10T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-03-11T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-03-12T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-03-13T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-03-14T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-03-15T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-03-16T00:00:00.000Z"
          }, {"deaths": 5, "date": "2021-03-17T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-03-18T00:00:00.000Z"
          }, {"deaths": 4, "date": "2021-03-19T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2021-03-20T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-03-21T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-03-22T00:00:00.000Z"
          }, {"deaths": 5, "date": "2021-03-23T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2021-03-24T00:00:00.000Z"
          }, {"deaths": 4, "date": "2021-03-25T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-03-26T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-03-27T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-03-28T00:00:00.000Z"
          }, {"deaths": 4, "date": "2021-03-29T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-03-30T00:00:00.000Z"
          }, {"deaths": 6, "date": "2021-03-31T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-04-01T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-04-02T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-04-03T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-04-04T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-04-05T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-04-06T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-04-07T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-04-08T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-04-09T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-04-10T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2021-04-11T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-04-12T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2021-04-13T00:00:00.000Z"
          }, {"deaths": 7, "date": "2021-04-14T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-04-15T00:00:00.000Z"
          }, {"deaths": 8, "date": "2021-04-16T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-04-17T00:00:00.000Z"
          }, {"deaths": 5, "date": "2021-04-18T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-04-19T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-04-20T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-04-21T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-04-22T00:00:00.000Z"}, {
            "deaths": 6,
            "date": "2021-04-23T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-04-24T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-04-25T00:00:00.000Z"
          }, {"deaths": 3, "date": "2021-04-26T00:00:00.000Z"}, {
            "deaths": 4,
            "date": "2021-04-27T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-04-28T00:00:00.000Z"}, {
            "deaths": 2,
            "date": "2021-04-29T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-04-30T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-01T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-05-02T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-05-03T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-05-04T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-05-05T00:00:00.000Z"
          }, {"deaths": 2, "date": "2021-05-06T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-05-07T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-05-08T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-09T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-05-10T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-11T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-05-12T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-13T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-05-14T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-15T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-05-16T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-05-17T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-05-18T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-05-19T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-05-20T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-05-21T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-05-22T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-23T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-05-24T00:00:00.000Z"}, {
            "deaths": 3,
            "date": "2021-05-25T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-05-26T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-27T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-05-28T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-29T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-05-30T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-05-31T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-06-01T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-02T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-03T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-04T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-05T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-06-06T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-07T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-08T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-09T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-10T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-11T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-12T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-13T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-14T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-15T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-16T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-17T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-18T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-19T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-20T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-21T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-22T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-23T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-24T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-25T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-26T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-06-27T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-28T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-06-29T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-06-30T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-01T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-02T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-03T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-04T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-05T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-06T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-07T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-08T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-09T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-10T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-11T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-12T00:00:00.000Z"
          }, {"deaths": 1, "date": "2021-07-13T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-14T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-15T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-16T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-17T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-18T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-19T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-20T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-21T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-22T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-23T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-24T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-25T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-07-26T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-27T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-28T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-29T00:00:00.000Z"}, {
            "deaths": 0,
            "date": "2021-07-30T00:00:00.000Z"
          }, {"deaths": 0, "date": "2021-07-31T00:00:00.000Z"}, {
            "deaths": 1,
            "date": "2021-08-01T00:00:00.000Z"
          }]
        }
      }
    };

    service.fetchData(StateAbbreviationType.HH, TimeRangeType.ALL, StatisticType.DEATHS).subscribe(
      statistics => {
        expect(statistics).not.toBeNull();
        expect(statistics.history.length).toEqual(mockResponseHistory.data['HH'].history.length);
      }
    );

    const reqHistory = httpMock.expectOne(service.getHistoryUrl(StateAbbreviationType.HH, TimeRangeType.ALL, StatisticType.DEATHS));
    expect(reqHistory.request.method).toBe('GET');

    reqHistory.flush(mockResponseHistory);
  });


});
