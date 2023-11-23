import Cookies from "js-cookie";

const API_LIMIT_KEY = "apiCallLimit";
const LAST_RESET_KEY = "apiLastReset";

export const getApiCallLimit = () => {
  const storedLimit = Cookies.get(API_LIMIT_KEY);
  const lastReset = Cookies.get(LAST_RESET_KEY);

  // Reset the limit if it's been more than 24 hours since the last reset
  if (lastReset && Date.now() - parseInt(lastReset, 10) > 24 * 60 * 60 * 1000) {
    Cookies.set(API_LIMIT_KEY, "0");
    Cookies.set(LAST_RESET_KEY, Date.now().toString());
    return 0;
  }

  return storedLimit ? parseInt(storedLimit, 10) : 0;
};

export const incrementApiCallLimit = () => {
  const currentLimit = getApiCallLimit();
  const newLimit = currentLimit + 1;

  // Set the last reset timestamp if it's not set
  if (!Cookies.get(LAST_RESET_KEY)) {
    Cookies.set(LAST_RESET_KEY, Date.now().toString());
  }

  Cookies.set(API_LIMIT_KEY, newLimit.toString());
  return newLimit;
};
