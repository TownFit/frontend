import { create } from 'zustand';

const locationState = create((set) => ({
  location: [],

  setLocation : (location) => set({ location }),
  addLocation: (newLocation) => set((state) => ({
    location: [...state.location, newLocation]
  })),
  removeLocation: (locationToRemove) => set((state) => ({
    location: state.location.filter(loc => loc !== locationToRemove)
  })),
}));

export default locationState;