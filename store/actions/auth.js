import axios from "axios";
import { AsyncStorage } from "react-native";

export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const AUTO_LOGIN = "AUTO_LOGIN";

const apiKey = "AIzaSyCWyKAPW_2uPEKfWSr2JpqTkibtIRBjt9I";

export const signUp = (email, password) => {
  return async (dispatch) => {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    if (res.status !== 200) {
      throw new Error("Somethings wrong!");
    }
    dispatch({
      type: SIGN_UP,
      ...res.data,
    });
    const expireDate = new Date(
      new Date().getTime() + parseInt(res.data.expiresIn) * 1000
    );
    saveDataToStorage(res.data.idToken, res.data.localId, expireDate);
  };
};

export const logIn = (email, password) => {
  console.log("working");
  return async (dispatch) => {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    if (res.status !== 200) {
      throw new Error("Somethings Wrong!");
    }
    dispatch({
      type: LOG_IN,
      ...res.data,
    });
    dispatch(autoLogOut(res.data.expiresIn));
    const expireDate = new Date(
      new Date().getTime() + parseInt(res.data.expiresIn) * 1000
    );
    saveDataToStorage(res.data.idToken, res.data.localId, expireDate);
  };
};

const saveDataToStorage = (token, userId, expireDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiresIn: expireDate.toISOString(),
    })
  );
};

export const autoLogin = (authObj, exTime) => {
  return (dispatch) => {
    dispatch(autoLogOut(exTime));
    dispatch({
      type: AUTO_LOGIN,
      ...authObj,
    });
  };
};

export const logOut = () => {
  clearTimeOut();
  AsyncStorage.removeItem("userData");
  return {
    type: LOG_OUT,
  };
};

let timer;

const clearTimeOut = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const autoLogOut = (expireTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expireTime * 1000);
  };
};
