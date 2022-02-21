import { Tags } from '../../constants';
import { ITabOption } from '../../models';
import Component from '../templates/components';

class Tabs extends Component {
  private tabOptions: ITabOption[];

  constructor(tabOptions: ITabOption[]) {
    super(Tags.Div, 'section-link-handler');

    this.tabOptions = tabOptions;
  }

  renderTabs() {
    this.tabOptions.forEach((item) => {
      const link = document.createElement(Tags.A);
      link.href = `#${item.link}`;
      link.setAttribute('data-hover', `${item.value}`);
      link.textContent = item.value;

      this.container.append(link);
    });
  }

  render(): HTMLElement {
    this.renderTabs();
    return this.container;
  }
}

export default Tabs;
