import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Archive from "../../pages/archive/archive";
import Main from "../../pages/main/main";
import { AppRoute } from "../../const";
import Form from "../../pages/form/form";
import Error from "../error/error";


const App = ({events}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.MAIN} exact>
          <Main events={events} />
        </Route>
        <Route path={AppRoute.ARCHIVE} exact>
          <Archive events={events} />
        </Route>
        <Route path={AppRoute.FORM} exact>
          <Form events={events} />
        </Route>
        <Route path={AppRoute.ADD} exact>
          <Form events={events} />
        </Route>
        <Route component={Error}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
