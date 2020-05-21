import { SET_LOGIN } from "./actions";

const initState = {
  login: false,
};

export function reducer(state = initState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        login: action.login,
      };
    default: {
      return state;
    }
  }
}
