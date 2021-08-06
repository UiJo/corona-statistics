export interface GermanyHistoryData {
  data: HistoryDataItem[];
}

export interface StateHistoryData {
  data: StatesData
}

export interface StatesData {
  BW: { history: HistoryDataItem[]; },
  BY: { history: HistoryDataItem[]; },
  BB: { history: HistoryDataItem[]; },
  BE: { history: HistoryDataItem[]; },
  HB: { history: HistoryDataItem[]; },
  HH: { history: HistoryDataItem[]; },
  HE: { history: HistoryDataItem[]; },
  MV: { history: HistoryDataItem[]; },
  NI: { history: HistoryDataItem[]; },
  NW: { history: HistoryDataItem[]; },
  RP: { history: HistoryDataItem[]; },
  SL: { history: HistoryDataItem[]; },
  ST: { history: HistoryDataItem[]; },
  SN: { history: HistoryDataItem[]; },
  SH: { history: HistoryDataItem[]; },
  TH: { history: HistoryDataItem[]; }
}

export interface HistoryDataItem {
  cases: number,
  deaths: number,
  recovered: number;
  date: string
}

export interface Summary {
  weekIncidence: number;
  casesPer100k: number,
  casesPerWeek: number
}

export interface StatesSummary {
  data: StateSummary
}

export interface StateSummary {
  identifier: string;
  summary: Summary;
}
