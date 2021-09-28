export default {
    addRequest(state, payload) {
        state.requests.push(payload);
    },
    setRes(state, payload) {
        state.requests = payload;
    }
};