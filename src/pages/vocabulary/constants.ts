import { ITabOption } from '../../models';
import { PageIds } from '../../constants';

export const TAB_OPTIONS: ITabOption[] = [
  {
    value: 'Изучаемые',
    link: PageIds.Vocabulary,
  },
  {
    value: 'Сложные',
    link: PageIds.VocabularyHardPage,
  },
  {
    value: 'Удаленные',
    link: PageIds.VocabularyDeletedPage,
  },
];
