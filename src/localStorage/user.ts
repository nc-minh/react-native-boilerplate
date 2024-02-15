import {localStorageKey} from "@/constants/localStorage";
import {jsonParse} from "./json";
import {storage} from ".";

export const getUser = () => {
  const userString = storage.getString(localStorageKey.USER) ?? "{}";
  return jsonParse(userString);
};
