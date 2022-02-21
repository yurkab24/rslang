import Page from '../../core/templates/page';
import {
  Tags,
  limitOfWord,
  limitOfPage,
  AggregatedWordsFilter,
  DictionaryGroup,
  WordDifficulty,
} from '../../constants';
import Spinner from '../../core/component/spiner';
import WordCard from '../../core/component/word';
import { getAgregatedWordsRequest, updateUserWordRequest } from '../../request';
import { getUserId } from '../../core/utils';
import { Pagination } from '../../services';
import { IWord } from '../../models';
import { TAB_OPTIONS } from './constants';
import Tabs from '../../core/component/tabs';

const pagination = new Pagination(limitOfWord, limitOfPage);

export class VocabularyHardPage extends Page {
  static TextObject = {
    MainTitle: 'Сложные',
  };

  private spinner: Spinner;

  private blockOfWordsHard = document.createElement(Tags.Div);

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  public renderBlockWord(words: IWord[]) {
    this.blockOfWordsHard.innerHTML = '';
    words.forEach((item) => {
      const wordComponent = new WordCard(
        item,
        this.wordStatusHandler,
        this.deleteWordHandler,
        DictionaryGroup.first,
        true,
        false,
        true
      );
      this.blockOfWordsHard.classList.add('wrapper-block');
      this.blockOfWordsHard.append(wordComponent.render());
    });
  }

  render() {
    this.createHeaderTitle(VocabularyHardPage.TextObject.MainTitle);
    const wrapperBlock = document.createElement(Tags.Div);
    const tabs = new Tabs(TAB_OPTIONS);

    wrapperBlock.classList.remove('wrapper-block-words');
    this.container.classList.add('wrapper', 'vocabulary');

    this.container.append(this.createHeaderTitle(VocabularyHardPage.TextObject.MainTitle));
    this.container.append(tabs.render());
    this.container.append(wrapperBlock);
    wrapperBlock.append(this.blockOfWordsHard);

    return this.container;
  }

  public init(): void {
    this.updatePageofVocabulary();
  }

  private updatePageofVocabulary(): void {
    this.spinner.show();
    getAgregatedWordsRequest(
      getUserId(),
      pagination.pageOfNumber,
      '' as any,
      pagination.limitOfWords,
      AggregatedWordsFilter.hard
    )
      .then((result) => this.renderBlockWord(result))
      .finally(() => this.spinner.hide());
  }

  private wordStatusHandler = (item: IWord, difficulty: WordDifficulty): void => {
    this.spinner.show();
    updateUserWordRequest(getUserId(), item.id, {
      difficulty,
      optional: {},
    })
      .finally(() => this.spinner.hide())
      .then(() => this.updatePageofVocabulary());
  };

  private deleteWordHandler = (item: IWord): void => {
    this.spinner.show();
    updateUserWordRequest(getUserId(), item.id, {
      difficulty: WordDifficulty.deleted,
      optional: {},
    })
      .finally(() => this.spinner.hide())
      .then(() => this.updatePageofVocabulary());
  };
}
