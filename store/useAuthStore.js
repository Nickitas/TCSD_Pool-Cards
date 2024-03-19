import { create } from "zustand";

const loadAuthFromLocalStorage = () => {
  const storedAuth = localStorage.getItem('hash');
  const storedAuthExpiration = localStorage.getItem("authExpiration");

  if (storedAuth && storedAuthExpiration) {
    const currentTime = Date.now();
    if (currentTime < parseInt(storedAuthExpiration)) {
      return JSON.parse(storedAuth);
    }

    localStorage.removeItem('hash');
    localStorage.removeItem("authExpiration");
  }

  return false;
};

const setAuthWithExpiration = (set, isAuth, expirationTime) => {
  set({ isAuth });
  localStorage.setItem('hash', JSON.stringify(isAuth));
  localStorage.setItem("authExpiration", expirationTime.toString());
};

export const useAuthStore = create((set) => ({
  isAuth: loadAuthFromLocalStorage(),
  setAuth: (isAuth) => {
    const currentTime = Date.now();
    const expirationTime = currentTime + 24 * 60 * 60 * 1000; // Срок действия 24 часа
    setAuthWithExpiration(set, isAuth, expirationTime);
  },
  loadAuth: true,
  setLoad: (loadAuth) => set({ loadAuth }),
}));