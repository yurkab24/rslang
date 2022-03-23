export interface IUser {
  password: string;
  email: string;
  name?: string;
}

export enum EStatus {
  NotFound = 404,
  Forbidden = 403,
  ExpectationFailed = 417,
  UnprocessableEntity = 422,
}

export const LOCAL_STORAGE_DATA = {
  TOKEN: 'access_token',
  REFRESH_TOKEN: 'access_refresh_token',
  ID: 'user_id',
};

export const MIN_PASSWORD_LENGTH = 8;

export const BUTTON_TEXT = {
  ENTER: 'Войти',
  REGISTRATION: 'Регистрация',
  EXIT: 'Выйти',
};

export const FORM_TEXT = {
  REGISTRATION: 'Зарегистрируйся и изучай английский',
  ENTER: 'Войти в аккаунт',
};

export const ERROR_MESSAGE = {
  LOGIN: 'Неправильный логин или пароль',
  LENGTH: 'Пароль дожен быть не менее 8 символов',
  USER: 'Юзер с такими данными уже существует',
  INPUTS: 'Заполните все поля',
};
