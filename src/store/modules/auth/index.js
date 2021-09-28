import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
      localId: null,
      isAdmin: null
    };
  },
  mutations,
  actions,
  getters
};
