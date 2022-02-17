import Page from '../../core/templates/page';
import MainPage from '../main/main';
import DictionaryPage from '../dictionary/dictionary';
import GamesPage from '../games/games';
import StatisticsPage from '../statistics/statistics';
import Spinner from '../../core/component/spiner';
import Header from '../../core/component/header';
import Footer from '../../core/component/footer';
import ButtonUp from '../../core/component//buttonUpPageContetnt';
import { VocabularyPage } from '../vocabulary/vocabulary';
import { PageIds } from '../../constants';
import TeamPage from '../main/team';
import ChallengePage from '../games/challenge';
import SprintPage from '../games/sprint';
import Authorization from '../authorization/authorization';

class App {
  private static container: HTMLElement = document.body;

  private static mainWrapper: HTMLElement = document.createElement('main');

  private static defaultPageId = 'current-page';

  private header: Header;

  private footer: Footer;

  private spinner: Spinner;

  private buttonUp: ButtonUp;

  private renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    switch (idPage) {
      case PageIds.Statistics:
        page = new StatisticsPage(idPage, this.spinner);
        break;
      case PageIds.Dictionary:
        page = new DictionaryPage(idPage, this.spinner);
        break;
      case PageIds.Vocabulary:
        page = new VocabularyPage(idPage, this.spinner);
        break;
      case PageIds.Games:
        page = new GamesPage(idPage);
        break;
      case PageIds.Team:
        page = new TeamPage(idPage);
        break;
      case PageIds.GameSprint:
        page = new SprintPage(idPage);
        break;
      case PageIds.GameChallenge:
        page = new ChallengePage(idPage);
        break;
      case PageIds.Authorization:
        page = new Authorization(idPage);
        break;
      default:
        page = new MainPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.mainWrapper.append(pageHTML);
      page.init();
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header('header', 'header');
    this.footer = new Footer('footer', 'footer');
    this.spinner = new Spinner('div', 'spinner');
    this.buttonUp = new ButtonUp('button', 'button-up');
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(App.mainWrapper);
    this.renderNewPage('main-page');
    this.enableRouteChange();
    App.container.append(this.spinner.render());
    App.container.append(this.footer.render());
    App.container.append(this.buttonUp.render());
  }
}

export default App;
