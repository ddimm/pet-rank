export const SET_LOGIN = "SET_LOGIN";

export function setLogin(login) {
  return {
    type: SET_LOGIN,
    login,
  };
}
