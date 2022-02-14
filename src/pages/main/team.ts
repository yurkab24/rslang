import Page from '../../core/templates/page';

const logoCat = `<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
</svg>`;

class TeamPage extends Page {
  static TextObject = {
    MainTitle: '',
  };

  private team: { github: string; photo: string; name: string; role: string; contribution: string }[];

  constructor(id: string) {
    super(id);

    this.team = [
      {
        github: 'https://github.com/Tyzikova',
        photo: './assets/jpg/photoTT.jpeg',
        name: 'Татьяна Тузова',
        role: 'Developer',
        contribution:
          'Отвечала за создание и дизайн электронного учебника, навигацию по разделам и страницам учебника. Разработала страницу статистики. Настроила BackEnd и работу с ним.',
      },
      {
        github: 'https://github.com/Yurkab24',
        photo: './assets/png/login-icon.png',
        name: 'Юрий Боровиков',
        role: 'Team lead, developer',
        contribution:
          'Координировал работу команды. Отвечал за архитектуру приложения. Выполнил базовые настройки проекта. Настроил регистрацию и авторизацию пользователя. Создал игру "Спринт".',
      },
      {
        github: 'https://github.com/TatsiaA',
        photo: './assets/jpg/photoTA.jpg',
        name: 'Татьяна Арещенко',
        role: 'Developer',
        contribution:
          'Создание, наполнение и дизайн главной страницы приложения, страниц "Наша команда", "Мини-игры", футера. Настроила роутинг. Отвечала за пользовательские настройки приложения. Создала игру "Аудиовызов".',
      },
    ];
  }

  public init(): void {}

  renderTeam() {
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
      const ghLink = document.createElement('a') as HTMLAnchorElement;
      ghLink.href = `${this.team[i].github}`;
      ghLink.insertAdjacentHTML('afterbegin', logoCat);
      gh.insertAdjacentElement('afterbegin', ghLink);
      const mateName = this.createDiv('', `${this.team[i].name.toUpperCase()}`);
      const role = this.createDiv('', `${this.team[i].role}`);
      const did = this.createDiv('', `${this.team[i].contribution}`);
      teamMate.append(gh, mateName, role, did);
      teamDiv.append(teamMate);
    }
  }

  render() {
    this.renderTeam();
    return this.container;
  }
}

export default TeamPage;