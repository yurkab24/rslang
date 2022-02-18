import { PageIds } from '../../constants';
import Page from '../../core/templates/page';

enum Advantages {
  'В разделе "Словарь"("Dictionary") приложения вы найдете 3600 наиболее часто употребляемых слов английского языка с примерами',
  'Авторизуйтесь и наполняйте Ваш личный словарь! Вам будет доступен прогресс изучения слов, список изученных слов и статистика',
  'Играйте в разделе "Игры"("Games")! Всего 15 минут в день! Используйте перерывы или время в пути с пользой с нашим приложением',
  'Ваш прогресс по мини-играм и по словам за каждый день изучения будет отображен в разделе "Статистика"("Statistics") приложения',
}

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  renderHeaderElements(): void {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme';

    const signBtn = document.createElement('button');
    signBtn.className = 'sign';
    (document.querySelector('.header') as HTMLElement).append(themeBtn, signBtn);

    signBtn.onclick = () => {
      window.location.href = `#${PageIds.Authorization}`;
    };

    window.addEventListener('hashchange', () => {
      themeBtn.remove();
      signBtn.remove();
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
    const videoDiv = this.createDiv('block video-block', 'КАК РАБОТАЕТ ПРИЛОЖЕНИЕ');
    this.container.append(videoDiv);
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
}

export default MainPage;
