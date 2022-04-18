import React from "react";
import Sorting from "../sorting/sorting";
import Card from "../card/card";
import Event from "../event/event";
import LoadMore from "../load-more/load-more";
import { AppRoute } from "../../const";

const Board = (props) => {
  const render = () => {
    return props.mode === AppRoute.FORM ? <Event /> : <LoadMore />;
  };
  
  return (
    <section className="board">
      {props.mode === AppRoute.MAIN &&
        <Sorting />
      }
      {props.mode !== AppRoute.FORM && (
        <div className="board__events">
          <Card />
        </div>
      )}
      {render()}
    </section>
  );
}

export default Board;
