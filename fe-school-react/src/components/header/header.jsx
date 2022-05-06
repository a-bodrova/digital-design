
import React from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import DeleteAllArchive from "../deleteAllArchive/deleteAllArchive";

const Header = ({mode}) => {
  return (
    <section className="main__header">
      <section className="main__header-wrap">
        <span className="main__header-logo">SomeList</span>
        <div className="main__header-group-lnk">
          <Link to={AppRoute.MAIN} className={`main__header-lnk ${(mode === AppRoute.MAIN || mode === AppRoute.FORM || mode === AppRoute.ADD) && 'lnk-active'}`}>
            События
          </Link>
          <Link to={AppRoute.ARCHIVE} className={`main__header-lnk ${mode === AppRoute.ARCHIVE && 'lnk-active'}`}>
            Архив
          </Link>
        </div>
        {mode === AppRoute.ARCHIVE && <DeleteAllArchive />}
      </section>
    </section>
  );
}

export default Header;
