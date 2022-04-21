import React from "react";
import Sorting from "../sorting/sorting";
import Card from "../card/card";
import LoadMore from "../load-more/load-more";
import { AppRoute } from "../../const";

const Board = (props) => {
  return (
    <section className="board">
      {props.mode === AppRoute.MAIN && <Sorting />}
      <div className="board__events">
        <Card />
      </div>
      <LoadMore />
    </section>
  );
}

export default Board;
