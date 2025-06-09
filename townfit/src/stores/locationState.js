import { create } from 'zustand';

const locationState = create((set) => ({
  location: [
    { name: "원천동", lat: 37.2720187, lng: 127.0362309 },
  ],

  setLocation: (location) => set({ location }),
  addLocation: (newLocation) => set((state) => ({
    location: [...state.location, newLocation]
  })),
  removeLocation: (locationToRemove) => set((state) => ({
    location: state.location.filter(loc => loc !== locationToRemove)
  })),
}));

export default locationState;