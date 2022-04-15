import React from "react";
import Sorting from "../sorting/sorting";
import Card from "../card/card";
import Event from "../event/event";
import LoadMore from "../load-more/load-more";
import { AppRoute } from "../../const";

const Board = ({mode}) => {
  return (
    <section className="board">
      {mode === AppRoute.MAIN &&
        <Sorting />
      }
      {mode !== AppRoute.FORM && (
        <div className="board__events">
          <Card />
        </div>
      )}
      {mode === AppRoute.FORM &&
        <Event />
      }
      {mode !== AppRoute.FORM &&
        <LoadMore />
      }
    </section>
  );
}

export default Board;
