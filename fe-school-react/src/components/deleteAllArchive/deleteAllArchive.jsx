import "./deleteAllArchive.css";
import React from "react";
import { events } from "../../store";

const DeleteAllArchive = () => {

  const handleDeleteArchive = (e) => {
    e.preventDefault();
    console.log(events);
    const ids = events.archiveData.map(event => event._id);
    events.deleteAllArchiveEvents(ids);
    events.fetch();
  }

  return (
    <button
      className="btn-delete"
      type="button"
      onClick={handleDeleteArchive}>
        Очистить архив
      </button>
  )
}

export default DeleteAllArchive;
