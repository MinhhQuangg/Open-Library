import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LOGIN_EN from "../locales/en/login.json";
import LOGIN_VI from "../locales/vi/login.json";
import REGISTER_EN from "../locales/en/register.json";
import REGISTER_VI from "../locales/vi/register.json";

const resources = {
  en: {
    // gọi là namespace
    login: LOGIN_EN,
    register: REGISTER_EN,
  },
  vi: {
    login: LOGIN_VI,
    register: REGISTER_VI,
  },
};

export const defaultNS = "login";

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default
  ns: ["login", "register"],
  defaultNS, // trong trường hợp kh chuyền namespace vào
  fallbackLng: "vi", //trường hợp kh dịch được ngôn ngữ
  interpolation: {
    escapeValue: false, // react already safe from xss
  },
});
