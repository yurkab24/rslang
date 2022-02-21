import './sprint.scss';
import Page from '../../core/templates/page';
import Spinner from '../../core/component/spiner';
import { dictionaryGroupOptions, host, Tags } from '../../constants';
import { getDictonaryRequest } from '../../request';
import { IWord } from '../../models';

const MAX_PAGE = 30;
const START_POINTS = 10;
const START_TIMER = 60;

interface ISprint {
  right: IWord[],
  wrong: IWord[],
}

interface ISprintWord {
  en: string,
  ru: string,
}

const shuffle = (arr: string[]) => {
  return arr.sort(() => Math.round(Math.random() * 100) - 10);
};

const getSvgRight = () => {
  const div = document.createElement('div');
  div.innerHTML =
    '<svg viewBox="0 0 24 24" focusable="false"><path fill="#06a506" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path></svg>';
  return div;
};

class SprintPage extends Page {
  static TextObject = {
    MainTitle: 'СПРИНТ',
  };

  private spinner: Spinner;

  currentLEvel = 0;

  wrapper = this.createElem(Tags.Div, 'block challenge__wrapper');

  sprintWrapper = this.createElem(Tags.Div, 'sprint');

  answerWrapper = this.createElem(Tags.Div, 'sprint__answers');

  pointsWrapper = this.createElem(Tags.Div, 'sprint__points');

  timerWrapper = this.createElem(Tags.Div, 'sprint__timer');

  points = 0;

  answers: ISprint = {
    right: [],
    wrong: [],
  };

  rowCorrectAnswer = 0;

  maxSeries = 0;

  startTimer = START_TIMER;

  endGame = false;

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  protected createElem(elem: Tags, className: string, text = ''): HTMLElement {
    const div = document.createElement(elem);
    div.className = className;
    div.innerText = text;
    return div;
  }

  async createGamePage(group: number) {
    this.timerWrapper.innerHTML = `${this.startTimer}`;
    this.timer();
    this.wrapper.append(this.sprintWrapper);
    const page = Math.ceil(Math.random() * MAX_PAGE);
    const words = await getDictonaryRequest(page, group);

    const arrayWordsEN: string[] = [];
    const arrayWordsRU: string[] = [];

    words.forEach((dataWord) => {
      arrayWordsEN.push(dataWord.word);
      arrayWordsRU.push(dataWord.wordTranslate);
    });

    shuffle(arrayWordsEN);
    shuffle(arrayWordsRU);

    const dataWrods: ISprintWord[] = [];
    arrayWordsEN.forEach((word, index) => {
      dataWrods.push({
        en: word,
        ru: arrayWordsRU[index],
      });
    });

    const createLvlGame = (data: ISprintWord[]) => {
      this.sprintWrapper.innerHTML = '';
      const buttonWrapper = this.createElem(Tags.Div, 'button__wrapper');
      const wordsWrapper = this.createElem(Tags.Div, 'words__wrapper');
      const wordEN = this.createElem(Tags.Div, 'sprint__word', data[this.currentLEvel].en);
      const wordRU = this.createElem(Tags.Div, 'sprint__word sprint__word--ru', data[this.currentLEvel].ru);

      const btnWrong = this.createElem(Tags.Button, 'sprint__button sprint__button sprint__button--wrong', 'Неверно');
      const btnRight = this.createElem(Tags.Button, 'sprint__button sprint__button--right', 'Верно');
      wordsWrapper.append(wordEN, wordRU);
      buttonWrapper.append(btnWrong, btnRight);
      this.sprintWrapper.append(this.answerWrapper, wordsWrapper, buttonWrapper, this.pointsWrapper, this.timerWrapper);

      btnWrong.addEventListener('click', () => {
        let wordId = '';

        if (this.currentLEvel < 19) {
          words.forEach((wordData) => {
            if (wordData.word == data[this.currentLEvel].en) {
              wordId = wordData.id;
            }
          });

          words.forEach((item) => {
            if (item.id == wordId) {
              if (item.word == data[this.currentLEvel].en && item.wordTranslate != data[this.currentLEvel].ru) {
                this.answers.right.push(item);
                this.rowCorrectAnswer++;
                this.answerWrapper.append(getSvgRight());
                this.getMaxSeries();
              } else {
                this.answers.wrong.push(item);
                this.rowCorrectAnswer = 0;
                this.answerWrapper.innerHTML = '';
              }
            }
          });

          this.currentLEvel++;

          createLvlGame(data);
        } else {
          this.endGame = true;
          this.sprintWrapper.innerHTML = '';
        }
      });

      btnRight.addEventListener('click', () => {
        let wordId = '';

        if (this.currentLEvel < 19) {
          words.forEach((wordData) => {
            if (wordData.word == data[this.currentLEvel].en) {
              wordId = wordData.id;
            }
          });

          words.forEach((item) => {
            if (item.id == wordId) {
              if (item.word == data[this.currentLEvel].en && item.wordTranslate == data[this.currentLEvel].ru) {
                this.answers.right.push(item);
                this.rowCorrectAnswer++;
                this.answerWrapper.append(getSvgRight());
                this.getMaxSeries();
              } else {
                this.answers.wrong.push(item);
                this.rowCorrectAnswer = 0;
                this.answerWrapper.innerHTML = '';
              }
            }
          });

          this.currentLEvel++;

          createLvlGame(data);
        } else {
          this.endGame = true;
          this.sprintWrapper.innerHTML = '';
        }
      });
    };

    createLvlGame(dataWrods);
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
    (this.wrapper.querySelector('.challenge__back') as HTMLElement).insertAdjacentHTML(
      'afterbegin',
      '<a href="#games-page">Назад к играм</a>'
    );

    for (let i = 0; i < dictionaryGroupOptions.length; i++) {
      this.wrapper.querySelector(`.level-${i + 1}`)?.addEventListener('click', () => {
        this.wrapper.innerHTML = '';

        this.createGamePage(i);
      });
    }
  }

  getMaxSeries() {
    this.maxSeries = this.maxSeries < this.rowCorrectAnswer ? this.rowCorrectAnswer : this.maxSeries;
    this.getPoints();
  }

  getPoints() {
    let factor = 1;
    if (this.rowCorrectAnswer >= 4) {
      factor = 1 * (Math.floor(this.maxSeries / 4) + 1);
    } else {
      factor = 1;
    }

    const point = START_POINTS * factor;
    this.points += point;
    this.pointsWrapper.innerHTML = `${this.points}`;
  }

  timer() {
    const idTimer = setInterval(() => {
      this.startTimer--;
      this.timerWrapper.innerHTML = `${this.startTimer}`;
      if (this.startTimer < 10) {
        this.timerWrapper.classList.add('sprint__timer--stop');
      }
      if (this.startTimer <= 0) {
        clearInterval(idTimer);
        this.timerWrapper.classList.remove('sprint__timer--stop');
      }
    }, 1000);
  }

  render() {
    const title = this.createHeaderTitle(SprintPage.TextObject.MainTitle);
    title.className = 'page-title';
    this.container.append(title);
    this.container.append(this.wrapper);
    this.createLevelChoice();

    return this.container;
  }

  public init(): void { }
}

export default SprintPage;
