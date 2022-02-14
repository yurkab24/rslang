import Page from '../../core/templates/page';

class ChallengePage extends Page {
  static TextObject = {
    MainTitle: 'АУДИОВЫЗОВ',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(ChallengePage.TextObject.MainTitle);
    title.className = 'page-title';
    this.container.append(title);
    return this.container;
  }

  public init(): void {}
}

export default ChallengePage;
