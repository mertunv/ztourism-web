export default {
    rides(state) {
        return state.rides;
    },
    hasReservation(state) {
        return state.rides && state.rides.length > 0;
    },
    isRide(_, getters, _2, rootGetters) {
        const rides = getters.rides;
        const rideId = rootGetters.rideId;
        return rides.some(ride => ride.id === rideId);
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }
        const currentTimestamp = new Date().getTime();
        return (currentTimestamp - lastFetch) / 1000 > 60;
    },
    seatsOfRide(state) {
        return state.seatState;
    }
};