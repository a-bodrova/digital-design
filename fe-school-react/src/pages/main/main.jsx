import React from "react";
import Header from "../../components/header/header";
import Filter from "../../components/filter/filter";
import Board from "../../components/board/board";

const Main = (props) => {
  return (
    <>
      <Header mode={props.match.path}/>
      <section className="main__wrapper">
        <Filter mode={props.match.path}/>
        <Board mode={props.match.path}/>
      </section>
    </>
  );
}

export default Main;
