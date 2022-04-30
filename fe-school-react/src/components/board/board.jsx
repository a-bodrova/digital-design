import "./board.css";
import React from "react";
import Sorting from "../sorting/sorting";
import Card from "../card/card";
import LoadMore from "../load-more/load-more";
import ShowAll from "../showAll/showAll";
import { AppRoute } from "../../const";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Board = ({events}) => {

  const { pathname } = useLocation();

  const [step, setStep] = useState(5);

  const handleLoadMore = () => {
    events.length >= step ? setStep(step + 5) : setStep(events.length);
  }

  const handleShowAll = () => {
    setStep(events.length);
  }

  return (
    <section className="board">
      {pathname === AppRoute.MAIN && <Sorting />}
      <div className="board__events">
        {events.slice(0, step).map(item => <Card {...item} key={item._id} />)}
      </div>
      <div className="buttons-wrapper">
        <LoadMore handler={handleLoadMore} />
        <ShowAll handler={handleShowAll} />
      </div>
    </section>
  );
};

export default Board;
