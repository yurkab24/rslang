import Page from '../../core/templates/page';
import Spinner from '../../core/component/spiner';
import { Tags } from '../../constants/pages';
import { getStatisticRequest } from '../../request/statistic';
import { getUserId } from '../../core/utils';
import { IGameStatisticResponse, IGameStatistic } from '../../models';
import { statisticColumn, arrayColumnStatistic } from '../../constants';

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

    for (let i = 0; i < arrayColumnStatistic.length; i++) {
      statisticTableBlock.classList.add('td-table-row-block');
      statisticTableBlockSprint.classList.add('td-table-row-block');
      if (langFromStorage) {
        statisticTableBlock.textContent = arrayColumnStatistic[i].en;
        statisticTableBlockSprint.textContent = arrayColumnStatistic[i].en;
      } else {
        statisticTableBlock.textContent = arrayColumnStatistic[i].ru;
        statisticTableBlockSprint.textContent = arrayColumnStatistic[i].ru;
      }
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

    if (localStorage.getItem('NightTheme')) {
      this.container.style.filter = 'brightness(0.6) contrast(150%) saturate(2) sepia(10%)';
    }
    return this.container;
  }

  public init(): void {
    this.spinner.show();
    getStatisticRequest(getUserId())
      .then((result) => this.updatePageofStatistic(result))
      .finally(() => this.spinner.hide());
  }

  private updatePageofStatistic(statistic: IGameStatisticResponse): void {
    const statisticAudioGame: { [key: string]: IGameStatistic } = {};
    for (const key in statistic.optional) {
      const date = key.split('T')[0];
      if (statisticAudioGame[date]) {
        statisticAudioGame[date].newWordsOfDay += statistic.optional[key].newWordsOfDay;
        statisticAudioGame[date].rightWords += statistic.optional[key].rightWords;
        statisticAudioGame[date].wrongWords += statistic.optional[key].wrongWords;
        if (statisticAudioGame[date].longestSeries < statistic.optional[key].longestSeries) {
          statisticAudioGame[date].longestSeries = statistic.optional[key].longestSeries;
        }
      } else {
        statisticAudioGame[date] = statistic.optional[key];
      }
    }

    const staticArr = Object.entries(statisticAudioGame);
    staticArr.forEach(([date, { rightWords, wrongWords, longestSeries, newWordsOfDay }]) => {
      const rightPercent = (100 * rightWords) / (rightWords + wrongWords);

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

    //const statisticRowsSprint = document.createElement(Tags.Div);
    //const columnBlockSprint = document.createElement(Tags.Div);
    //columnBlockSprint.classList.add('td-table-row-block');
    //statisticRowsSprint.append(columnBlock.cloneNode(true));
    //statisticRowsSprint.classList.add('td-table-row');
  }
}

export default StatisticsPage;
