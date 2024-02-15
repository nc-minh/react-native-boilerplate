import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import * as en from "./en";
import * as vi from "./vi";

type TupleUnion<U extends string, R extends unknown[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];

const ns = Object.keys(vi) as TupleUnion<keyof typeof vi>;

export const defaultNS = "common";

export const i18n = i18next.use(initReactI18next).init({
  ns,
  defaultNS,
  resources: {
    en,
    vi,
  },
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: "v3",
});
