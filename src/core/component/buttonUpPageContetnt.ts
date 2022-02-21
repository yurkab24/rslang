import { Tags } from '../../constants';
import Component from '../templates/components';

class ButtonUp extends Component {
  renderButton() {
    this.container.classList.add('flex', 'hide');
    const buttonContent = document.createElement(Tags.Span);
    buttonContent.textContent = '';
    this.container.append(buttonContent);

    this.container.addEventListener('click', this.smoothJumpUp);
    return this.container;
  }

  smoothJumpUp = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  scrollHandler = (): void => {
    if (window.scrollY > document.documentElement.clientHeight) {
      this.container.classList.remove('hide');
    } else {
      this.container.classList.add('hide');
    }
  };

  render(): HTMLElement {
    this.renderButton();
    window.addEventListener('scroll', this.scrollHandler);
    return this.container;
  }
}

export default ButtonUp;
