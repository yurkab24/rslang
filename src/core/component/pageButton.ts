import { Tags } from '../../constants';
import Component from '../templates/components';

class ButtonPage extends Component {
  private currentPageElement: HTMLElement | null = null;

  renderButton() {
    this.container.classList.add('flex', 'hide');
    const buttonContent = document.createElement(Tags.Span);
    buttonContent.textContent = 'up';
    this.container.append(buttonContent);

    this.container.addEventListener('click', this.smoothJumpUp);
    return this.container;
  }

  smoothJumpUp = (): void => {
    this.currentPageElement?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  scrollHandler = (): void => {
    if (this.currentPageElement && this.currentPageElement.scrollTop > document.documentElement.clientHeight) {
      this.container.classList.remove('hide');
    } else {
      this.container.classList.add('hide');
    }
  };

  scroll(currentPageElement: HTMLElement) {
    this.currentPageElement = currentPageElement;
    currentPageElement?.addEventListener('scroll', this.scrollHandler);
  }

  render(): HTMLElement {
    this.renderButton();
    return this.container;
  }
}

export default ButtonPage;
