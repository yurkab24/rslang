import Page from '../../core/templates/page';
import { Tags } from '../../constants';
import Spinner from '../../core/component/spiner';

export class VocabularyPage extends Page {
  static TextObject = {
    MainTitle: 'Vocabulary',
  };

  private spinner: Spinner;

  constructor(id: string, spinner: Spinner) {
    super(id);
    this.spinner = spinner;
  }

  render() {
    this.createHeaderTitle(VocabularyPage.TextObject.MainTitle);
    const wrapperBlock = document.createElement(Tags.Div);
    const blockOfWordsLearned = document.createElement(Tags.Div);
    const blockOfWordsDifficult = document.createElement(Tags.Div);
    const blockOfWordsDeleted = document.createElement(Tags.Div);
    const titleOfWordsLearned = document.createElement(Tags.H2);
    const titleOfWordsDifficult = document.createElement(Tags.H2);
    const titleOfWordsDeleted = document.createElement(Tags.H2);
    const sectionOfWords = document.createElement(Tags.Section);

    wrapperBlock.classList.add('wrapper-block-words');
    blockOfWordsLearned.classList.add('block-of-words');
    blockOfWordsDifficult.classList.add('block-of-words');
    blockOfWordsDeleted.classList.add('block-of-words');
    sectionOfWords.classList.add('sectionOfWords');

    this.container.classList.add('wrapper');

    const titlle = ['Изучаемые', 'Сложные', 'Удаленные'];
    titleOfWordsLearned.innerHTML = titlle[0];
    titleOfWordsDifficult.innerHTML = titlle[1];
    titleOfWordsDeleted.innerHTML = titlle[2];

    this.container.append(this.createHeaderTitle(VocabularyPage.TextObject.MainTitle));
    this.container.append(wrapperBlock);
    wrapperBlock.append(blockOfWordsLearned, blockOfWordsDifficult, blockOfWordsDeleted);
    blockOfWordsLearned.append(titleOfWordsLearned);
    blockOfWordsDifficult.append(titleOfWordsDifficult);
    blockOfWordsDeleted.append(titleOfWordsDeleted);

    return this.container;
  }

  public init(): void {
    this.updatePageofVocabulary();
  }

  private updatePageofVocabulary(): void {
    this.spinner.show();
    this.spinner.hide();
  }
}
