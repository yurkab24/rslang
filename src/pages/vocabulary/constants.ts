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

export const TAB_OPTIONS_ENGLISH: ITabOption[] = [
  {
    value: 'Studied',
    link: PageIds.Vocabulary,
  },
  {
    value: 'Difficult',
    link: PageIds.VocabularyHardPage,
  },
  {
    value: 'Deleted',
    link: PageIds.VocabularyDeletedPage,
  },
];
