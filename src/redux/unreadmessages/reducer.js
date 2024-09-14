import {SET_UNREAD_MESSAGES, CLEAR_UNREAD_MESSAGES, FETCH_UNREAD_MESSAGES} from '../unreadmessages/action';

const initialState = {
  unreadMessages: [], // List of unread messages per chat
};

const unreadMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: action.payload,
      };
    case CLEAR_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: [],
      };
    case FETCH_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: action.payload,
      };
    default:
      return state;
  }
};

export default unreadMessagesReducer;
