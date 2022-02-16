export const blocks = 3;
export const limitOfWord = 20;
export const limitOfPage = 30;

export enum DictionaryGroup {
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
}

export enum WordDifficulty {
  easy = 'easy',
  hard = 'hard',
  deleted = 'deleted',
}

export enum AggregatedWordsFilter {
  easy = '{"$and":[{"userWord.difficulty":"easy"}]}',
  hard = '{"$and":[{"userWord.difficulty":"hard"}]}',
  deleted = '{"$and":[{"userWord.difficulty":"deleted"}]}',
}

export const dictionaryGroupOptions = [
  {
    value: '1',
    id: DictionaryGroup.first,
  },
  {
    value: '2',
    id: DictionaryGroup.second,
  },
  {
    value: '3',
    id: DictionaryGroup.third,
  },
  {
    value: '4',
    id: DictionaryGroup.fourth,
  },
  {
    value: '5',
    id: DictionaryGroup.fifth,
  },
  {
    value: '6',
    id: DictionaryGroup.sixth,
  },
];

export const arrayOfBackground = [
  {
    wall: 'url(assets/jpg/books1.jpg)',
    card: '#dce7e6b8',
  },
  {
    wall: 'url(assets/jpg/books2.jpg)',
    card: 'rgb(196 245 241 / 53%)',
  },
  {
    wall: 'url(assets/jpg/books3.jpg)',
    card: 'rgb(241 225 241 / 88%)',
  },
  {
    wall: 'url(assets/jpg/books4.jpg)',
    card: 'rgb(241 227 215 / 70%)',
  },
  {
    wall: 'url(assets/jpg/books5.jpg)',
    card: '#e9f2da85',
  },
  {
    wall: 'url(assets/jpg/books6.jpg)',
    card: '#dec9b085',
  },
];
