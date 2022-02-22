import Page from '../../core/templates/page';
import Spinner from '../../core/component/spiner';
import { Tags } from '../../constants/pages';
import { getStatisticRequest } from '../../request/statistic';
import { getUserId } from '../../core/utils';
import { IGameStatisticResponse } from '../../models';
import { statisticColumn } from '../../constants';

class StatisticsPage extends Page {
  static TextObject = {
    MainTitle: 'Статистика',
  };

  private spinner: Spinner;

  private wrapperStatistic = document.createElement(Tags.Div);

  private wrapperStatisticSprint = document.createElement(Tags.Div);

  private statisticTableRow = document.createElement(Tags.Div);

  private statisticTableRowSprint = document.createElement(Tags.Div);

  private nameGame = document.createElement(Tags.H2);

  private nameGameSprint = document.createElement(Tags.H2);

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  render() {
    const title = this.createHeaderTitle(StatisticsPage.TextObject.MainTitle);

    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage) {
      title.textContent = 'Statistic';
      this.nameGame.textContent = '"AUDIOCHALLENGE"';
      this.nameGameSprint.textContent = '"SPRINT"';
    } else {
      title.textContent = StatisticsPage.TextObject.MainTitle;
      this.nameGame.textContent = '"АУДИОВЫЗОВ"';
      this.nameGameSprint.textContent = '"СПРИНТ"';
    }

    const wrapperChallenge = document.createElement(Tags.Div);
    const wrapperSprint = document.createElement(Tags.Div);
    const statisticTableBlock = document.createElement(Tags.Div);
    const statisticTableBlockSprint = document.createElement(Tags.Div);

    const rowTittle = ['Дата', 'Новые слова за день', 'Изучено слов', 'Правильно (%)', 'Серия правильных ответов'];

    for (let i = 0; i < rowTittle.length; i++) {
      statisticTableBlock.classList.add('td-table-row-block');
      statisticTableBlockSprint.classList.add('td-table-row-block');
      statisticTableBlock.textContent = rowTittle[i];
      statisticTableBlockSprint.textContent = rowTittle[i];
      this.statisticTableRow.append(statisticTableBlock.cloneNode(true));
      this.statisticTableRowSprint.append(statisticTableBlockSprint.cloneNode(true));
    }

    this.container.classList.add('wrapper-statistic-page');
    wrapperChallenge.classList.add('wrapper-container');
    wrapperSprint.classList.add('wrapper-container');
    this.wrapperStatistic.classList.add('wrapper-block-statistic');
    this.wrapperStatisticSprint.classList.add('wrapper-block-statistic');
    this.statisticTableRow.classList.add('td-table-row');
    this.statisticTableRowSprint.classList.add('td-table-row');

    this.container.append(title, this.nameGame, wrapperChallenge, this.nameGameSprint, wrapperSprint);
    this.wrapperStatistic.append(this.statisticTableRow);
    this.wrapperStatisticSprint.append(this.statisticTableRowSprint);
    wrapperChallenge.append(this.wrapperStatistic);
    wrapperSprint.append(this.wrapperStatisticSprint);

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

    staticArr.forEach(([date, { rightWords, wrongWords, longestSeries, newWordsOfDay }]) => {
      const rightPercent = ((rightWords + wrongWords) / 100) * rightWords;

      const statisticRows = document.createElement(Tags.Div);
      for (let i = 0; i < statisticColumn; i++) {
        const columnBlock = document.createElement(Tags.Div);
        columnBlock.classList.add('td-table-row-block');
        statisticRows.append(columnBlock.cloneNode(true));
      }

      statisticRows.classList.add('td-table-row');

      statisticRows.childNodes[0].textContent = new Date(date).toLocaleDateString();
      statisticRows.childNodes[1].textContent = String(newWordsOfDay);
      statisticRows.childNodes[2].textContent = String(rightWords + wrongWords);
      statisticRows.childNodes[3].textContent = String(Math.round(rightPercent));
      statisticRows.childNodes[4].textContent = String(longestSeries);

      this.wrapperStatistic.append(statisticRows.cloneNode(true));
    });
  }
}

export default StatisticsPage;
