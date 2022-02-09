import Page from '../../core/templates/page';
import MainPage from '../main/main';
import DictionaryPage from '../dictionary/dictionary';
import GamesPage from '../games/games';
import StatisticsPage from '../statistics/statistics';
import Header from '../../core/component/header';
import Footer from '../../core/component/footer';
import { VocabularyPage } from '../vocabulary/vocabulary';
import { PageIds } from '../../constants';

class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = 'current-page';

  private header: Header;

  private footer: Footer;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    switch (idPage) {
      case PageIds.Statistics:
        page = new StatisticsPage(idPage);
        break;
      case PageIds.Dictionary:
        page = new DictionaryPage(idPage);
        break;
      case PageIds.Vocabulary:
        page = new VocabularyPage(idPage);
        break;
      case PageIds.Games:
        page = new GamesPage(idPage);
        break;
      default:
        page = new MainPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
      page.init();
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header('header', 'header');
    this.footer = new Footer('footer', 'footer');
  }

  run() {
    App.container.append(this.header.render());
    App.renderNewPage('main-page');
    this.enableRouteChange();
    App.container.append(this.footer.render());
  }
}

export default App;
