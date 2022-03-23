import { PageIds, Tags } from '../../constants';
import { Buttons, ButtonsEn } from '../../core/component/header';
import Page from '../../core/templates/page';

enum Advantages {
  'В разделе "Учебник" приложения вы найдете 3600 наиболее часто употребляемых слов английского языка с примерами',
  'Авторизуйтесь и наполняйте Ваш личный словарь! Вам будет доступен прогресс изучения слов, список изученных слов и статистика',
  'Играйте в разделе "Игры"! Всего 15 минут в день! Используйте перерывы или время в пути с пользой с нашим приложением',
  'Ваш прогресс по мини-играм и по словам за каждый день изучения будет отображен в разделе "Статистика" приложения',
  'In the "Textbook" section of the application you find 3600 most frequently used words in English with examples',
  'Log in and fill up your personal dictionary! You have an access to the progress of learning words, a list of learned words and statistics',
  'Play the games in the "Games" section! Just 15 minutes a day! Use breaks or travel time to your advantage with our app',
  'Your progress in mini-games and words for each day of study is displayed in the "Statistics" section of the application',
}

const iframePres =
`<iframe class="video-pres" src="https://docs.google.com/presentation/d/e/2PACX-1vTfHGYs0hVuiNe_n4MTyHgavKE-2hlsQ9mPCQBaN_sSRCrvUXTzPxT3-uc0rblR_TP_uJkAmBvgQr7s/embed?start=true&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`;

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  br = document.createElement('br');

  renderHeaderElements(): void {
    const themeBtn = document.createElement(Tags.Button);
    themeBtn.className = 'theme';

    const langBtn = document.createElement(Tags.Button);
    langBtn.className = 'lang';
    langBtn.textContent = 'EN';

    const signBtn = document.createElement(Tags.Button);
    signBtn.className = 'sign';
    (document.querySelector('.header') as HTMLElement).append(themeBtn, langBtn, signBtn);

    signBtn.onclick = () => {
      window.location.href = `#${PageIds.Authorization}`;
    };

    window.addEventListener('hashchange', () => {
      themeBtn.remove();
      signBtn.remove();
      langBtn.remove();
    });
  }

  renderTheme(): void {
    const themeBtn = document.querySelector('.theme') as HTMLButtonElement;
    if (localStorage.getItem('NightTheme')) {
      document.body.className = 'theme-dark';
      themeBtn?.classList.toggle('sun');
    } else {
      document.body.className = 'theme-light';
    }
    themeBtn?.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      document.body.classList.toggle('theme-light');
      themeBtn.classList.toggle('sun');
      if (document.body.className === 'theme-dark') {
        localStorage.setItem('NightTheme', 'on');
      } else {
        localStorage.removeItem('NightTheme');
      }
    });
  }

  renderAdvantages(): void {
    const advantagesTitle = this.createDiv('block advantages-title', 'О ПРИЛОЖЕНИИ');
    const advantagesDiv = this.createDiv('advantages', '');

    for (let i = 1; i <= 4; i++) {
      const advantage = this.createDiv('block advantage', '');
      advantage.textContent = Advantages[i - 1];
      advantagesDiv.append(advantage);
    }
    this.container.append(advantagesDiv);
    advantagesDiv.insertAdjacentElement('beforebegin', advantagesTitle);
  }

  renderVideo(): void {
    const videoDiv = this.createDiv('block video-block', 'КАК РАБОТАЕТ ПРИЛОЖЕНИЕ\n');
    this.container.append(videoDiv);
    videoDiv.insertAdjacentHTML('beforeend', `<br>`);
    videoDiv.insertAdjacentHTML('beforeend', iframePres);
  }

  renderTeam(): void {
    const teamTitleDiv = this.createDiv('block team-block', '');
    teamTitleDiv.insertAdjacentHTML('afterbegin', '<a href="#team">НАША КОМАНДА</a>');
    this.container.append(teamTitleDiv);
  }

  render(): HTMLElement {
    const mainBlock = this.createDiv('block main-block', 'Учи английский легко\nс RS Lang!');
    this.container.append(mainBlock);
    this.getQuotes();
    this.renderHeaderElements();
    this.renderTheme();
    this.renderAdvantages();
    this.renderVideo();
    this.renderTeam();
    this.changeLanguage();
    return this.container;
  }

  renderBaseContent(): void {
    this.renderTheme();
  }

  public init(): void {}

  async getQuotes(): Promise<void> {
    const quotes = './assets/quotes.json';
    let quo: number;
    const res = await fetch(quotes);
    const data = await res.json();
    const quoteText = `${data[(quo = Math.floor(Math.random() * data.length))].textEn}\n${data[quo].textRu}`;
    const quoteBlock = this.createDiv('block quote-block', quoteText);
    this.container.querySelector('.main-block')?.insertAdjacentElement('afterend', quoteBlock);
    quoteBlock.addEventListener('click', () => {
      quoteBlock.textContent = '';
      const br = document.createElement('br');
      quoteBlock.insertAdjacentText('afterbegin', `${data[(quo = Math.floor(Math.random() * data.length))].textEn}`);
      quoteBlock.insertAdjacentElement('beforeend', br);
      quoteBlock.insertAdjacentText('beforeend', `${data[quo].textRu}`);
    });
  }

  changeLanguage(): void {
    const langBtn = document.querySelector('.lang') as HTMLButtonElement;
    langBtn.addEventListener('click', () => {
      if (langBtn.textContent === 'EN') {
        langBtn.classList.toggle('eng');
        this.changeLangToEN();
        localStorage.setItem('language', 'EN');
      } else if (langBtn.textContent === 'RU') {
        langBtn.classList.toggle('eng');
        this.changeLangToRU();
        localStorage.removeItem('language');
      }
    });
    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage) {
      this.changeLangToEN();
    } else {
      this.changeLangToRU();
    }
  }

  changeLangToEN() {
    const langBtn = document.querySelector('.lang') as HTMLButtonElement;
    langBtn.textContent = 'RU';
    let i = 0;
    this.container.querySelectorAll('.advantage').forEach((el) => {
      el.textContent = Advantages[i + 4];
      i++;
    });
    (this.container.querySelector('.advantages-title') as HTMLElement).textContent = 'APP ADVANTAGES';
    (this.container.querySelector('.video-block') as HTMLElement).textContent = 'APP PRESENTATION';
    (this.container.querySelector('.video-block') as HTMLElement).insertAdjacentHTML(
      'beforeend',
      iframePres
    );
    (this.container.querySelector('.team-block') as HTMLElement).textContent = '';
    (this.container.querySelector('.team-block') as HTMLElement).insertAdjacentHTML(
      'afterbegin',
      '<a href="#team">OUR TEAM</a>'
    );
    (this.container.querySelector('.main-block') as HTMLElement).textContent = 'ENGLISH - it\'s easy... \nwith RS Lang!';
    let m = 0;
    document.querySelectorAll('.nav__button').forEach((btn) => {
      btn.textContent = ButtonsEn[m].text;
      m++;
    });
  }

  changeLangToRU() {
    const langBtn = document.querySelector('.lang') as HTMLButtonElement;
    langBtn.textContent = 'EN';
    let i = 0;
    this.container.querySelectorAll('.advantage').forEach((el) => {
      el.textContent = Advantages[i];
      i++;
    });
    (this.container.querySelector('.advantages-title') as HTMLElement).textContent = 'О ПРИЛОЖЕНИИ';
    (this.container.querySelector('.video-block') as HTMLElement).textContent = 'КАК РАБОТАЕТ ПРИЛОЖЕНИЕ';
    (this.container.querySelector('.video-block') as HTMLElement).insertAdjacentHTML(
      'beforeend',
      iframePres
    );
    (this.container.querySelector('.team-block') as HTMLElement).textContent = '';
    (this.container.querySelector('.team-block') as HTMLElement).insertAdjacentHTML(
      'afterbegin',
      '<a href="#team">НАША КОМАНДА</a>'
    );
    (this.container.querySelector('.main-block') as HTMLElement).textContent = 'Учи английский легко\nс RS Lang!';
    let m = 0;
    document.querySelectorAll('.nav__button').forEach((btn) => {
      btn.textContent = Buttons[m].text;
      m++;
    });
  }
}

export default MainPage;
