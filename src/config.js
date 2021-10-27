import {Api} from "./api";

const config = Object.assign(process.env, window._env)

export const api = new Api(config.REACT_APP_API_URL);
export const newCountryTime = 30; // minutes old
