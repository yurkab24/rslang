export const host = 'https://learnwords-example.herokuapp.com/';

export const PATH_OF_LEARNWORDS = {
  words: `${host}words`,
  userAggregatedWords: (userId: string) => `${host}users/${userId}/aggregatedWords`,
  userWord: (userId: string, wordId: string) => `${host}users/${userId}/words/${wordId}`,
};

export const PATH_CREATE_USER = `${host}users`;

export const PATH_SIGNIN = `${host}signin`;
