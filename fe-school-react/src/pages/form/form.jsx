import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/header";
import Filter from "../../components/filter/filter";
import Event from "../../components/event/event";
import { observer } from "mobx-react-lite";

const Form = observer(() => {

  const { pathname } = useLocation();
  const path = `/${pathname.split('/')[1]}`;
  const id = pathname.split('/')[2];

  return (
    <>
    <Header mode={path} />
    <section className="main__wrapper">
      <Filter />
      <section className="board">
        <Event id={id} />
      </section>
    </section>
    </>
  )
})

export default Form;
