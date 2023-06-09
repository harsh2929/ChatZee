import AsyncStorage from "@react-native-async-storage/async-storage";

export const authh = "authh";
export const out= "LOGOUT";
let timer;

export const authh = (token, idus, expiretime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiretime));
    dispatch({
      type: authh,
      token: token,
      idus: idus,
    });
  };
};

export const SignUp = (Email, password) => {
  return async (dispatch) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const ResData = await res.json();

    if (!res.ok) {
      let message;
      const ErrorMsg = ResData.error.message;
      if (ErrorMsg == "Email_EXISTS") {
        message = "Email already exists already ....";
      }
      throw new Error(message);
    }

    dispatch(
      authh(
        ResData.idToken,
        ResData.localId,
        parseInt(ResData.expiresIn) * 1000
      )
    );

    const ExpireDate = new Date(
      new Date().getTime() + parseInt(ResData.expiresIn) * 1000 // Convert into Seconds
    );

    SaveDataToStorage(ResData.idToken, ResData.localId, ExpireDate);
  };
};

export const Login = (Email, Pass) => {
  return async (dispatch) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: Pass,
          returnSecureToken: true,
        }),
      }
    );

    if (!res.ok) {
      let message = "Something went wrong...";
      const errorResData = await res.json();
      const ErrorMsg = errorResData.error.message;
      if (ErrorMsg == "EMAIL_NOT_FOUND" || ErrorMsg == "INVALID_EMAIL") {
        message = "Please Enter a Valid Email Address";
      } else if (errorResData.error.message == "INVALID_PASSWORD") {
        message = "Sorrry, Your Password is wrong";
      }
      throw new Error(message);
    }

    const resData = await res.json();

    dispatch(
      authh(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const ExpireDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000 // Convert into Seconds
    );

    SaveDataToStorage(resData.idToken, resData.localId, ExpireDate);
  };
};

export const out= () => {
  AsyncStorage.removeItem("UserData");
  return { type: out};
};

const setLogoutTimer = (expireTime) => {
  clearLogoutTimer();
  // Timer that will expire when the token will expire
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(Logout());
    }, expireTime);
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const SaveDataToStorage = (token, idus, ExpireDate) => {
  AsyncStorage.setItem(
    "UserData",
    JSON.stringify({
      token: token,
      idus: idus,
      ExpireDate: ExpireDate.toISOString(),
    })
  );
};
