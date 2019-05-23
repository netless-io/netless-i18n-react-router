import * as React from "react";
import * as ReactRouterDom from "react-router-dom";

import {LocationDescriptor} from "history";
import {LanguageState} from "./LanguageState";

export const Link: React.StatelessComponent<ReactRouterDom.LinkProps> = props => {
    return <ReactRouterDom.Link {...props} to={replaceLinkTo(props.to)}/>;
};

export const Redirect: React.StatelessComponent<ReactRouterDom.RedirectProps> = props => {
    return <ReactRouterDom.Redirect {...props} to={replaceLinkTo(props.to)}/>;
};

function replaceLinkTo(to: LocationDescriptor): LocationDescriptor {
    if (typeof to === "string") {
        return LanguageState.instance.pathWithLan(to);

    } else if (typeof to === "object" && to !== null && to.pathname) {
        return {...to, pathname: LanguageState.instance.pathWithLan(to.pathname)};

    } else {
        return to;
    }
}
