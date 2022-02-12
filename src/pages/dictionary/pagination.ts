import { limitOfPage } from '../../constants';

export class Pagination {
  private limitWord;

  private limitPages;

  private pageNumber = 1;

  constructor(limitWord: number, limitPage: number) {
    this.limitWord = limitWord;
    this.limitPages = limitPage;
  }

  public get pageOfNumber(): number {
    return this.pageNumber;
  }

  public get limitOfPageNumber(): number {
    return this.limitPages;
  }

  public get limitOfWords(): number {
    return this.limitWord;
  }

  public nextPage(): void {
    if (this.pageNumber < limitOfPage) {
      this.pageNumber++;
    }
  }

  public prevPage(): void {
    if (this.pageNumber !== 1) {
      this.pageNumber--;
    }
  }
}
