import { SET_LOGIN, SET_HOME_POSTS } from "./actions";

const initState = {
  login: false,
  posts: [],
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        login: action.login,
        posts: state.posts,
      };
    case SET_HOME_POSTS:
      return {
        login: state.login,
        posts: action.posts,
      };
    default: {
      return state;
    }
  }
}
