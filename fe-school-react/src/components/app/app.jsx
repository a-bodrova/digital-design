import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Archive from "../../pages/archive/archive";
import Main from "../../pages/main/main";
import { AppRoute } from "../../const";
import Form from "../../pages/form/form";
import Error from "../error/error";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.MAIN} exact>
          <Main />
        </Route>
        <Route path={AppRoute.ARCHIVE} exact>
          <Archive />
        </Route>
        <Route path={AppRoute.FORM} exact>
          <Form />
        </Route>
        <Route component={Error}></Route>
      </Switch>
    </BrowserRouter>
  )
})

export default App;
