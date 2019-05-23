
export * from "./RouteDefinition";
export * from "./AppRouter";
export * from "./LinkAndRedirect";
export * from "./Language";

export {addLocaleData} from "react-intl";

import {LanguageState} from "./LanguageState";

const state = LanguageState.instance;

export const setPaddingPathname = state.setPaddingPathname.bind(state);
export const didSetPaddingPathname = state.didSetPaddingPathname.bind(state);
export const takePaddingPathname = state.takePaddingPathname.bind(state);
export const getCurrentLan = state.getCurrentLan.bind(state);
export const push = state.push.bind(state);
export const pathWithLan = state.pathWithLan.bind(state);
export const pathReplaceLan = state.pathReplaceLan.bind(state);
