import { create } from 'zustand';

const locationState = create((set) => ({
  location: [],
  locationIndex: 0,

  setLocation: (location) => set({ location }),
  setLocationIndex: (index) => set({ locationIndex: index }),
  removeLocation: (locationToRemove) => set((state) => ({
    location: state.location.filter(loc => loc !== locationToRemove)
  })),
}));

export default locationState;