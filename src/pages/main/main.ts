import Page from '../../core/templates/page';

enum Advantages {
  'В разделе "Словарь"("Dictionary") приложения вы найдете 3600 наиболее часто употребляемых слов английского языка с примерами',
  'Авторизуйтесь и наполняйте Ваш личный словарь! Вам будет доступен прогресс изучения слов, список изученных слов и статистика',
  'Играйте в разделе "Игры"("Games")! Всего 15 минут в день! Используйте перерывы или время в пути с пользой с нашим приложением',
  'Ваш прогресс по мини-играм и по словам за каждый день изучения будет отображен в разделе "Статистика"("Statistics") приложения',
}

const team = [
  {
    github: 'https://github.com/Tyzikova',
    photo: '',
    name: 'Татьяна Тузова',
    role: 'Developer',
    contribution:
      'Отвечала за создание и дизайн электронного учебника, навигацию по разделам и страницам учебника. Разработала страницу статистики. Настроила BackEnd и работу с ним.',
  },
  {
    github: 'https://github.com/Yurkab24',
    photo: '',
    name: 'Юрий Боровиков',
    role: 'Team lead, developer',
    contribution:
      'Координировал работу команды. Отвечал за архитектуру приложения. Выполнил базовые настройки проекта. Настроил регистрацию и авторизацию пользователя. Создал игру "Спринт".',
  },
  {
    github: 'https://github.com/TatsiaA',
    photo: '',
    name: 'Татьяна Арещенко',
    role: 'Developer',
    contribution:
      'Создание, наполнение и дизайн главной страницы приложения, раздела "Наша команда", футера. Настроила роутинг. Отвечала за пользовательские настройки приложения. Создала игру "Аудиовызов".',
  },
];

const logoCat = `<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
</svg>`;

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  constructor(id: string) {
    super(id);
  }

  renderHeaderElements() {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme';

    const signBtn = document.createElement('button');
    signBtn.className = 'sign';
    (document.querySelector('.header') as HTMLElement).append(themeBtn, signBtn);

    window.addEventListener('hashchange', () => {
      themeBtn.remove();
      signBtn.remove();
    });
  }

  renderTheme() {
    const themeBtn = document.querySelector('.theme') as HTMLButtonElement;
    if (localStorage.getItem('NightTheme')) {
      document.body.className = 'theme-dark';
      themeBtn.classList.toggle('sun');
    } else {
      document.body.className = 'theme-light';
    }
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      document.body.classList.toggle('theme-light');
      themeBtn.classList.toggle('sun');
      document.body.className === 'theme-dark'
        ? localStorage.setItem('NightTheme', 'on')
        : localStorage.removeItem('NightTheme');
    });
  }

  renderAdvantages() {
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

  renderVideo() {
    const videoDiv = this.createDiv('block video-block', 'КАК РАБОТАЕТ ПРИЛОЖЕНИЕ');
    this.container.append(videoDiv);
  }

  renderTeam() {
    const teamTitleDiv = this.createDiv('block team-block', '');
    teamTitleDiv.insertAdjacentHTML('afterbegin', `<a href="#team">НАША КОМАНДА</a>`);
    const teamDiv = this.createDiv('team', '');
    teamDiv.id = 'team';
    this.container.append(teamTitleDiv, teamDiv);
    for (let i = 0; i < team.length; i++) {
      const teamMate = this.createDiv('block team-mate', '');
      const teamImgDiv = this.createDiv('photo', '');
      teamMate.append(teamImgDiv);
      const photo = team[i].photo;

      //teamImgDiv.insertAdjacentElement('afterbegin', photo);
      const gh = this.createDiv('', '');
      const ghLink = document.createElement('a') as HTMLAnchorElement;
      ghLink.href = `${team[i].github}`;
      ghLink.insertAdjacentHTML('afterbegin', logoCat);
      gh.insertAdjacentElement('afterbegin', ghLink);
      const mateName = this.createDiv('', `${team[i].name}`);
      const role = this.createDiv('', `${team[i].role}`);
      const did = this.createDiv('', `${team[i].contribution}`);
      teamMate.append(gh, mateName, role, did);
      teamDiv.append(teamMate);
    }
    teamTitleDiv.addEventListener('click', this.showTeam);
  }

  showTeam() {
    const ourTeam = document.querySelector('.team') as HTMLDivElement;
    ourTeam.classList.toggle('team-visible');
  }

  render() {
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

  async getQuotes() {
    const quotes = '../../assets/quotes.json';
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
