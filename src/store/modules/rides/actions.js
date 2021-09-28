export default {
  async addRide(context, data) {
    //const rideId = data.rideId;
    //const seatStat = context.rootGetters.seatsOfRide;
    const seatStat = context.getters.seatsOfRide;
    //const seats = [];
    const rideData = {
      name: data.name,
      departure: data.departure,
      destination: data.destination,
      seatPrice: data.price,
      date: data.dateOfDeparture,
      time: data.timeOfDeparture,
      seatStatus: seatStat
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides.json?auth=` +
        token,
      {
        method: 'POST',
        body: JSON.stringify(rideData)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      //
    }

    context.commit('addRide', {
      ...rideData,
      //id: rideId
    });
  },
  async loadRides(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/rides.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Listeleyemedik!');
      throw error;
    }

    const rides = [];

    for (const key in responseData) {
      const ride = {
        id: key,
        name: responseData[key].name,
        departure: responseData[key].departure,
        destination: responseData[key].destination,
        seatPrice: responseData[key].seatPrice,
        date: responseData[key].date,
        time: responseData[key].time,
        seatStatus: responseData[key].seatStatus
      };
      rides.push(ride);
    }
    context.commit('setRides', rides);
    context.commit('setFetchTimestamp');
  }
};
