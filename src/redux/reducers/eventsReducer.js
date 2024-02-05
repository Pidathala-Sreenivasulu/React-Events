import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title: 'Events List',
    events: [],
    cities: [],
    selectedCities: {},
    allCitiesLabel: 'All Cities'
}

const eventsReducer = createSlice(({
    name: 'eventsReducer',
    initialState,
    reducers: {
        getEvents: (state, action) => {
            state.events = action.payload; // Collect events from API
            // Prepare cities for events dropdown
            const cities = [{ id: 0, label: state.allCitiesLabel, value: { payload: { items: [{}] } } }];
            state.events.forEach((ele) => {
                cities.push({ id: ele.id, label: ele?.city.charAt(0).toUpperCase() + ele?.city.slice(1), value: ele })
            })
            state.cities = cities;
        },
        setCities: (state, action) => {
            const findItemIndex = action.payload.findIndex((ele) => ele.label === state.allCitiesLabel)
            if (findItemIndex > -1) {
                if (findItemIndex === 0 && action.payload?.length > 1) {
                    action.payload?.splice(findItemIndex, 1)
                } else {
                    state.selectedCities = { ...action?.payload[findItemIndex], uuid: crypto.randomUUID() }
                    state.cities[0] = state.selectedCities;
                }
            }
        }
    }
}))

export const { getEvents, setCities } = eventsReducer.actions;

export default eventsReducer.reducer;