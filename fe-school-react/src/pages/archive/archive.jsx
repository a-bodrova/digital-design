import { observer } from "mobx-react-lite";
import React from "react";
import { useLocation } from "react-router-dom";
import Board from "../../components/board/board";
import Header from "../../components/header/header";
import { events } from "../../store";

const Archive = observer(() => {

  const { pathname } = useLocation();

  const { archiveData } = events;

  return (
    <>
    <Header mode={pathname} />
    <section className="main__wrapper">
      <Board events={archiveData} />
    </section>
    </>
  )
});

export default Archive;
