import { Game } from '../constants';

export interface IGameStatistic {
  rightWords: number;
  wrongWords: number;
  totalCount: number;
  longestSeries: number;
  newWordsOfDay: number;
  game: Game;
}

export interface IGameStatisticResponse {
  optional: { [key: string]: IGameStatistic };
}
