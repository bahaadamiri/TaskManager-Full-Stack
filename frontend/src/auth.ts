export const auth = {
  get token() {
    return localStorage.getItem("token");
  },
  set token(val: string | null) {
    if (val) localStorage.setItem("token", val);
    else localStorage.removeItem("token");
  },
  isLoggedIn() {
    return !!localStorage.getItem("token");
  },
  logout() {
    localStorage.removeItem("token");
  },
};
