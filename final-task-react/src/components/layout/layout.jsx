import React from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../header/header";

const Layout = () => {

  const { pathname } = useLocation();

  return (
    <>
    <Header path={ pathname } />
    <Outlet />
    </>
  )
};

export default Layout;