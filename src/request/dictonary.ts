import { PATH_OF_LEARNWORDS, DictionaryGroup, HttpMethod, AggregatedWordsFilter } from '../constants';
import { IWord, IWordGroup, IAggregatedWordsResponse } from '../models/dictionary';
import { getUserToken } from '../core/utils';

export const getDictonaryRequest = (page: number, group: DictionaryGroup): Promise<IWord[]> =>
  fetch(`${PATH_OF_LEARNWORDS.words}?page=${page}&group=${group}`).then((result) => result.json());

export const getAgregatedWordsRequest = (
  userId: string,
  page: number,
  group: DictionaryGroup,
  wordsPerPage: number,
  filter?: AggregatedWordsFilter
): Promise<IWord[]> =>
  fetch(
    `${PATH_OF_LEARNWORDS.userAggregatedWords(
      userId
    )}?page=${page}&group=${group}&wordsPerPage=${wordsPerPage}&filter=${filter || ''}`,
    {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  )
    .then((result) => result.json())
    .then(([result]: IAggregatedWordsResponse[]) => {
      return result.paginatedResults.map((item) => ({
        ...item,
        id: item._id,
      }));
    });

const userWordRequest = (
  userId: string,
  wordId: string,
  updatedWord: IWordGroup,
  method: HttpMethod,
  isJSON = true
): Promise<IWord> =>
  fetch(PATH_OF_LEARNWORDS.userWord(userId, wordId), {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(updatedWord),
  }).then((result) => isJSON && result.json());

export const updateUserWordRequest = (userId: string, wordId: string, updatedWord: IWordGroup): Promise<IWord> =>
  userWordRequest(userId, wordId, updatedWord, HttpMethod.put);

export const addUserWordRequest = (userId: string, wordId: string, updatedWord: IWordGroup): Promise<IWord> =>
  userWordRequest(userId, wordId, updatedWord, HttpMethod.post);

export const deleteUserWordRequest = (userId: string, wordId: string): Promise<IWord> =>
  userWordRequest(userId, wordId, {} as IWordGroup, HttpMethod.delete, false);
