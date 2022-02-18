import Page from '../../core/templates/page';
import Spinner from '../../core/component/spiner';

class SprintPage extends Page {
  static TextObject = {
    MainTitle: 'СПРИНТ',
  };

  private spinner: Spinner;

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
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
