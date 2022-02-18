import { dictionaryGroupOptions, host, Tags } from '../../constants';
import Page from '../../core/templates/page';
import { PATH_OF_LEARNWORDS, DictionaryGroup } from '../../constants';
import { IWord } from '../../models/dictionary';
import App from '../app/app';
import Spinner from '../../core/component/spiner';

export const getWordsRequest = (page: number, group: DictionaryGroup): Promise<IWord[]> =>
  fetch(`${PATH_OF_LEARNWORDS.words}?page=${page}&group=${group}`).then((result) => result.json());

class ChallengePage extends Page {
  static TextObject = {
    MainTitle: 'АУДИОВЫЗОВ',
  };

  title = this.createHeaderTitle(ChallengePage.TextObject.MainTitle);

  wrapper = this.createElem(Tags.Div, 'block challenge__wrapper', '');

  private spinner: Spinner;

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  protected createElem(elem: Tags, className: string, text: string): HTMLElement {
    const div = document.createElement(elem);
    div.className = className;
    div.innerText = text;
    return div;
  }

  createGamePage(): void {
    const question = this.createElem(Tags.Div, 'challenge__question', '');
    const picture = this.createElem(Tags.Div, 'challenge__picture', '');
    const word = this.createElem(Tags.Div, 'challenge__word', 'word');
    const variants = this.createElem(Tags.Div, 'challenge__variants', 'variants');
    const btnNext = this.createElem(Tags.Button, 'challenge__btn', 'НЕ ЗНАЮ');
    question.append(picture, word);
    this.wrapper.append(question, variants, btnNext);

    const arrHost = `${host}files/02_0027.mp3`;

    const audio = document.createElement(Tags.Audio);
    audio.autoplay = true;
    audio.id = Tags.Audio;
    const audioElement = audio.cloneNode(true) as HTMLMediaElement;
    picture.append(audioElement);
    audioElement.src = arrHost;
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
        this.createGamePage();
      });
    }
  }

  render(): HTMLElement {
    //const title = this.createHeaderTitle(ChallengePage.TextObject.MainTitle);
    this.title.className = 'page-title';
    this.container.append(this.title);
    //const wrapper = this.createElem(Tags.Div, 'block challenge__wrapper', '');
    this.container.append(this.wrapper);
    this.createLevelChoice();

    return this.container;
  }

  public init(): void {}
}

export default ChallengePage;
