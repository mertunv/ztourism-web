export default {
    addRide(state, payload) {
        state.rides.push(payload);
    },
    setRides(state, payload) {
        state.rides = payload;
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
};