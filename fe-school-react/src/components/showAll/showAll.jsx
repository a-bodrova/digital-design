import React from "react";

const ShowAll = ({handler}) => {
  return (
    <button
      className="show-all"
      type="button"
      onClick={handler}>
        Показать все
    </button>
  )
}

export default ShowAll;
