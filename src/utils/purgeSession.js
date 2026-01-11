export const purgeSession = () => {
  const keys = [
    "isAuthenticated",
    "token",
    "refreshToken",
    "tokenExpiry",
    "userEmail",
    "userName",
    "cart",
    "userProfile",
    "userProfileTimestamp",
  ];

  keys.forEach(k => localStorage.removeItem(k));
};
