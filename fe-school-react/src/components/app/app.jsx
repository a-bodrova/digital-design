import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Archive from "../../pages/archive/archive";
import Main from "../../pages/main/main";
import { AppRoute } from "../../const";
import Form from "../../pages/form/form";
import Error from "../error/error";


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.MAIN} exact component={Main}>
        </Route>
        <Route path={AppRoute.ARCHIVE} exact component={Archive}>
        </Route>
        <Route path={AppRoute.FORM} exact component={Form}>
        </Route>
        <Route component={Error}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
