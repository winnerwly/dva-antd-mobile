import * as usersService from '../services/example';


export default {

  namespace: 'example',

  state: {

  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   }
  // },

  effects: {
    *fetch({ payload: { isLogin } }, { call, put }) {
      const { data } = yield call(usersService.ajaxForm, { data:11 });
      yield put({ type: 'save', payload: data });
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    }
  }

};
