import React from "react";
import Header from "../../components/header/header";
import Filter from "../../components/filter/filter";
import Event from "../../components/event/event";

const Form = (props) => {
  return (
    <>
    <Header mode={props.match.path} />
    <section className="main__wrapper">
      <Filter mode={props.match.path} />
      <section className="board">
        <Event />
      </section>
    </section>
    </>
  )
}

export default Form;
