import { createStore } from 'redux';

enum Action {
  SET_SETTINGS_VISIBLE = 'SET_SETTINGS_VISIBLE',
  SET_SETTINGS = 'SET_SETTINGS',
  SET_CONTRIBUTORS = 'SET_CONTRIBUTORS',
  SET_REVIEWER = 'SET_REVIEWER'
}

//action creators
export const setSettingsVisible = (settingsVisible: boolean) => ({
  type: Action.SET_SETTINGS_VISIBLE,
  payload: settingsVisible,
});

export const setSettings = (settings: typeof initialState.settings) => ({
  type: Action.SET_SETTINGS,
  payload: settings,
});

export const setContributors = (contributors: string[]) => ({
  type: Action.SET_CONTRIBUTORS,
  payload: contributors,
});

export const setReviewer = (reviewer: string) => ({
  type: Action.SET_REVIEWER,
  payload: reviewer,
});

//reducer = чистая ф-ия, принимает текущее состояние state и action, а затем возвращает новое состояние 
const initialState = {
  settingsVisible: false,
  settings: {
    login: '',
    repo: '',
    blacklist: [] as string[],
  },
  contributors: [] as string[],
  reviewer: null as string | null,
};

const rootReducer = (state = initialState, action: { type: Action; payload: unknown; }) => {
  switch (action.type) {
    case Action.SET_SETTINGS_VISIBLE:
      return {
        ...state, //создается копия состояния
        settingsVisible: action.payload as boolean,
      };
    case Action.SET_SETTINGS:
      return {
        ...state,
        settings: action.payload as typeof initialState.settings,
      };
    case Action.SET_CONTRIBUTORS:
      return {
        ...state,
        contributors: action.payload as string[],
      };
    case Action.SET_REVIEWER:
      return {
        ...state,
        reviewer: action.payload as string,
      };
    default:
      return state;
  }
};

//store
const store = createStore(rootReducer);

export default store;

export type RootState = typeof initialState
