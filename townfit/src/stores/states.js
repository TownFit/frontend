import { create } from 'zustand';

// Page State
const pageState = create((set) => ({
  page: 'home',
  goToHome: () => set({ page: 'home' }),
  goToSurvey: () => set({ page: 'survey' }),
  goToSuggestion: () => set({ page: 'suggestion' }),
  
}));

export default pageState;