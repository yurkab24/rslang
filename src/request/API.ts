import { host } from '../constants';
import { IUser } from '../constants/authorization';

const HTTP_METHODS = {
  POST: 'POST',
};

export const createUser = async (user: IUser) => {
  return fetch(`${host}users`, {
    method: HTTP_METHODS.POST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const loginUser = async (user: IUser) => {
  return fetch(`${host}signin`, {
    method: HTTP_METHODS.POST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};
