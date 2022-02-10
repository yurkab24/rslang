import Component from '../templates/components';
import { PageIds } from '../../constants';

const Buttons = [
  {
    id: PageIds.Main,
    text: 'Main Page',
  },
  {
    id: PageIds.Dictionary,
    text: 'Dictionary',
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
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

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
