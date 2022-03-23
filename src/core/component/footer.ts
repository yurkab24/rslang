import { Tags } from '../../constants';
import Component from '../templates/components';

class Footer extends Component {
  renderFooter() {
    const rsButton: HTMLElement = document.createElement(Tags.A);
    rsButton.className = 'footer__text footer__rs';
    rsButton.setAttribute('href', 'https://rs.school/js/');
    rsButton.setAttribute('target', '_blank');
    rsButton.setAttribute('title', 'Rolling Scopes School');
    this.container.append(rsButton);

    const footerDiv = document.createElement(Tags.Div);
    footerDiv.className = 'footer-div';
    this.container.append(footerDiv);

    const githubURLs = ['TatsiaA', 'Tyzikova', 'Yurkab24'];
    for (let i = 1; i <= githubURLs.length; i++) {
      const githubButton: HTMLElement = document.createElement(Tags.A);
      githubButton.className = 'footer__text';
      githubButton.id = `github${i}`;
      githubButton.setAttribute('href', `https://github.com/${githubURLs[i - 1]}`);
      githubButton.setAttribute('target', '_blank');
      githubButton.textContent = `${githubURLs[i - 1]}`;
      footerDiv.append(githubButton);
    }

    const year = document.createElement(Tags.Span);
    year.textContent = '© 2022';
    year.className = 'year';
    this.container.append(year);
  }

  render(): HTMLElement {
    this.renderFooter();
    return this.container;
  }
}

export default Footer;
