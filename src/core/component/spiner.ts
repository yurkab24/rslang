import { Tags } from '../../constants';
import Component from '../templates/components';

class Spinner extends Component {
  private spinner = document.createElement(Tags.Div);

  show() {
    this.container.classList.remove('hide');
  }

  hide() {
    this.container.classList.add('hide');
  }

  renderSpiner() {
    this.spinner.classList.add('spinner-image');
    this.container.append(this.spinner);
    return this.container;
  }

  render(): HTMLElement {
    this.renderSpiner();
    this.hide();
    return this.container;
  }
}

export default Spinner;
