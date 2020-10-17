import React from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import Landing from "./pages/Landing";
import MapLocalization from "./pages/MapLocalization";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={MapLocalization}/>
                <Route path="/orphanage" component={Orphanage}/>
                <Route path="/orphanage/create" component={CreateOrphanage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;