import { dictionaryGroupOptions, host, Tags } from '../../constants';
import Page from '../../core/templates/page';
import { PATH_OF_LEARNWORDS, DictionaryGroup } from '../../constants';
import { IWord } from '../../models/dictionary';
import App from '../app/app';
import { circle } from './circle';


class ChallengePage extends Page {
  static TextObject = {
    MainTitle: 'АУДИОВЫЗОВ',
  };

  title = this.createHeaderTitle(ChallengePage.TextObject.MainTitle);

  wrapper = this.createElem(Tags.Div, 'block challenge__wrapper', '');

  pagesNumber = 30;

  count = 0;

  answersString = '';

  theLongestSeries = 0;

  words: IWord[] = [];

  rightAnswers: { word: string, wordTranslate: string, wordSound: string }[] = [];

  wrongAnswers: { word: string, wordTranslate: string, wordSound: string }[] = [];


  constructor(id: string) {
    super(id);
  }

  protected createElem(elem:Tags, className: string, text: string): HTMLElement {
    const div = document.createElement(elem);
    div.className = className;
    div.innerText = text;
    return div;
  }

  getWordsRequest = async (page: number, group: DictionaryGroup): Promise<IWord[]> =>
  fetch(`${PATH_OF_LEARNWORDS.words}?page=${page}&group=${group}`)
  .then((result) => result.json())
  .then((data) => {
    return data;
  });

  createChallengeStatistics() {
    this.wrapper.innerHTML = '';
    const statisticWrapper = this.createElem(Tags.Div, 'challenge__statistics', '');
    this.wrapper.append(statisticWrapper);
    const statisticTitle = this.createElem(Tags.Div, 'challenge__statistics__title', 'Результат \nДлина серии');
    const statisticBody = this.createElem(Tags.Div, 'block challenge__statistics__body', '');
    const statisticManage = this.createElem(Tags.Div, 'challenge__statistics__manage', '');

    statisticWrapper.append(statisticTitle, statisticBody, statisticManage);

    const statisticCircle = this.createElem(Tags.Div, 'challenge__statistics__circle', '');
    statisticCircle.insertAdjacentHTML('afterbegin', circle);
    const statisticInfo = this.createElem(Tags.Div, 'challenge__statistics__words', '');
    statisticBody.append(statisticCircle, statisticInfo);

    const continueBtn = this.createElem(Tags.Div, 'challenge__statistics__continue', 'Продолжить');
    const backBtn = this.createElem(Tags.Div, 'challenge__statistics__back', '');
    statisticManage.append(continueBtn, backBtn);
    (this.wrapper.querySelector('.challenge__statistics__back') as HTMLElement).insertAdjacentHTML('afterbegin', '<a href="#games-page">Назад к играм</a>');
    (this.wrapper.querySelector('.challenge__statistics__continue') as HTMLElement).addEventListener('click', async () => {
      this.wrapper.innerHTML = '';
      this.count = 0;
      this.createLevelChoice();
    })
    this.showStatistics();
  }


  createGamePage(words: IWord[]): void {
    const question = this.createElem(Tags.Div, 'challenge__question', '');
    const picture = this.createElem(Tags.Div, 'challenge__picture', '');
    const word = this.createElem(Tags.Div, 'challenge__word', '');
    const variants = this.createElem(Tags.Div, 'challenge__variants', '');
    const btnNext = this.createElem(Tags.Button, 'challenge__btn', 'Не знаю');
    question.append(picture, word);
    this.wrapper.append(question, variants, btnNext);

    const audioLink = words[this.count].audio;
    const audio = document.createElement(Tags.Audio);
    audio.autoplay = true;
    audio.id = Tags.Audio;
    const audioElement = audio.cloneNode(true) as HTMLMediaElement;
    picture.append(audioElement);
    audioElement.src = `${host}${audioLink}`;
    picture.addEventListener('click', () => {
      audioElement.play();
    });

    const set = new Set();
    set.add(words[this.count].wordTranslate);
    const variantsNumber = 5;
    while (set.size < variantsNumber) {
      const newWordNum = Math.floor(Math.random() * words.length);
      set.add(words[newWordNum].wordTranslate);
    }

    const arrVariants = [...set].sort();
    for (let i = 1; i <= arrVariants.length; i++) {
      const wordVariant = this.createElem(Tags.Div, `challenge__variant challenge__variant-${i}`, `${i}. ${arrVariants[i - 1]}`);
      variants.append(wordVariant);
    }

    let arrWordsRight: string[] = [];
    let arrWordsWrong: string[] = [];
    let flag = false;
    this.wrapper.querySelectorAll('.challenge__variant').forEach((ev) => ev.addEventListener('click', () => {
      if (((ev.textContent as string).split('. '))[1] === (words[this.count].wordTranslate) && flag === false) {
        (ev as HTMLDivElement).style.outline = '5px solid var(--bg-btn-shadow)';
        picture.style.backgroundImage = `URL(${host}${words[this.count].image})`;
        picture.style.backgroundSize = 'cover';
        word.textContent = words[this.count].word;
        flag = true;
        this.answersString = this.answersString + 'a';
        const rightAnswersFromStorage = localStorage.getItem('rightAnswers');

        if (rightAnswersFromStorage) {
          this.rightAnswers = JSON.parse(rightAnswersFromStorage);
          this.rightAnswers.forEach((word) => {
            arrWordsRight.push(word.word);
          })
        }
        const newRightWord = {word: words[this.count].word, wordTranslate: words[this.count].wordTranslate, wordSound: `${host}${words[this.count].audio}`};
        if (!(arrWordsRight.includes(words[this.count].word))) {
          this.rightAnswers.push(newRightWord);
        }
        this.wrongAnswers = this.wrongAnswers.filter((item) => typeof(item) === 'object' && item.word !== words[this.count].word);
        localStorage.setItem('rightAnswers', JSON.stringify(this.rightAnswers));
        localStorage.setItem('wrongAnswers', JSON.stringify(this.wrongAnswers));
      } else {
        if (!flag) {
          (ev as HTMLDivElement).style.outline = '5px solid var(--bg-play-btn)';
          flag = true;
          this.answersString = this.answersString + ' ';

          const wrongAnswersFromStorage = localStorage.getItem('wrongAnswers');
          if (wrongAnswersFromStorage) {
            this.wrongAnswers = JSON.parse(wrongAnswersFromStorage);
            this.wrongAnswers.forEach((word) => {
              arrWordsWrong.push(word.word);
            })
          }
          const newWrongWord = {word: words[this.count].word, wordTranslate: words[this.count].wordTranslate, wordSound: `${host}${words[this.count].audio}`};
          if (!(arrWordsWrong.includes(words[this.count].word))) {
            this.wrongAnswers.push(newWrongWord);
          }
          this.rightAnswers = this.rightAnswers.filter((item) => typeof(item) === 'object' && item.word !== words[this.count].word);
          localStorage.setItem('wrongAnswers', JSON.stringify(this.wrongAnswers));
          localStorage.setItem('rightAnswers', JSON.stringify(this.rightAnswers));
        }
      }

      /* The longest series */
      const theLongestSeriesArr = this.answersString.split(' ');
      const arrElLength = theLongestSeriesArr.map((el) => el.length);
      arrElLength.sort();
      this.theLongestSeries = arrElLength[arrElLength.length - 1];
      localStorage.setItem('challenge-theLongestSeries', `${this.theLongestSeries}`);

      const arrow = '&#10230;';
      (btnNext as HTMLButtonElement).innerHTML = arrow;
      btnNext.style.fontSize = '5rem';
    }))

    btnNext.addEventListener('click', () => {
      this.wrapper.innerHTML = '';
      this.count++;
      const wordsOnPage = 20;
      if (this.count < wordsOnPage) {
        this.createGamePage(words);
      } else {
        this.createChallengeStatistics();
      }
    })
  }

  createLevelChoice(): void {
    const titleLevel = this.createElem(Tags.H3, 'challenge__title3', 'Выберите уровень сложности');
    const levels = this.createElem(Tags.Div, 'challenge__levels', '');

    for (let i = 0; i < dictionaryGroupOptions.length; i++) {
      const level = this.createElem(Tags.Div, `challenge__level level-${i + 1}`, `${dictionaryGroupOptions[i].value}`);
      levels.append(level);
    }
    const backToGames = this.createElem(Tags.Div, 'challenge__back', '');
    this.wrapper.append(titleLevel, levels, backToGames);
    (this.wrapper.querySelector('.challenge__back') as HTMLElement).insertAdjacentHTML('afterbegin', '<a href="#games-page">Назад к играм</a>');

    for (let i = 0; i < dictionaryGroupOptions.length; i++) {
      this.wrapper.querySelector(`.level-${i + 1}`)?.addEventListener('click', async () => {
        this.wrapper.innerHTML = '';
        const pageN = Math.ceil(Math.random() * this.pagesNumber);
        let words: IWord[] = await this.getWordsRequest(pageN, i);
        this.createGamePage(words);
      })
    }
  }

  showStatistics() {
    const wrongAnswersFromStorage = localStorage.getItem('wrongAnswers');
    const rightAnswersFromStorage = localStorage.getItem('rightAnswers');
    let arrWrongs: { word: string, wordTranslate: string, wordSound: string }[] = JSON.parse(wrongAnswersFromStorage as string);
    let arrRights: { word: string, wordTranslate: string, wordSound: string }[] = JSON.parse(rightAnswersFromStorage as string);

    const statisticsWrapper = this.wrapper.querySelector('.challenge__statistics__words');

    let rightWords: HTMLElement;
    let wrongWords: HTMLElement;
    if (wrongAnswersFromStorage) {
      wrongWords = this.createElem(Tags.Div, 'challenge__words-wrong', `Ошибок - ${arrWrongs.length}`);
      this.showResultWords(arrWrongs, wrongWords);
    } else {
      wrongWords = this.createElem(Tags.Div, 'challenge__words-wrong', `Ошибок нет!`);
    }

    if (rightAnswersFromStorage) {
      rightWords = this.createElem(Tags.Div, 'challenge__words-right', `Знаю - ${arrRights.length}!`);
      this.showResultWords(arrRights, rightWords);

      const pointsForRighrAnswer = 10;
      let totalCount: number;
      totalCount = (pointsForRighrAnswer * arrRights.length) || 0;
      localStorage.setItem('challenge-totalcount', `${totalCount}`);
      (this.wrapper.querySelector('.challenge__statistics__title') as HTMLDivElement).textContent = `Результат - ${totalCount}   Длина серии - ${this.theLongestSeries}`;
    } else {
      rightWords = this.createElem(Tags.Div, 'challenge__words-right', 'Знаю - 0');
    }

    if (arrRights && arrWrongs) {
      (this.wrapper.querySelector('.chart-number') as HTMLElement).textContent = `${Math.round(100 * arrRights.length / (arrRights.length + arrWrongs.length))}`;
      (this.wrapper.querySelector('.donut-segment') as HTMLElement).setAttribute('stroke-dasharray', `${100 * arrRights.length / (arrRights.length + arrWrongs.length)} ${100 * arrWrongs.length / (arrRights.length + arrWrongs.length)}`);
    } else if (arrRights) {
      (this.wrapper.querySelector('.chart-number') as HTMLElement).textContent = '100';
      (this.wrapper.querySelector('.donut-segment') as HTMLElement).setAttribute('stroke-dasharray', '100 0');
    } else if (arrWrongs) {
      (this.wrapper.querySelector('.chart-number') as HTMLElement).textContent = '0';
      (this.wrapper.querySelector('.donut-segment') as HTMLElement).setAttribute('stroke-dasharray', '0 100');
    }
    localStorage.setItem('challenge-rightAnswersPercent', `${(this.wrapper.querySelector('.chart-number') as HTMLElement).textContent}`);
    statisticsWrapper?.append(wrongWords, rightWords);
  }

  showResultWords(arr: { word: string, wordTranslate: string, wordSound: string }[], parent: HTMLElement) {
    arr.forEach((right: { word: string, wordTranslate: string, wordSound: string }) => {
      const rightWord = this.createElem(Tags.Div, 'challenge__result-word', '');
      const loudspeaker = this.createElem(Tags.Div, 'challenge__statistics-loudspesker', '');
      const theWord = this.createElem(Tags.Div, 'challenge__the-word', `${right.word} - ${right.wordTranslate}`);

      const audio = document.createElement(Tags.Audio);
      const audioElement = audio.cloneNode(true) as HTMLMediaElement;
      loudspeaker.append(audioElement);
      audioElement.src = `${right.wordSound}`;
      rightWord.append(loudspeaker, theWord);
      parent.append(rightWord);
      loudspeaker.addEventListener('click', () => {
        audioElement.play();
      });
    })
  }

  render(): HTMLElement {
    this.title.className = 'page-title';
    this.container.append(this.title);
    this.container.append(this.wrapper);
    this.createLevelChoice();
    document.querySelector('.footer')?.classList.add('hidden');
    return this.container;
  }

  public init(): void {}
}

export default ChallengePage;
