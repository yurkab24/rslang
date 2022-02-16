import Page from '../../core/templates/page';
import { Tags, limitOfWord, limitOfPage, AggregatedWordsFilter } from '../../constants';
import Spinner from '../../core/component/spiner';
import WordCard from '../../core/component/word';
import { getAgregatedWordsRequest } from '../../request';
import { getUserId } from '../../core/utils';
import { Pagination } from '../../services';
import { IWord } from '../../models';

const pagination = new Pagination(limitOfWord, limitOfPage);

export class VocabularyPage extends Page {
  static TextObject = {
    MainTitle: 'Словарь',
  };

  private spinner: Spinner;

  private blockOfWordsEasy = document.createElement(Tags.Div);

  private blockOfWordsDifficult = document.createElement(Tags.Div);

  private blockOfWordsDeleted = document.createElement(Tags.Div);

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  public renderBlockWord(words: IWord[]) {
    this.blockOfWordsEasy.innerHTML = '';
    words.forEach((item) => {
      const wordComponent = new WordCard(item, this.wordStatusHandler, this.deleteWordHandler, false);
      this.blockOfWordsEasy.parentElement?.classList.add('flex-contaoner');
      this.blockOfWordsEasy.append(wordComponent.render());
    });
  }

  render() {
    this.createHeaderTitle(VocabularyPage.TextObject.MainTitle);
    const wrapperBlock = document.createElement(Tags.Div);
    const titleOfWordsEasy = document.createElement(Tags.Button);
    const titleOfWordsDifficult = document.createElement(Tags.Button);
    const titleOfWordsDeleted = document.createElement(Tags.Button);
    const sectionOfButtonHandler = document.createElement(Tags.Section);

    wrapperBlock.classList.remove('wrapper-block-words');
    this.blockOfWordsEasy.classList.add('block-of-words', 'wrapper-block');
    this.blockOfWordsDifficult.classList.add('block-of-words', 'wrapper-block', 'hide');
    this.blockOfWordsDeleted.classList.add('block-of-words', 'wrapper-block', 'hide');
    sectionOfButtonHandler.classList.add('section-button-handler');

    this.container.classList.add('wrapper', 'vocabulary');

    const titlle = ['Изучаемые', 'Сложные', 'Удаленные'];
    titleOfWordsEasy.innerHTML = titlle[0];
    titleOfWordsDifficult.innerHTML = titlle[1];
    titleOfWordsDeleted.innerHTML = titlle[2];

    this.container.append(this.createHeaderTitle(VocabularyPage.TextObject.MainTitle));
    this.container.append(wrapperBlock);
    wrapperBlock.append(
      sectionOfButtonHandler,
      this.blockOfWordsEasy,
      this.blockOfWordsDifficult,
      this.blockOfWordsDeleted
    );
    sectionOfButtonHandler.append(titleOfWordsEasy, titleOfWordsDifficult, titleOfWordsDeleted);

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
      AggregatedWordsFilter.easy
    )
      .then((result) => this.renderBlockWord(result))
      .finally(() => this.spinner.hide());
  }

  private wordStatusHandler = (): void => {
    // this.spinner.show();
    // (item.userWord ? updateUserWordRequest : addUserWordRequest)(getUserId(), item.id, {
    //   difficulty,
    //   optional: {},
    // })
    //   .then(() => this.updatePageofDictionary())
    //   .finally(() => this.spinner.hide());
  };

  private deleteWordHandler = (): void => {
    // this.spinner.show();
    // deleteUserWordRequest(getUserId(), item.id)
    //   .then(() => this.updatePageofDictionary())
    //   .finally(() => this.spinner.hide());
  };
}
