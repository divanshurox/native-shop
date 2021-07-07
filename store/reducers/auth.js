import { SIGN_UP, LOG_IN, AUTO_LOGIN, LOG_OUT } from "../actions/auth";

const initState = {
  isAuth: false,
  token: null,
  expiresIn: null,
  userId: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case LOG_IN:
      return {
        ...state,
        isAuth: true,
        token: action.idToken,
        expiresIn: action.expiresIn,
        userId: action.localId,
      };
    case AUTO_LOGIN:
      return {
        ...state,
        isAuth: true,
        token: action.idToken,
        userId: action.localId,
      };
    case LOG_OUT:
      return initState;
    default:
      return state;
  }
};

export default reducer;
