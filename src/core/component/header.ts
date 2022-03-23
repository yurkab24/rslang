import Component from '../templates/components';
import { PageIds, Tags } from '../../constants';

export const Buttons = [
  {
    id: PageIds.Main,
    text: '',
  },
  {
    id: PageIds.Dictionary,
    text: 'Учебник',
  },
  {
    id: PageIds.Games,
    text: 'Игры',
  },
  {
    id: PageIds.Statistics,
    text: 'Статистика',
  },
];

export const ButtonsEn = [
  {
    id: PageIds.Main,
    text: '',
  },
  {
    id: PageIds.Dictionary,
    text: 'Textbook',
  },
  {
    id: PageIds.Games,
    text: 'Games',
  },
  {
    id: PageIds.Statistics,
    text: 'Statistics',
  },
];

class Header extends Component {
  renderPageButtons() {
    const pageButtons: HTMLElement = document.createElement('nav');
    pageButtons.className = 'nav';
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement(Tags.A);
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      buttonHTML.className = 'nav__button';
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  changeLang() {
    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage) {
      let i = 0;
      this.container.querySelectorAll('.nav__button').forEach((btn) => {
        btn.textContent = ButtonsEn[i].text;
        i++;
      });
    } else {
      let i = 0;
      this.container.querySelectorAll('.nav__button').forEach((btn) => {
        btn.textContent = Buttons[i].text;
        i++;
      });
    }
  }

  render() {
    this.renderPageButtons();
    this.changeLang();
    return this.container;
  }
}

export default Header;
