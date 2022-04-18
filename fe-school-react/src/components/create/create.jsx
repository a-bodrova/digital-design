import React from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

const Create = () => {
  return (
    <Link to={AppRoute.ADD} name="control" className="btn-add">
      Создать
    </Link>
  );
}

export default Create;
