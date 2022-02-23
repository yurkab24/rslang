import { IWord } from '../models';
import { PATH_OF_LEARNWORDS, DictionaryGroup } from '../constants';

export const getWordsRequest = (page: number, group: DictionaryGroup): Promise<IWord[]> =>
  fetch(`${PATH_OF_LEARNWORDS.words}?page=${page}&group=${group}`)
    .then((result) => result.json())
    .then((data) => data);
