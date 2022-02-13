import Page from '../../core/templates/page';

class SprintPage extends Page {
  static TextObject = {
    MainTitle: 'СПРИНТ',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(SprintPage.TextObject.MainTitle);
    title.className = 'page-title';
    this.container.append(title);
    return this.container;
  }

  public init(): void {}
}

export default SprintPage;
