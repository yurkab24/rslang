import Page from '../../core/templates/page';

export class VocabularyPage extends Page {
  static TextObject = {
    MainTitle: 'Vocabulary',
  };

  render() {
    this.createHeaderTitle(VocabularyPage.TextObject.MainTitle);
    const wrapperBlock = document.createElement('div');
    const blockOfWordsLearned = document.createElement('div');
    const blockOfWordsDifficult = document.createElement('div');
    const blockOfWordsDeleted = document.createElement('div');
    const titleOfWordsLearned = document.createElement('h2');
    const titleOfWordsDifficult = document.createElement('h2');
    const titleOfWordsDeleted = document.createElement('h2');
    const sectionOfWords = document.createElement('section');

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

  public init(): void {}
}
