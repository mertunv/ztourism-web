import { createStore } from "vuex";

import ridesModule from "./modules/rides/index.js";
import requestsModule from "./modules/requests/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
    modules: {
        rides: ridesModule,
        requests: requestsModule,
        auth: authModule,
    },
    state() {
        return {
          rideId: 'r3',
          userId: 'u1',
          // seatState: [
          //   { number: 1, isActive: false },
          //   { number: 2, isActive: false },
          //   { number: 3, isActive: false },
          //   { number: 4, isActive: false },
          //   { number: 5, isActive: false },
          //   { number: 6, isActive: false },
          //   { number: 7, isActive: false },
          //   { number: 8, isActive: false },
          //   { number: 9, isActive: false },
          //   { number: 10, isActive: false },
    
          //   { number: 11, isActive: false },
          //   { number: 12, isActive: false },
          //   { number: 13, isActive: false },
          //   { number: 14, isActive: false },
          //   { number: 15, isActive: false },
          //   { number: 16, isActive: false },
          //   { number: 17, isActive: false },
          //   { number: 18, isActive: false },
          //   { number: 19, isActive: false },
          //   { number: 20, isActive: false },
    
          //   { number: 21, isActive: false },
          //   { number: 22, isActive: false },
          //   { number: 23, isActive: false },
          //   { number: 24, isActive: false },
          //   { number: 25, isActive: false },
          //   { number: 26, isActive: false },
          //   { number: 27, isActive: false },
          //   { number: 28, isActive: false },
          //   { number: 29, isActive: false },
          //   { number: 30, isActive: false },
    
          //   { number: 31, isActive: false },
          //   { number: 32, isActive: false },
          //   { number: 33, isActive: false },
          //   { number: 34, isActive: false },
          //   { number: 35, isActive: false },
          //   { number: 36, isActive: false },
          //   { number: 37, isActive: false },
          //   { number: 38, isActive: false },
          //   { number: 39, isActive: false },
          //   { number: 40, isActive: false }
          // ],
        };
      },
      getters: {
        rideId(state) {
          return state.rideId;
        },
        
      },
      // computed: {
      //   stateOfSeats(state) {
      //     return state.seatState.filter(seatState => seatState);
      //   }
      // }
});


export default store;