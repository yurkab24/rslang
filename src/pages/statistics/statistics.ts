import Page from '../../core/templates/page';
import Spinner from '../../core/component/spiner';
import { Tags } from '../../constants/pages';

class StatisticsPage extends Page {
  static TextObject = {
    MainTitle: 'Statistics',
  };

  private spinner: Spinner;

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  render() {
    const title = this.createHeaderTitle(StatisticsPage.TextObject.MainTitle);
    const wrapper = document.createElement(Tags.Div);
    const wrapperStatistic = document.createElement(Tags.Div);
    const statisticTableRow = document.createElement(Tags.Div);
    const statisticTableBlock = document.createElement(Tags.Div);

    const rowTittle = ['Игра', 'Изучено слов', 'Правильно (%)', 'Самая длинная серия'];
    const columnTittle = ['Спринт', 'Аудиовызов', 'Итого'];

    for (let i = 0; i < rowTittle.length; i++) {
      statisticTableBlock.classList.add('td-table-row-block');
      statisticTableRow.append(statisticTableBlock.cloneNode(true));
    }

    for (let i = 0; i < 4; i++) {
      statisticTableRow.classList.add('td-table-row');
      wrapperStatistic.append(statisticTableRow.cloneNode(true));
    }

    this.container.append(title);
    this.container.classList.add('wrapper-statistic-page');
    wrapper.classList.add('wrapper-container');
    wrapperStatistic.classList.add('wrapper-block-statistic');

    this.container.append(wrapper);
    wrapper.append(wrapperStatistic);

    const child = wrapperStatistic.childNodes;
    child[0].childNodes.forEach((el, index) => (el.textContent = rowTittle[index]));
    child[1].childNodes[0].textContent = columnTittle[0];
    child[2].childNodes[0].textContent = columnTittle[1];
    child[3].childNodes[0].textContent = columnTittle[2];

    return this.container;
  }

  public init(): void {
    this.updatePageofStatistic();
  }

  private updatePageofStatistic(): void {}
}

export default StatisticsPage;
