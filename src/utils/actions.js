export const SET_LOGIN = "SET_LOGIN";

export function setLogin(login) {
  return {
    type: SET_LOGIN,
    login,
  };
}
export const SET_HOME_POSTS = "SET_POSTS";
export function setPosts(posts) {
  return {
    type: SET_HOME_POSTS,
    posts,
  };
}
