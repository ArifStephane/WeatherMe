import { createStore } from 'vuex';

export default createStore({
  state: {
    theme: 'light', // Thème par défaut
  },
  mutations: {
    setTheme(state: any, theme: any) {
      state.theme = theme;
    },
  },
});
