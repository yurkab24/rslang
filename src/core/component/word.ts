import { Tags, host, arrayOfBackground, WordDifficulty, blocks } from '../../constants';
import { IWord } from '../../models';
import Component from '../templates/components';
import { isAuth } from '../../core/utils';

type StatusHandler = (item: IWord, difficulty: WordDifficulty) => void;
type StatusDeleteHandler = (item: IWord) => void;

class WordCard extends Component {
  private item: IWord;

  private wordStatusHandler: StatusHandler;

  private deleteWordHandler: StatusDeleteHandler;

  private numberOfSection = 0;

  private isShowDifficult: boolean;

  private isShowEasy: boolean;

  private isShowDelete: boolean;

  constructor(
    item: IWord,
    wordStatusHandler: StatusHandler,
    deleteWordHandler: StatusDeleteHandler,
    isShowDifficult = true,
    isShowEasy = true,
    isShowDelete = true
  ) {
    super(Tags.Div, 'word-block');

    this.item = item;
    this.wordStatusHandler = wordStatusHandler;
    this.deleteWordHandler = deleteWordHandler;
    this.isShowDifficult = isShowDifficult;
    this.isShowEasy = isShowEasy;
    this.isShowDelete = isShowDelete;
  }

  renderCard() {
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
    const buttonLernWordsDifficult = document.createElement(Tags.Button);
    const buttonLernWordsDeleted = document.createElement(Tags.Button);
    const buttonLernWordsLerned = document.createElement(Tags.Button);

    wordImage.classList.add('word-image');
    wordInfo.classList.add('word-info');
    wordAudio.classList.add('word-audio');
    wordBlockContent.classList.add('text-example');
    wordMeaningTranslate.classList.add('text-under-line');
    blockLearnWords.classList.add('wrapper-learn-words');
    wordImage.style.backgroundImage = `url(${host}${this.item.image})`;
    this.container.style.background = arrayOfBackground[this.numberOfSection].card;

    wordTitle.textContent = this.item.word;
    wordTranslate.textContent = `${this.item.wordTranslate}:`;
    wordTranscription.textContent = this.item.transcription;
    wordTextMeaning.innerHTML = this.item.textMeaning;
    wordTextExample.innerHTML = this.item.textExample;
    wordExampleTranslate.textContent = `${this.item.textExampleTranslate}.`;
    wordMeaningTranslate.textContent = `${this.item.textMeaningTranslate}.`;

    this.container.append(wordImage, wordTitle, wordInfo, wordBlockContent);

    if (this.item.userWord) {
      this.container.classList.add(`filter_${this.item.userWord.difficulty}`);
    }

    if (isAuth()) {
      if (this.isShowDifficult) {
        blockLearnWords.append(buttonLernWordsDifficult);
      }
      if (this.isShowEasy) {
        blockLearnWords.append(buttonLernWordsLerned);
      }
      if (this.isShowDelete) {
        blockLearnWords.append(buttonLernWordsDeleted);
      }
      this.container.append(blockLearnWords);

      buttonLernWordsDifficult.addEventListener('click', () => this.wordStatusHandler(this.item, WordDifficulty.easy));

      buttonLernWordsLerned.addEventListener('click', () => this.wordStatusHandler(this.item, WordDifficulty.hard));

      buttonLernWordsDeleted.addEventListener('click', () => this.deleteWordHandler(this.item));
    }

    wordBlockContent.append(wordTextMeaning, wordMeaningTranslate, wordTextExample, wordExampleTranslate);
    wordInfo.append(wordTranslate, wordTranscription, wordAudio);

    const arrHost = [
      `${host}${this.item.audio}`,
      `${host}${this.item.audioMeaning}`,
      `${host}${this.item.audioExample}`,
    ];
    for (let i = 0; i < blocks; i++) {
      const audioElement = audio.cloneNode(true) as HTMLMediaElement;
      wordAudio.append(audioElement);
      audioElement.src = arrHost[i];
    }

    wordAudio.addEventListener('click', this.audioHandler);

    return this.container;
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

  render(): HTMLElement {
    this.renderCard();
    return this.container;
  }
}

export default WordCard;
