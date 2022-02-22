export interface IGameStatistic {
  rightWords: number;
  wrongWords: number;
  totalCount: number;
  longestSeries: number;
  newWordsOfDay: number;
}

export interface IGameStatisticResponse {
  optional: { [key: string]: IGameStatistic };
}
