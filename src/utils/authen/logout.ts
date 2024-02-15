import {localStorageKey} from "@/constants/localStorage";
import {removeLocalStorageByKey} from "@/localStorage";

const logout = () => {
  removeLocalStorageByKey(localStorageKey.ACCESS_TOKEN);
  removeLocalStorageByKey(localStorageKey.USER);
};

export default logout;
