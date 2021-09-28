import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            rides: [
                {
                    id: 'r1',
                    name: 'İSTANBUL->ANKARA',
                    destination: 'Ankara',
                    listOfEntries: ['tarih', 'saat', 'varış-yeri'],
                    date: '22.09.2021',
                    time: '14.00',
                    departure: 'İstanbul',
                    seatPrice: 30,
                    //seatStatus: this.seatState
                },
                {
                    id: 'r2',
                    name: 'İZMİR->ANTALYA',
                    destination: 'Antalya',
                    listOfEntries: ['tarih', 'saat', 'varış-yeri'],
                    date: '30.09.2021',
                    time: '10.00',
                    departure: 'İzmir',
                    seatPrice: 40,
                    //seatStatus: this.seatState
                }
            ],
            seatState: [
                { number: 1, isActive: false, gender: 'boş' },
                { number: 2, isActive: false, gender: 'boş' },
                { number: 3, isActive: false, gender: 'boş' },
                { number: 4, isActive: false, gender: 'boş' },
                { number: 5, isActive: false, gender: 'boş' },
                { number: 6, isActive: false, gender: 'boş' },
                { number: 7, isActive: false, gender: 'boş' },
                { number: 8, isActive: false, gender: 'boş' },
                { number: 9, isActive: false, gender: 'boş' },
                { number: 10, isActive: false, gender: 'boş' },
        
                { number: 11, isActive: false, gender: 'boş' },
                { number: 12, isActive: false, gender: 'boş' },
                { number: 13, isActive: false, gender: 'boş' },
                { number: 14, isActive: false, gender: 'boş' },
                { number: 15, isActive: false, gender: 'boş' },
                { number: 16, isActive: false, gender: 'boş' },
                { number: 17, isActive: false, gender: 'boş' },
                { number: 18, isActive: false, gender: 'boş' },
                { number: 19, isActive: false, gender: 'boş' },
                { number: 20, isActive: false, gender: 'boş' },
        
                { number: 21, isActive: false, gender: 'boş' },
                { number: 22, isActive: false, gender: 'boş' },
                { number: 23, isActive: false, gender: 'boş' },
                { number: 24, isActive: false, gender: 'boş' },
                { number: 25, isActive: false, gender: 'boş' },
                { number: 26, isActive: false, gender: 'boş' },
                { number: 27, isActive: false, gender: 'boş' },
                { number: 28, isActive: false, gender: 'boş' },
                { number: 29, isActive: false, gender: 'boş' },
                { number: 30, isActive: false, gender: 'boş' },
        
                { number: 31, isActive: false, gender: 'boş' },
                { number: 32, isActive: false, gender: 'boş' },
                { number: 33, isActive: false, gender: 'boş' },
                { number: 34, isActive: false, gender: 'boş' },
                { number: 35, isActive: false, gender: 'boş' },
                { number: 36, isActive: false, gender: 'boş' },
                { number: 37, isActive: false, gender: 'boş' },
                { number: 38, isActive: false, gender: 'boş' },
                { number: 39, isActive: false, gender: 'boş' },
                { number: 40, isActive: false, gender: 'boş' }
              ],
        };
    },
    mutations,
    actions,
    getters,
};