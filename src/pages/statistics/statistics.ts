import Page from '../../core/templates/page';
import Spinner from '../../core/component/spiner';
import { Tags } from '../../constants/pages';
import { getStatisticRequest } from '../../request/statistic';
import { getUserId } from '../../core/utils';
import { IGameStatisticResponse } from '../../models';

class StatisticsPage extends Page {
  static TextObject = {
    MainTitle: 'Статистика',
  };

  private spinner: Spinner;

  private wrapperStatistic = document.createElement(Tags.Div);

  private statisticTableRow = document.createElement(Tags.Div);

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  render() {
    const title = this.createHeaderTitle(StatisticsPage.TextObject.MainTitle);
    const nameGame = document.createElement(Tags.H2);
    const wrapper = document.createElement(Tags.Div);
    const statisticTableBlock = document.createElement(Tags.Div);

    const rowTittle = ['Дата', 'Изучено слов', 'Правильно (%)', 'Самая длинная серия'];

    for (let i = 0; i < rowTittle.length; i++) {
      statisticTableBlock.classList.add('td-table-row-block');
      statisticTableBlock.textContent = rowTittle[i];
      this.statisticTableRow.append(statisticTableBlock.cloneNode(true));
    }

    nameGame.textContent = '"АУДИОВЫЗОВ"';

    this.container.classList.add('wrapper-statistic-page');
    wrapper.classList.add('wrapper-container');
    this.wrapperStatistic.classList.add('wrapper-block-statistic');
    this.statisticTableRow.classList.add('td-table-row');

    this.container.append(title, nameGame);
    this.wrapperStatistic.append(this.statisticTableRow.cloneNode(true));
    this.container.append(wrapper);
    wrapper.append(this.wrapperStatistic);

    return this.container;
  }

  public init(): void {
    this.spinner.show();
    getStatisticRequest(getUserId())
      .then((result) => this.updatePageofStatistic(result))
      .finally(() => this.spinner.hide());
  }

  private updatePageofStatistic(statistic: IGameStatisticResponse): void {
    const staticArr = Object.entries(statistic.optional);

    staticArr.forEach(([data, { rightWords, wrongWords, longestSeries }]) => {
      const rightPercent = ((rightWords + wrongWords) / 100) * rightWords;
      const statisticRows = document.createElement(Tags.Div);
      const div1 = document.createElement(Tags.Div);
      const div2 = document.createElement(Tags.Div);
      const div3 = document.createElement(Tags.Div);
      const div4 = document.createElement(Tags.Div);

      statisticRows.classList.add('td-table-row');
      div1.classList.add('td-table-row-block');
      div2.classList.add('td-table-row-block');
      div3.classList.add('td-table-row-block');
      div4.classList.add('td-table-row-block');

      div1.textContent = data;
      div2.textContent = String(rightWords + wrongWords);
      div3.textContent = String(rightPercent);
      div4.textContent = String(longestSeries);

      statisticRows.append(div1, div2, div3, div4);
      this.wrapperStatistic.append(statisticRows.cloneNode(true));
    });
  }
}

export default StatisticsPage;
