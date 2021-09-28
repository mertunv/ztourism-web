export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
        state.isAdmin = false;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    },
    setAdmin(state, payload) {
        state.isAdmin = payload.isAdmin;
    }
};