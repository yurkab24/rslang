import Page from '../../core/templates/page';
import MainPage from '../main/main';
import DictionaryPage from '../dictionary/dictionary';
import GamesPage from '../games/games';
import StatisticsPage from '../statistics/statistics';
import Header from '../../core/component/header';
import Footer from '../../core/component/footer';

export const enum PageIds {
  MainPage = 'main-page',
  Dictionary = 'dictionary-page',
  Games = 'games-page',
  Statistics = 'statistics-page',
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'current-page';
  private header: Header;
  private footer: Footer;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.Dictionary) {
      page = new DictionaryPage(idPage);
    } else if (idPage === PageIds.Games) {
      page = new GamesPage(idPage);
    } else if (idPage === PageIds.Statistics) {
      page = new StatisticsPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
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
