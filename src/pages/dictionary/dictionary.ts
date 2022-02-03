import Page from '../../core/templates/page';

class DictionaryPage extends Page {
  static TextObject = {
    MainTitle: 'Dictionary',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(DictionaryPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default DictionaryPage;
