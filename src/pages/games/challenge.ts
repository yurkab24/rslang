import { Tags } from '../../constants';
import Page from '../../core/templates/page';

class ChallengePage extends Page {
  static TextObject = {
    MainTitle: 'АУДИОВЫЗОВ',
  };

  constructor(id: string) {
    super(id);
  }

  protected createElem(elem:Tags, className: string, text: string) {
    const div = document.createElement(elem);
    div.className = className;
    div.innerText = text;
    return div;
  }

  render() {
    const title = this.createHeaderTitle(ChallengePage.TextObject.MainTitle);
    title.className = 'page-title';
    this.container.append(title);
    const wrapper = this.createElem(Tags.Div, 'block challenge__wrapper', '');
    this.container.append(wrapper);

    const question = this.createElem(Tags.Div, 'challenge__question', '');
    const picture = this.createElem(Tags.Div, 'challenge__picture', '');
    const word = this.createElem(Tags.Div, 'challenge__word', 'word');
    const sound = this.createElem(Tags.Div, 'challenge__sound', '');
    const variants = this.createElem(Tags.Div, 'challenge__variants', 'variants');
    const btnNext = this.createElem(Tags.Button, 'challenge__btn', 'НЕ ЗНАЮ');
    question.append(picture, sound, word);
    wrapper.append(question, variants, btnNext);

    return this.container;
  }

  public init(): void {}
}

export default ChallengePage;
