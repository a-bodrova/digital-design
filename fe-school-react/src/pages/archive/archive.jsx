import React from "react";
import Board from "../../components/board/board";
import Header from "../../components/header/header";

const Archive = (props) => {
  return (
    <>
    <Header mode={props.match.path} />
    <section className="main__wrapper">
      <Board mode={props.match.path} />
    </section>
    </>

  )
}

export default Archive;
