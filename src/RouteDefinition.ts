import {ComponentType, ReactElement} from "react";
import {RouteComponentProps} from "react-router";
import {Language} from "./Language";

export type RouteComponentType = ComponentType<RouteComponentProps<any>> | ComponentType<any>;
export type RouteInterceptor = (props: RouteComponentProps<any>, componentType: RouteComponentType) => ReactElement<any> | null;

export enum HistoryType {
    HashRouter,
    BrowserRouter,
}
export type RouteDefinition<L extends string> = {
    readonly language: Language<L>;
    readonly routes: ReadonlyArray<RoutePage>;
    readonly historyType?: HistoryType;
    readonly noFoundRoute?: RouteComponentType;
};

export type RoutePage = {
    readonly path: string;
    readonly component: RouteComponentType;
    readonly interceptor?: RouteInterceptor;
    readonly exact?: boolean;
};

