import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/header";
import Filter from "../../components/filter/filter";
import Event from "../../components/event/event";

const Form = ({events}) => {

  const { pathname } = useLocation();
  const path = `/${pathname.split('/')[1]}`;
  const id = pathname.split('/')[2];
  const  event = events.filter(item => item._id === id).pop();

  return (
    <>
    <Header mode={path} />
    <section className="main__wrapper">
      <Filter />
      <section className="board">
        <Event event={event}/>
      </section>
    </section>
    </>
  )
}

export default Form;
