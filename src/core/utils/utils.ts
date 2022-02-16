import { LOCAL_STORAGE_DATA } from '../../constants/authorization';

export const getUserId = () => String(localStorage.getItem(LOCAL_STORAGE_DATA.ID));

export const getUserToken = () => String(localStorage.getItem(LOCAL_STORAGE_DATA.TOKEN));

export const isAuth = () => Boolean(localStorage.getItem(LOCAL_STORAGE_DATA.TOKEN));
