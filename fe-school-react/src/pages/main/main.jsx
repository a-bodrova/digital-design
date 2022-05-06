import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/header";
import Filter from "../../components/filter/filter";
import Board from "../../components/board/board";
import { events } from "../../store";
import { observer } from "mobx-react-lite";

const Main = observer(() => {

  const { notArchiveData } = events;

  const { pathname } = useLocation();

  return (
    <>
      <Header mode={pathname} />
      <section className="main__wrapper">
        <Filter />
        <Board events={notArchiveData} />
      </section>
    </>
  );
});

export default Main;
