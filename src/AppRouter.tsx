import * as React from "react";

import {IntlProvider} from "react-intl";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {HistoryType, RouteDefinition, RoutePage} from "./RouteDefinition";
import {LanguageState} from "./LanguageState";

const EmptyRouteComponent: React.ComponentType<RouteComponentProps<any>> = (() => <div>404</div>);

type LanRoutesProps = RouteComponentProps<{
    lan: string;
    message?: string;
}>;

export class AppRouter<L extends string> extends React.Component<RouteDefinition<L>> {
    public constructor(props: RouteDefinition<L>) {
        super(props);
    }

    public render(): React.ReactNode {
        if (this.props.historyType === HistoryType.BrowserRouter) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/:lan/:message?" render={this.renderLanRoutes}/>
                        <Route path="/" render={this.renderPageWithoutLan}/>
                    </Switch>
                </BrowserRouter>
            );
        } else {
            return (
                <HashRouter>
                    <Switch>
                        <Route path="/:lan/:message?" render={this.renderLanRoutes}/>
                        <Route path="/" render={this.renderPageWithoutLan}/>
                    </Switch>
                </HashRouter>
            );
        }
    }

    private renderLanRoutes = (props: LanRoutesProps): React.ReactNode => {
        const {lan, message = "home"} = props.match.params;

        if (lan && this.props.language.isSupportLanguage(lan)) {
            LanguageState.instance.setState(this.props.language, lan);
            return (
                <IntlProvider locale={lan} messages={this.props.language.getMessages(lan, message)}>
                    <Switch>
                        {this.props.routes.map(page => this.renderRouteWith(page))}
                        <Route component={this.props.noFoundRoute || EmptyRouteComponent}/>
                    </Switch>
                </IntlProvider>
            );
        } else {
            return this.renderPageWithoutLan(props);
        }
    }

    private renderPageWithoutLan = (props: RouteComponentProps<{}>): React.ReactNode => {
        const {pathname, search, hash} = props.location;
        const totalPathname = `${pathname || ""}${search || ""}${hash || ""}`;
        const lan = this.props.language.browserLanguage();

        return <Redirect to={`/${lan}${totalPathname}`}/>;
    }

    private renderRouteWith({exact = true, path, component, interceptor}: RoutePage): React.ReactNode {
        let targetComponent: React.ComponentType<RouteComponentProps<any>>;

        if (interceptor) {
            targetComponent = props => interceptor(props, component);
        } else {
            targetComponent = component;
        }
        return (
            <Route exact={exact} key={path} path={`/:lan${path}`}
                   component={targetComponent}/>
        );
    }
}
