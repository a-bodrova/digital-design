import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "../error/Error";
import Tasks from "../../pages/tasks/tasks";
import Users from "../../pages/users/users";
import { AppRoute } from "../../constants";
import { observer } from "mobx-react-lite";
import Start from "../../pages/start/Start";
import Layout from "../layout/layout";
import RequireAuth from "../requireAuth/requireAuth";
import MyProfile from "../myProfile/myProfile";

const App = observer(() => {

  return (
    <Router>
      <Routes>
        <Route path={ AppRoute.START } element={ <Layout /> }>
          <Route index element={ <Start /> }>

          </Route>
          <Route element={<RequireAuth />}>
            <Route path={ AppRoute.TASKLIST } element={<Tasks /> }>
            </Route>
            <Route path={ AppRoute.USERLIST } element={<Users /> }>
            </Route>
            <Route path={ AppRoute.PROFILE } element={<MyProfile />}></Route>
          </Route>
        </Route>
          <Route path="*" element={ <Error /> }></Route>
      </Routes>
    </Router>
  )
});

export default App;