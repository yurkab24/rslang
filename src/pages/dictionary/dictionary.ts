import Page from '../../core/templates/page';
import { IWord } from '../../models';
import {
  limitOfWord,
  limitOfPage,
  dictionaryGroupOptions,
  PageIds,
  Tags,
  arrayOfBackground,
  WordDifficulty,
} from '../../constants';
import {
  getDictonaryRequest,
  addUserWordRequest,
  getAgregatedWordsRequest,
  updateUserWordRequest,
  deleteUserWordRequest,
} from '../../request';
import { Pagination } from '../../services/pagination';
import { WordsContainer } from '../../services/words';
import Spinner from '../../core/component/spiner';
import WordCard from '../../core/component/word';
import { getUserId, isAuth } from '../../core/utils';

const wordContainer = new WordsContainer();
const paginationPage = new Pagination(limitOfWord, limitOfPage);

class DictionaryPage extends Page {
  static TextObject = {
    MainTitle: 'УЧЕБНИК',
  };

  private wordWrapper = document.createElement(Tags.Div);

  private numberStartPage = document.createElement(Tags.Span);

  private numberFinishPage = document.createElement(Tags.Span);

  private wrapperBlock = document.createElement(Tags.Div);

  private numberOfSection = 0;

  private spinner: Spinner;

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  public renderBlockWord(words: IWord[]) {
    this.wrapperBlock.innerHTML = '';
    this.wrapperBlock.classList.add('wrapper-block');
    words.forEach((item) => {
      const wordComponent = new WordCard(
        item,
        this.wordStatusHandler,
        this.deleteWordHandler,
        wordContainer.wordGroupDictionary
      );
      this.wrapperBlock.append(wordComponent.render());
    });

    this.wordWrapper.innerHTML = '';
    this.wordWrapper.append(this.wrapperBlock);
  }

  render() {
    const title = this.createHeaderTitle(DictionaryPage.TextObject.MainTitle);
    title.className = 'dictionary-title';

    const blockButtonsWrapper = document.createElement(Tags.Div);
    const blockButtonsPagination = document.createElement(Tags.Div);
    const buttonOfPaginationPrev = document.createElement(Tags.Button);
    const buttonOfPaginationNext = document.createElement(Tags.Button);
    const buttonSectionWrapper = document.createElement(Tags.Div);
    const buttonSection = document.createElement(Tags.Button);
    const buttonDictonary = document.createElement(Tags.A);

    buttonDictonary.classList.add('dictionary-icon');
    blockButtonsWrapper.classList.add('block-buttons-wrapper');
    blockButtonsPagination.classList.add('block-buttons-pagination');
    this.container.classList.add('wrapper');
    this.numberStartPage.classList.add('start-page');
    this.numberFinishPage.classList.add('finish-page');
    buttonSectionWrapper.classList.add('button-section-wrapper');

    buttonDictonary.href = `#${PageIds.Vocabulary}`;

    this.numberStartPage.innerHTML = String(paginationPage.pageOfNumber + 1);
    this.numberFinishPage.innerHTML = ` /${String(paginationPage.limitOfPageNumber)}`;

    this.container.append(title);
    this.container.append(blockButtonsWrapper);
    this.container.append(this.wordWrapper);
    blockButtonsWrapper.append(buttonDictonary, blockButtonsPagination, buttonSectionWrapper);

    dictionaryGroupOptions.forEach((item) => {
      const button = buttonSection.cloneNode(true) as HTMLElement;
      button.textContent = item.value;
      button.dataset.id = String(item.id);
      buttonSectionWrapper.append(button);

      button.addEventListener('click', this.buttonGroupHandler);
    });

    blockButtonsPagination.append(
      buttonOfPaginationPrev,
      this.numberStartPage,
      this.numberFinishPage,
      buttonOfPaginationNext
    );

    buttonOfPaginationPrev.addEventListener('click', this.buttonPaginationPrevHandler);
    buttonOfPaginationNext.addEventListener('click', this.buttonPaginationNextHandler);

    return this.container;
  }

  public init(): void {
    this.updatePageofDictionary();
  }

  private buttonPaginationHandler = (paginationDirection: string): void => {
    if (paginationDirection === 'prev') {
      paginationPage.prevPage();
    } else {
      paginationPage.nextPage();
    }

    this.numberStartPage.innerHTML = String(paginationPage.pageOfNumber + 1);
    this.updatePageofDictionary();
  };

  private buttonPaginationPrevHandler = (): void => {
    return this.buttonPaginationHandler('prev');
  };

  private buttonPaginationNextHandler = (): void => {
    return this.buttonPaginationHandler('next');
  };

  private updatePageofDictionary(): void {
    this.spinner.show();
    (isAuth()
      ? getAgregatedWordsRequest(getUserId(), paginationPage.pageOfNumber, wordContainer.wordGroupDictionary, paginationPage.limitOfWords)
      : getDictonaryRequest(paginationPage.pageOfNumber, wordContainer.wordGroupDictionary)
    ).then((result) => {
      this.renderBlockWord(result);
      this.spinner.hide();
    });
  }

  private buttonGroupHandler = (event: Event): void => {
    this.numberOfSection = Number((event.target as HTMLElement).dataset.id);
    this.container.style.backgroundImage = arrayOfBackground[this.numberOfSection].wall;

    wordContainer.wordGroupDictionary = this.numberOfSection;
    this.updatePageofDictionary();
  };

  private wordStatusHandler = (item: IWord, difficulty: WordDifficulty): void => {
    this.spinner.show();
    (item.userWord ? updateUserWordRequest : addUserWordRequest)(getUserId(), item.id, {
      difficulty,
      optional: {},
    })
      .then(() => this.updatePageofDictionary())
      .finally(() => this.spinner.hide());
  };

  private deleteWordHandler = (item: IWord): void => {
    this.spinner.show();
    deleteUserWordRequest(getUserId(), item.id)
      .then(() => this.updatePageofDictionary())
      .finally(() => this.spinner.hide());
  };
}

export default DictionaryPage;
