import create from 'zustand';

const useUserStore = create((set) => ({
  loginUser: null,
  setLoginUser: (user) => set({ loginUser: user }),
}));

export default useUserStore;