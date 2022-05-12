import React from "react";
import { userStore } from "../../stores/usersStore/usersStore";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AppRoute } from "../../constants";
import { observer } from "mobx-react-lite";

const RequireAuth = observer(() => {

  const { user } = userStore;

  const location = useLocation();

  return (
    user.id
    ?  <Outlet />
    :  <Navigate to={ AppRoute.START } state={{ from: location }} replace />
  )
});

export default RequireAuth;