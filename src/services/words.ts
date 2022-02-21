import { IWord } from '../models';
import { DictionaryGroup } from '../constants';

export class WordsContainer {
  private wordGroup: DictionaryGroup = DictionaryGroup.first;

  public get wordGroupDictionary(): DictionaryGroup {
    return this.wordGroup;
  }

  public set wordGroupDictionary(wordGroup: DictionaryGroup) {
    this.wordGroup = wordGroup;
  }

  public set listOfWords(words: IWord[]) {
    this.listOfWords = words;
  }

  public get listOfWords(): IWord[] {
    return this.listOfWords;
  }
}
