export const CREATE_USER = "CREATE_USER";
export const SET_USERS = "SET_USERS";
import userchat from "../../models/userchat";

export const Create_User = (name, images, desc) => {
  return async (dispatch, getState) => {
    // Any async operations here
    const token = getState().auth.token;
    const idus = getState().auth.idus;

    const res = await fetch(
      ``,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          images,
          desc,
          idus,
        }),
      }
    );

    const resData = await res.json();

    dispatch({
      type: CREATE_USER,
      UserData: {
        id: resData.name,
        name,
        image: images,
        desc,
        idus: idus,
      },
    });
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://whatsapp-clone-tutorial-fa52b-default-rtdb.firebaseio.com/Users.json"
      );
      if (!res.ok) {
        throw new Error("Something went wrong...");
      }

      const resData = await res.json();
      const userstobeloaded = [];
      for (const key in resData) {
        userstobeloaded.push(
          new userchat(
            key,
            resData[key].name,
            resData[key].desc,
            resData[key].images,
            resData[key].idus
          )
        );
      }
      dispatch({ type: SET_USERS, Users: userstobeloaded });
    } catch (e) {
      throw e;
    }
  };
};
