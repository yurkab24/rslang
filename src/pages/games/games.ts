import Page from '../../core/templates/page';

class GamesPage extends Page {
  static TextObject = {
    MainTitle: 'Games',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(GamesPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }

  public init(): void {}
}

export default GamesPage;
