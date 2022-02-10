import { PATH_OF_LEARNWORDS, DictionaryGroup } from '../constants';
import { IWord } from '../models/dictionary';

export const getDictonaryRequest = (page: number, group: DictionaryGroup): Promise<IWord[]> =>
  fetch(`${PATH_OF_LEARNWORDS.words}?page=${page}&group=${group}`).then((result) => result.json());
