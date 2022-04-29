import React from "react";
import { useLocation } from "react-router-dom";
import Board from "../../components/board/board";
import Header from "../../components/header/header";

const Archive = ({events}) => {

  const { pathname } = useLocation();

  const archiveEvents = events.filter(event => event.archive);

  return (
    <>
    <Header mode={pathname} />
    <section className="main__wrapper">
      <Board events={archiveEvents}/>
    </section>
    </>

  )
}

export default Archive;
