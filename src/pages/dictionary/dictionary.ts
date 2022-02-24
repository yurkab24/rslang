import Page from '../../core/templates/page';
import { IGameStatistic, IWord } from '../../models';
import {
  limitOfWord,
  limitOfPage,
  dictionaryGroupOptions,
  PageIds,
  Tags,
  arrayOfBackground,
  WordDifficulty,
  PATH_OF_LEARNWORDS,
  DictionaryGroup,
  host,
} from '../../constants';
import {
  getDictonaryRequest,
  addUserWordRequest,
  getAgregatedWordsRequest,
  updateUserWordRequest,
  deleteUserWordRequest,
  updateGameStatisticRequest,
  getStatisticRequest,
} from '../../request';
import { Pagination } from '../../services/pagination';
import { WordsContainer, Refresh } from '../../services';
import Spinner from '../../core/component/spiner';
import WordCard from '../../core/component/word';
import { getUserId, isAuth } from '../../core/utils';
import ChallengePage from '../games/challenge';
import App from '../app/app';
import { circle } from '../games/circle';

const refreshPage = new Refresh();
export const wordContainer = new WordsContainer();
export const paginationPage = new Pagination(limitOfWord, limitOfPage);

refreshPage.addSaveData({
  func: () => paginationPage.pageOfNumber,
  key: 'numberOfPage',
});

refreshPage.addSaveData({
  func: () => wordContainer.wordGroupDictionary,
  key: 'numberOfGroup',
});

refreshPage.restoreData('numberOfPage', (value) => (paginationPage.pageOfNumber = Number(value)));
refreshPage.restoreData('numberOfGroup', (value) => (wordContainer.wordGroupDictionary = Number(value)));

class DictionaryPage extends Page {
  static TextObject = {
    MainTitle: 'УЧЕБНИК',
  };

  private wordWrapper = document.createElement(Tags.Div);

  private numberStartPage = document.createElement(Tags.Span);

  private numberFinishPage = document.createElement(Tags.Span);

  private wrapperBlock = document.createElement(Tags.Div);

  private spinner: Spinner;

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  getWordsRequest = async (page: number, group: DictionaryGroup): Promise<IWord[]> =>
    fetch(`${PATH_OF_LEARNWORDS.words}?page=${page}&group=${group}`)
      .then((result) => result.json())
      .then((data) => data);

  public renderBlockWord(words: IWord[]) {
    this.wrapperBlock.innerHTML = '';
    this.wrapperBlock.classList.add('wrapper-block');
    words.forEach((item) => {
      const wordComponent = new WordCard(
        item,
        this.wordStatusHandler,
        this.deleteWordHandler,
        wordContainer.wordGroupDictionary,
        true,
        true,
        Boolean(item.userWord)
      );
      this.wrapperBlock.append(wordComponent.render());
    });

    this.container.style.backgroundImage = arrayOfBackground[wordContainer.wordGroupDictionary].wall;
    this.wordWrapper.innerHTML = '';
    this.wordWrapper.append(this.wrapperBlock);
  }

  render() {
    const title = this.createHeaderTitle(DictionaryPage.TextObject.MainTitle);
    title.className = 'dictionary-title';
    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage) {
      title.textContent = 'TEXTBOOK';
    } else {
      title.textContent = 'УЧЕБНИК';
    }
    const blockButtonsWrapper = document.createElement(Tags.Div);
    const blockButtonsPagination = document.createElement(Tags.Div);
    const buttonOfPaginationPrev = document.createElement(Tags.Button);
    const buttonOfPaginationNext = document.createElement(Tags.Button);
    const buttonSectionWrapper = document.createElement(Tags.Div);
    const buttonSection = document.createElement(Tags.Button);
    const linkSectionWrapper = document.createElement(Tags.Div);
    const buttonDictonary = document.createElement(Tags.A);
    const buttonSprint = document.createElement(Tags.A);
    const buttonAudioGame = document.createElement(Tags.Button);

    blockButtonsWrapper.classList.add('block-buttons-wrapper');
    blockButtonsPagination.classList.add('block-buttons-pagination');
    this.container.classList.add('wrapper');
    this.numberStartPage.classList.add('start-page');
    this.numberFinishPage.classList.add('finish-page');
    buttonSectionWrapper.classList.add('button-section-wrapper');
    linkSectionWrapper.classList.add('link-section-wrapper');

    buttonDictonary.href = `#${PageIds.Vocabulary}`;
    buttonSprint.href = `#${PageIds.GameSprint}`;
    buttonAudioGame.addEventListener('click', async () => {
      const words: IWord[] = await this.getWordsRequest(paginationPage.pageOfNumber, wordContainer.wordGroupDictionary);
      localStorage.setItem('wordsFromPage', JSON.stringify(words));
      window.location.href = `#${PageIds.GameChallenge}`;
    });

    buttonDictonary.title = 'Словарь';
    buttonSprint.title = 'Спринт';
    buttonAudioGame.title = 'Аудиовызов';

    this.numberStartPage.innerHTML = String(paginationPage.pageOfNumber + 1);
    this.numberFinishPage.innerHTML = ` /${String(paginationPage.limitOfPageNumber)}`;

    this.container.append(title);
    this.container.append(blockButtonsWrapper);
    this.container.append(this.wordWrapper);
    linkSectionWrapper.append(buttonDictonary, buttonSprint, buttonAudioGame);
    blockButtonsWrapper.append(linkSectionWrapper, blockButtonsPagination, buttonSectionWrapper);

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

    if (localStorage.getItem('NightTheme')) {
      this.container.style.filter = 'brightness(0.6) contrast(150%) saturate(2) sepia(10%)';
    }
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
    wordContainer.wordGroupDictionary = Number((event.target as HTMLElement).dataset.id);
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

  // private audioGameHandler = (): void => {
  //   this.spinner.show();
  //   getAgregatedWordsRequest(getUserId(), paginationPage.pageOfNumber, wordContainer.wordGroupDictionary, paginationPage.limitOfWords).then((result) => this.audioChallenge.createGamePage(result));
  // };
}

export default DictionaryPage;
