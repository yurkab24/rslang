import { PATH_OF_LEARNWORDS, HttpMethod } from '../constants';
import { IGameStatisticResponse } from '../models';
import { getUserToken } from '../core/utils';

export const updateGameStatisticRequest = (gameStatistic: IGameStatisticResponse, userId: string): Promise<void> =>
  fetch(PATH_OF_LEARNWORDS.statistic(userId), {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: HttpMethod.put,
    body: JSON.stringify({
      optional: gameStatistic,
    }),
  }).then((result) => result.json());

export const getStatisticRequest = (userId: string): Promise<IGameStatisticResponse> =>
  fetch(PATH_OF_LEARNWORDS.statistic(userId), {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((result) => result.json());
