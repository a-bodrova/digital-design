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
import MyProfile from '../../pages/myProfile/myProfile';
import Task from '../../pages/task/task';
import EditTask from '../../pages/editTask/editTask';

const App = observer(() => {

  return (
    <Router>
      <Routes>
        <Route path={ AppRoute.START } element={ <Layout /> }>
          <Route index element={ <Start /> }></Route>
          <Route element={<RequireAuth />}>
            <Route path={ AppRoute.TASKLIST } element={<Tasks /> }></Route>
            <Route path={AppRoute.TASK_ID} element={<Task />}></Route>
            <Route path={AppRoute.EDIT_TASK} element={<EditTask />}></Route>
            <Route path={ AppRoute.USERLIST } element={<Users /> }></Route>
            <Route path={ AppRoute.PROFILE } element={<MyProfile />}></Route>
          </Route>
        </Route>
          <Route path="*" element={ <Error /> }></Route>
      </Routes>
    </Router>
  )
});

export default App;