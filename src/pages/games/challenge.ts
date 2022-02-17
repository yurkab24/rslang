import { dictionaryGroupOptions, host, Tags } from '../../constants';
import Page from '../../core/templates/page';
import { PATH_OF_LEARNWORDS, DictionaryGroup } from '../../constants';
import { IWord } from '../../models/dictionary';
import App from '../app/app';

export const getWordsRequest = (page: number, group: DictionaryGroup): Promise<IWord[]> =>
  fetch(`${PATH_OF_LEARNWORDS.words}?page=${page}&group=${group}`).then((result) => result.json());

class ChallengePage extends Page {
  static TextObject = {
    MainTitle: 'АУДИОВЫЗОВ',
  };

  title = this.createHeaderTitle(ChallengePage.TextObject.MainTitle);

  wrapper = this.createElem(Tags.Div, 'block challenge__wrapper', '');

  

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
  fetch(`${PATH_OF_LEARNWORDS.words}?page=${page}&group=${group}`).then((result) => result.json()).then((data) => {
    //console.log('data', data);
    return data;
  });



  createGamePage(words: IWord[]): void {
    const question = this.createElem(Tags.Div, 'challenge__question', '');
    const picture = this.createElem(Tags.Div, 'challenge__picture', '');
    const word = this.createElem(Tags.Div, 'challenge__word', '');
    const variants = this.createElem(Tags.Div, 'challenge__variants', '');
    const btnNext = this.createElem(Tags.Button, 'challenge__btn', 'Не знаю');
    question.append(picture, word);
    this.wrapper.append(question, variants, btnNext);

    const randomNumber = Math.floor(Math.random() * words.length);
    const audioLink = words[randomNumber].audio;
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
    set.add(words[randomNumber].wordTranslate);
    //console.log('askWord', words[randomNumber].wordTranslate);
    const variantsNumber = 5;
    while (set.size < variantsNumber) {
      const newWordNum = Math.floor(Math.random() * words.length);
      set.add(words[newWordNum].wordTranslate);
    }

    const arrVariants = [...set].sort();
    //console.log('variants', arrVariants);

    for (let i = 1; i <= arrVariants.length; i++) {
      const wordVariant = this.createElem(Tags.Div, `challenge__variant challenge__variant-${i}`, `${arrVariants[i - 1]}`);
      variants.append(wordVariant);
    }

    btnNext.addEventListener('click', () => {
      this.wrapper.innerHTML = '';
      this.createGamePage(words);
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
        const pagesNumber = 30;
        const pageN = Math.ceil(Math.random() * pagesNumber);
        const words: IWord[] = await this.getWordsRequest(pageN, i);
        this.createGamePage(words);
      })
    }
  }




  render(): HTMLElement {
    this.title.className = 'page-title';
    this.container.append(this.title);
    this.container.append(this.wrapper);
    this.createLevelChoice();





    return this.container;
  }

  public init(): void {}
}

export default ChallengePage;
