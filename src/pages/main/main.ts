import Page from '../../core/templates/page';

enum Advantages {
  'В разделе "Словарь"("Dictionary") приложения вы найдете 3600 наиболее часто употребляемых слов английского языка с примерами',
  'Авторизуйтесь и наполняйте Ваш личный словарь! Вам будет доступен прогресс изучения слов, список изученных слов и статистика',
  'Играйте в разделе "Игры"("Games")! Всего 15 минут в день! Используйте перерывы или время в пути с пользой с нашим приложением',
  'Ваш прогресс по мини-играм и по словам за каждый день изучения будет отображен в разделе "Статистика"("Statistics") приложения'
}

const team = [
  {
    github: 'https://github.com/Tyzikova',
    photo: '',
    name: 'Татьяна Тузова',
    role: 'Developer',
    contribution: 'Отвечала за создание дизайна электронного учебника, навигацию по разделам и страницам учебника. Разработала страницу статистики. Настроила Бекенд и работу с ним.'
  },
  {
    github: 'https://github.com/Yurkab24',
    photo: '',
    name: 'Юрий Боровиков',
    role: 'Team lead, developer',
    contribution: 'Координировал работу команды. Отвечал за архитектуру приложения. Выполнил базовые настройки проекта. Настроил регистрацию и авторизацию пользователя. Создал игру "Спринт".'
  },
  {
    github: 'https://github.com/TatsiaA',
    photo: '',
    name: 'Татьяна Арещенко',
    role: 'Developer',
    contribution: 'Создание, наполнение и дизайн главной страницы приложения, раздела "Наша команда", футера. Настроила роутинг. Отвечала за пользовательские настройки приложения. Создала игру "Аудиовызов".'
  }
]

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
    document.body.classList.add('theme-light');
    const themeBtn = document.querySelector('.theme') as HTMLButtonElement;
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      themeBtn.classList.toggle('sun');
    });

  }

  renderAdvantages() {
    const advantagesTitle = this.createDiv('block advantages-title', 'О ПРИЛОЖЕНИИ');
    const advantagesDiv = this.createDiv('advantages', '');

    for (let i = 1; i <= 4; i++) {
      const advantage = this.createDiv('block advantage', '');
      advantage.textContent = Advantages[i-1];
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
    const teamTitleDiv = this.createDiv('block team-block', 'НАША КОМАНДА');
    const teamDiv = this.createDiv('team', '');
    this.container.append(teamTitleDiv, teamDiv);
    for (let i = 0; i < team.length; i++) {
      const teamMate = this.createDiv('block team-mate', '');
      const teamImgDiv = this.createDiv('photo', '');
      teamMate.append(teamImgDiv);
      const photo = team[i].photo;
      //teamImgDiv.insertAdjacentElement('afterbegin', photo);
      const gh = this.createDiv('', `${team[i].github}`);
      const mateName = this.createDiv('', `${team[i].name}`);
      const role = this.createDiv('', `${team[i].role}`);
      const did = this.createDiv('', `${team[i].contribution}`);
      teamMate.append(gh, mateName, role, did);

      teamDiv.append(teamMate);
    }
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

  public init(): void {};

  async getQuotes() {
    const quotes = '../../assets/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const randomQuote = Math.floor(Math.random() * data.length);
    const quoteText = `${data[randomQuote].textEn}\n${data[randomQuote].textRu}`;
    const quoteBlock = this.createDiv('block quote-block', quoteText);
    this.container.querySelector('.main-block')?.insertAdjacentElement('afterend', quoteBlock);
    quoteBlock.addEventListener('click', () => {
      quoteBlock.remove();
      this.getQuotes();
    })
  }

}

export default MainPage;
