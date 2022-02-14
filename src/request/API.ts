import { PATH_CREATE_USER, PATH_SIGNIN } from '../constants';
import { IUser } from '../constants/authorization';

const HTTP_METHODS = {
  POST: 'POST',
};

export const createUser = async (user: IUser): Promise<Response> => {
  return fetch(`${PATH_CREATE_USER}`, {
    method: HTTP_METHODS.POST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const loginUser = async (user: IUser): Promise<Response> => {
  return fetch(`${PATH_SIGNIN}`, {
    method: HTTP_METHODS.POST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};
