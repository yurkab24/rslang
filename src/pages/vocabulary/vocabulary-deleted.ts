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
import Tabs from '../../core/component/tabs';
import { getAgregatedWordsRequest, deleteUserWordRequest, updateUserWordRequest } from '../../request';
import { getUserId } from '../../core/utils';
import { Pagination } from '../../services';
import { IWord } from '../../models';
import { TAB_OPTIONS, TAB_OPTIONS_ENGLISH } from './constants';

const pagination = new Pagination(limitOfWord, limitOfPage);

export class VocabularyDeletedPage extends Page {
  static TextObject = {
    MainTitle: 'Удаленные',
  };

  private spinner: Spinner;

  private blockOfWordsDeleted = document.createElement(Tags.Div);

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  public renderBlockWord(words: IWord[]) {
    this.blockOfWordsDeleted.innerHTML = '';
    words.forEach((item) => {
      const wordComponent = new WordCard(
        item,
        this.wordStatusHandler,
        this.deleteWordHandler,
        DictionaryGroup.first,
        false,
        false,
        true
      );
      this.blockOfWordsDeleted.classList.add('wrapper-block');
      this.blockOfWordsDeleted.append(wordComponent.render());
    });
  }

  render() {
    const title = this.createHeaderTitle(VocabularyDeletedPage.TextObject.MainTitle);
    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage) {
      title.textContent = 'Deleted';
    } else {
      title.textContent = VocabularyDeletedPage.TextObject.MainTitle;
    }
    const wrapperBlock = document.createElement(Tags.Div);
    const tabs = new Tabs(langFromStorage ? TAB_OPTIONS_ENGLISH : TAB_OPTIONS);

    wrapperBlock.classList.remove('wrapper-block-words');
    this.container.classList.add('wrapper', 'vocabulary');

    this.container.append(title);

    this.container.append(tabs.render());
    this.container.append(wrapperBlock);
    wrapperBlock.append(this.blockOfWordsDeleted);
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
      AggregatedWordsFilter.deleted
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
    deleteUserWordRequest(getUserId(), item.id)
      .then(() => this.updatePageofVocabulary())
      .finally(() => this.spinner.hide());
  };
}
