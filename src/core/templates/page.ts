import { Tags } from "../../constants";

abstract class Page {
  protected container: HTMLElement;

  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement(Tags.Div);
    this.container.id = id;
  }

  protected createHeaderTitle(text: string) {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  protected createDiv(className: string, text: string) {
    const div = document.createElement(Tags.Div);
    div.className = className;
    div.innerText = text;
    return div;
  }

  render() {
    return this.container;
  }

  public abstract init(): void;
}

export default Page;
