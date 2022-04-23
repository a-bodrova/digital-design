import React from "react";
import Sorting from "../sorting/sorting";
import Card from "../card/card";
import LoadMore from "../load-more/load-more";
import { AppRoute } from "../../const";
import { useLocation } from "react-router-dom";

const Board = ({events}) => {

  const { pathname } = useLocation();

  return (
    <section className="board">
      {pathname === AppRoute.MAIN && <Sorting />}
      <div className="board__events">
        {events.map(item => <Card {...item} key={item._id} />)}
      </div>
      <LoadMore />
    </section>
  );
}

export default Board;
