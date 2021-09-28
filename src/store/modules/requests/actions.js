export default {
  async reserveRide(context, payload) {
    const localId = context.rootGetters.userId;
    const newRequest = {
      userId: localId,
      seatNumber: payload.seatNumber,
      rideId: payload.rideId,
      name: payload.name,
      time: payload.time,
      destination: payload.destination,
      departure: payload.departure,
      seatPrice: payload.seatPrice,
      date: payload.date
    };
    const response = await fetch(
      `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/reservations/${localId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Göndermeyi başaramadık!'
      );
      throw error;
    }
    console.log('resp name: ' + responseData.name);
    console.log('resp rideId: ' + responseData.rideId);
    console.log('resp seatNumber: ' + responseData.seatNumber);
    //console.log('new req: ' + newRequest);

    

    newRequest.rideId = responseData.name;
    //newRequest.rideId = payload.rideId;

    context.commit('addRequest', newRequest);
  },

  async fetchRes(context) {
    const userId = context.rootGetters.userId;

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://z-tourism-web-default-rtdb.europe-west1.firebasedatabase.app/reservations/${userId}.json?auth=` +
      token
    );

    const responseData = await response.json();
    //const userIds = responseData.name;

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Rezervasyonları almayı başaramadık!'
      );
      throw error;
    }

    const reservations = [];

    for (const key in responseData) {
      const reservation = {
        seatNumber: responseData[key].seatNumber,
        userId: responseData[key].userId,
        rideId: responseData[key].rideId,
        name: key,
        time: responseData[key].time,
        destination: responseData[key].destination,
        departure: responseData[key].departure,
        seatPrice: responseData[key].seatPrice,
        date: responseData[key].date,
      };
      reservations.push(reservation);
      console.log('resp name2: ' + key);

    }
    context.commit('setRes', reservations);
  }
};
