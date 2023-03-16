import userchat from "../../models/userchat";
import { CREATE_USER, SET_USERS } from "../actions/AllUsers";

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      const NewUser = new userchat(
        action.UserData.id.toString(),
        action.UserData.name,
        action.UserData.desc,
        action.UserData.image,
        action.UserData.idus
      );
      return {
        users: state.users.concat(NewUser),
      };
    case SET_USERS:
      return {
        users: action.Users,
      };
    default:
      return state;
  }
};
