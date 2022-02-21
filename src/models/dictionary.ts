import { WordDifficulty } from '../constants';

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord?: IWordGroup;
}

interface IAggregatedWord extends IWord {
  _id: string;
}

interface IAggregatedTotalCount {
  count: number;
}

export interface IAggregatedWordsResponse {
  paginatedResults: IAggregatedWord[];
  totalCount: IAggregatedTotalCount[];
}

export interface IWordGroup {
  difficulty: WordDifficulty;
  optional: object;
}
