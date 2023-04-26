import { authh, out} from "../actions/Auth";

const initialState = {
  token: null,
  idus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authh:
      return {
        token: action.token,
        idus: action.idus,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
//added authentication actions
