import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Error from "../error/Error";
import TaskList from "../../pages/Tasklist/Tasklist";
import UserList from "../../pages/userList/userList";
import UserOverview from "../userOverview/UserOverview";
import { AppRoute } from "../../constants";
import Start from "../../pages/start/Start";
import Layout from "../layout/layout";
import RequireAuth from "../requireAuth/requireAuth";
import Task from '../../pages/task/task';
import EditTask from '../../pages/editTask/editTask';

const App = observer(() => {

  return (
    <Router>
      <Routes>
        <Route path={ AppRoute.START } element={ <Layout /> }>
          <Route index element={ <Start /> }></Route>
          <Route element={ <RequireAuth /> }>
            <Route path={ AppRoute.TASKLIST } element={ <TaskList /> }></Route>
            <Route path={ AppRoute.NEW_TASK } element={ <EditTask /> }></Route>
            <Route path={ AppRoute.TASK_ID } element={ <Task /> }></Route>
            <Route path={ AppRoute.EDIT_TASK } element={ <EditTask /> }></Route>
            <Route path={ AppRoute.USERLIST } element={ <UserList /> }></Route>
            <Route path={ AppRoute.USER_ID } element={ <UserOverview /> }></Route>
          </Route>
        </Route>
          <Route path="*" element={ <Error /> }></Route>
      </Routes>
    </Router>
  )
});

export default App;