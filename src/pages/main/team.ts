import { Tags } from '../../constants';
import Page from '../../core/templates/page';
import MainPage from './main';

const logoCat = `<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
</svg>`;

class TeamPage extends Page {
  static TextObject = {
    MainTitle: '',
  };

  private team: { github: string; photo: string; name: string; role: string; contribution: string }[];

  private teamEn: { github: string; photo: string; name: string; role: string; contribution: string }[];

  constructor(id: string) {
    super(id);

    this.team = [
      {
        github: 'https://github.com/Tyzikova',
        photo: './assets/jpg/TanyaT.jpeg',
        name: 'Татьяна Тузова',
        role: 'Developer',
        contribution:
          '- Создание, дизайн, навигация по страницам электронного учебника; \n- Пользовательский словарь; \n- Страница статистики; \n- Настройка BackEnd и работы с ним.',
      },
      {
        github: 'https://github.com/Yurkab24',
        photo: './assets/jpg/YuraB.jpg',
        name: 'Юрий Боровиков',
        role: 'Team lead, \ndeveloper',
        contribution:
          '- Базовые настройки проекта; \n- Регистрация и авторизация пользователя; \n- Поддержка корректной работы приложения;\n- Игра "Спринт".',
      },
      {
        github: 'https://github.com/TatsiaA',
        photo: './assets/jpg/TanyaA.jpg',
        name: 'Татьяна Арещенко',
        role: 'Developer',
        contribution:
          '- Главная страница приложения; \n- Страницы "Наша команда", "Мини-игры", футер; \n- Роутинг; \n- Пользовательские настройки приложения; \n- Игра "Аудиовызов".',
      },
    ];

    this.teamEn = [
      {
        github: 'https://github.com/Tyzikova',
        photo: './assets/jpg/TanyaT.jpeg',
        name: 'Tatsiana Tuzava',
        role: 'Developer',
        contribution:
          '- Creation, design, navigation through the pages of an electronic textbook; \n- User dictionary; \n- Statistics page; \n- Configuring BackEnd and working with it.',
      },
      {
        github: 'https://github.com/Yurkab24',
        photo: './assets/jpg/YuraB.jpg',
        name: 'Yury Baravikou',
        role: 'Team lead, \ndeveloper',
        contribution:
          '- Basic project settings; \n- User registration and authorization; \n- Support for the correct operation of the application;\n- "Sprint" game.',
      },
      {
        github: 'https://github.com/TatsiaA',
        photo: './assets/jpg/TanyaA.jpg',
        name: 'Tatsiana Areshchanka',
        role: 'Developer',
        contribution:
          '- Main page creation and design; \n- "Our team", "Mini-games" pages, footer; \n- Routing; \n- Application user settings; \n- Audiochallenge game.',
      },
    ];
  }

  public init(): void {}

  renderTeam(): void {
    const teamTitleDiv = this.createDiv('block team-block', '');
    teamTitleDiv.insertAdjacentHTML('afterbegin', 'НАША КОМАНДА');
    const teamDiv = this.createDiv('team', '');
    this.container.append(teamTitleDiv, teamDiv);
    for (let i = 0; i < this.team.length; i++) {
      const teamMate = this.createDiv('block team-mate', '');
      const teamImgDiv = this.createDiv('photo', '');
      teamMate.append(teamImgDiv);
      const photo = document.createElement('img');
      photo.src = this.team[i].photo;
      photo.alt = `${this.team[i].name}`;
      photo.className = 'photo-img';

      teamImgDiv.insertAdjacentElement('afterbegin', photo);
      const gh = this.createDiv('', '');
      const ghLink = document.createElement(Tags.A) as HTMLAnchorElement;
      ghLink.href = `${this.team[i].github}`;
      ghLink.insertAdjacentHTML('afterbegin', logoCat);
      gh.insertAdjacentElement('afterbegin', ghLink);
      const mateName = this.createDiv('', `${this.team[i].name.toUpperCase()}`);
      const role = this.createDiv('', `${this.team[i].role}`);
      const did = this.createDiv('done', `${this.team[i].contribution}`);
      teamMate.append(gh, mateName, role, did);
      teamDiv.append(teamMate);
    }
  }

  changeLang() {
    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage) {
      (this.container.querySelector('.team-block') as HTMLElement).textContent = 'OUR TEAM';
      let k = 0;
      (this.container.querySelectorAll('.team-mate')).forEach((mate) => {
        mate.innerHTML = '';

      const teamImgDiv = this.createDiv('photo', '');
      mate.append(teamImgDiv);
      const photo = document.createElement('img');
      photo.src = this.teamEn[k].photo;
      photo.alt = `${this.teamEn[k].name}`;
      photo.className = 'photo-img';

      teamImgDiv.insertAdjacentElement('afterbegin', photo);
      const gh = this.createDiv('', '');
      const ghLink = document.createElement(Tags.A) as HTMLAnchorElement;
      ghLink.href = `${this.teamEn[k].github}`;
      ghLink.insertAdjacentHTML('afterbegin', logoCat);
      gh.insertAdjacentElement('afterbegin', ghLink);
      const mateName = this.createDiv('', `${this.teamEn[k].name.toUpperCase()}`);
      const role = this.createDiv('', `${this.teamEn[k].role}`);
      const did = this.createDiv('done', `${this.teamEn[k].contribution}`);
      mate.append(gh, mateName, role, did);
      k++;
      });
     } else {
      (this.container.querySelector('.team-block') as HTMLElement).textContent = 'НАША КОМАНДА';
      let i = 0;
      (this.container.querySelectorAll('.team-mate')).forEach((mate) => {
        mate.innerHTML = '';
        const teamImgDiv = this.createDiv('photo', '');
        mate.append(teamImgDiv);
        const photo = document.createElement('img');
        photo.src = this.team[i].photo;
        photo.alt = `${this.team[i].name}`;
        photo.className = 'photo-img';

        teamImgDiv.insertAdjacentElement('afterbegin', photo);
        const gh = this.createDiv('', '');
        const ghLink = document.createElement(Tags.A) as HTMLAnchorElement;
        ghLink.href = `${this.team[i].github}`;
        ghLink.insertAdjacentHTML('afterbegin', logoCat);
        gh.insertAdjacentElement('afterbegin', ghLink);
        const mateName = this.createDiv('', `${this.team[i].name.toUpperCase()}`);
        const role = this.createDiv('', `${this.team[i].role}`);
        const did = this.createDiv('done', `${this.team[i].contribution}`);
        mate.append(gh, mateName, role, did);
        i++;
      });
     }
  }

  render(): HTMLElement {
    this.renderTeam();
    this.changeLang();
    return this.container;
  }


}

export default TeamPage;
