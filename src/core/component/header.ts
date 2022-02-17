import Component from '../templates/components';
import { PageIds } from '../../constants';

const Buttons = [
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

class Header extends Component {
  renderPageButtons() {
    const pageButtons: HTMLElement = document.createElement('nav');
    pageButtons.className = 'nav';
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      buttonHTML.className = 'nav__button';
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}

export default Header;
