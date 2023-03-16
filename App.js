import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import NavContainer from "./navigation/NavContainer";
import { Provider } from "react-redux";
import AuthReducer from "./store/reducers/Auth";
import UsersReducer from "./store/reducers/AllUsers";


const rooting = combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
});

const store = createStore(rooting, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/Pacifico.ttf"),
    "Amtic-Bold": require("./assets/fonts/Amtic-Bold.ttf"),
  });
};

export default fxn App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavContainer/>
    </Provider>
  );
}
