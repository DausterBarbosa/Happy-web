import React from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import Landing from "./pages/Landing";
import MapLocalization from "./pages/MapLocalization";

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={MapLocalization}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;