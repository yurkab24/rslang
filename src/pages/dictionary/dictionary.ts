import Page from '../../core/templates/page';
import { IWord } from '../../models';
import { host, blocks, limitOfWord, limitOfPage, dictionaryGroupOptions, PageIds, Tags } from '../../constants';
import { getDictonaryRequest } from '../../request';
import { Pagination } from './pagination';
import { WordsContainer } from './words';

const wordContainer = new WordsContainer();
const paginationPage = new Pagination(limitOfWord, limitOfPage);

class DictionaryPage extends Page {
  static TextObject = {
    MainTitle: 'Dictionary',
  };

  private wordWrapper = document.createElement(Tags.Div);

  private numberStartPage = document.createElement(Tags.Span);

  private numberFinishPage = document.createElement(Tags.Span);

  public renderBlockWord(words: IWord[]) {
    const wrapperBlock = document.createElement(Tags.Div);
    wrapperBlock.classList.add('wrapper-block');
    words.forEach((item) => {
      const wordBlock = document.createElement(Tags.Div);
      const wordImage = document.createElement(Tags.Div);
      const wordTitle = document.createElement(Tags.H3);
      const wordInfo = document.createElement(Tags.Div);
      const wordAudio = document.createElement(Tags.Button);
      const audio = document.createElement(Tags.Audio);
      audio.id = Tags.Audio;

      const wordTranscription = document.createElement(Tags.Span);
      const wordTranslate = document.createElement(Tags.Span);
      const wordBlockContent = document.createElement(Tags.Div);
      const wordTextMeaning = document.createElement(Tags.P);
      const wordTextExample = document.createElement(Tags.P);
      const wordExampleTranslate = document.createElement(Tags.P);
      const wordMeaningTranslate = document.createElement(Tags.P);
      const blockLearnWords = document.createElement(Tags.Div);
      const buttonLearnsWord = document.createElement(Tags.Button);

      wordBlock.classList.add('word-block');
      wordImage.classList.add('word-image');
      wordInfo.classList.add('word-info');
      wordAudio.classList.add('word-audio');
      wordBlockContent.classList.add('text-example');
      wordMeaningTranslate.classList.add('text-under-line');
      blockLearnWords.classList.add('wrapper-learn-words');
      wordImage.style.backgroundImage = `url(${host}${item.image})`;

      wordTitle.textContent = item.word;
      wordTranslate.textContent = `${item.wordTranslate}:`;
      wordTranscription.textContent = item.transcription;
      wordTextMeaning.innerHTML = item.textMeaning;
      wordTextExample.innerHTML = item.textExample;
      wordExampleTranslate.textContent = `${item.textExampleTranslate}.`;
      wordMeaningTranslate.textContent = `${item.textMeaningTranslate}.`;

      wrapperBlock.append(wordBlock);
      wordBlock.append(wordImage, wordTitle, wordInfo, wordBlockContent, blockLearnWords);
      wordBlockContent.append(wordTextMeaning, wordMeaningTranslate, wordTextExample, wordExampleTranslate);
      wordInfo.append(wordTranslate, wordTranscription, wordAudio);

      const arrHost = [`${host}${item.audio}`, `${host}${item.audioMeaning}`, `${host}${item.audioExample}`];
      for (let i = 0; i < blocks; i++) {
        const audioElement = audio.cloneNode(true) as HTMLMediaElement;
        wordAudio.append(audioElement);
        audioElement.src = arrHost[i];
      }

      wordAudio.addEventListener('click', this.audioHandler);

      for (let i = 0; i < blocks; i++) {
        blockLearnWords.append(buttonLearnsWord.cloneNode(true));
      }
    });

    this.wordWrapper.innerHTML = '';
    this.wordWrapper.append(wrapperBlock);
  }

  render() {
    const title = this.createHeaderTitle(DictionaryPage.TextObject.MainTitle);
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

    this.numberStartPage.innerHTML = String(paginationPage.pageOfNumber);
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

  private audioHandler = (value: Event): void => {
    const players = (value.target as HTMLElement).getElementsByTagName(Tags.Audio);
    let current = 0;
    const playAudio = (): void => {
      (players[current] as HTMLAudioElement).play();
      (players[current] as HTMLAudioElement).addEventListener(
        'ended',
        function () {
          current++;
          if (current >= blocks) {
            current = 0;
            return;
          }
          playAudio();
        },
        { once: true }
      );
    };
    playAudio();
  };

  private buttonPaginationHandler = (paginationDirection: string): void => {
    if (paginationDirection === 'prev') {
      paginationPage.prevPage();
    } else {
      paginationPage.nextPage();
    }

    this.numberStartPage.innerHTML = String(paginationPage.pageOfNumber);
    this.updatePageofDictionary();
  };

  private buttonPaginationPrevHandler = (): void => {
    return this.buttonPaginationHandler('prev');
  };

  private buttonPaginationNextHandler = (): void => {
    return this.buttonPaginationHandler('next');
  };

  private updatePageofDictionary(): void {
    getDictonaryRequest(paginationPage.pageOfNumber, wordContainer.wordGroupDictionary).then((result) =>
      this.renderBlockWord(result)
    );
  }

  private buttonGroupHandler = (event: Event): void => {
    wordContainer.wordGroupDictionary = Number((event.target as HTMLElement).dataset.id);
    this.updatePageofDictionary();
  };
}

export default DictionaryPage;
