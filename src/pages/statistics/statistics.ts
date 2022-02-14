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
    for (let i = 0; i < 4; i++) {
      statisticTableRow.append(statisticTableBlock.cloneNode(true));
    }
    for (let i = 0; i < 5; i++) {
      wrapperStatistic.append(statisticTableRow.cloneNode(true));
    }
    this.container.append(title);
    this.container.classList.add('wrapper-statistic-page');
    wrapper.classList.add('wrapper-container');
    wrapperStatistic.classList.add('wrapper-block-statistic');

    this.container.append(wrapper);
    wrapper.append(wrapperStatistic);

    return this.container;
  }

  public init(): void {
    this.updatePageofStatistic();
  }

  private updatePageofStatistic(): void {
    // this.spinner.show();
    // getStatisticRequest().then((result) => {
    //   this.renderBlockStatistic(result);
    //   this.spinner.hide();
    // });
  }
}

export default StatisticsPage;
