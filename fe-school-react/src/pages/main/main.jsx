import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/header";
import Filter from "../../components/filter/filter";
import Board from "../../components/board/board";

const Main = ({events}) => {

  const { pathname } = useLocation();

  return (
    <>
      <Header mode={pathname} />
      <section className="main__wrapper">
        <Filter />
        <Board events={events} />
      </section>
    </>
  );
}

export default Main;
