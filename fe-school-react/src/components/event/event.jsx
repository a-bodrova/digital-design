import React from "react";
import { useState } from "react";
import moment from "moment";
import { observer } from "mobx-react-lite";
import { addEvent } from "../../api";
import { events } from "../../store";
import { action } from "mobx";

const Event = observer(({id}) => {

  const buttonText = id ? 'Сохранить' : 'Добавить';
  const title = id ? 'Редактирование события' : 'Добавление события';

  let event = {...events.card};

  if (!id) {
    event = {
      theme: '',
      comment: '',
      date: new Date(),
    }
  }

  const [ form, setForm ] = useState({
    theme: event.theme,
    comment: event.comment,
    date: event.date,
  });

  const handleFieldChange = (evt) => {
    const { name, value } = evt.target;
    setForm({...form, [ name ]: value});
  };

  const handleSubmit = action((evt) => {
    evt.preventDefault();

    id ? events.editEvent({...form, id: event._id, archive: event.archive, favorite: event.favorite}) : addEvent(form);

    events.card = {};
    events.fetch();
    window.history.back();
  });

  const handleClean = () => {
    setForm({
      theme: '',
      comment: '',
      date: '',
    })
  }

  return (
    <form className="board__form" onSubmit={handleSubmit}>
      <h2 className="board__title">{title}</h2>
      <fieldset className="board__field board__field--theme">
        <label htmlFor="theme" className="board__label board__label--theme">
          Тема:
        </label>
        <textarea
          type="text"
          onChange={handleFieldChange}
          className="board__input board__input--theme"
          name="theme"
          required
          defaultValue={form.theme}
        ></textarea>
      </fieldset>
      <fieldset className="board__field board__field--comment">
        <label htmlFor="comment" className="board__label board__label--comment">
          Комментарий:
        </label>
        <textarea
          type="text"
          onChange={handleFieldChange}
          className="board__input board__input--comment"
          name="comment"
          defaultValue={form.comment}
          required
        ></textarea>
      </fieldset>
      <fieldset className="board__field board__field--date">
        <label htmlFor="date" className="board__label board__label--date">
          Дата:
        </label>
        <input
          type="datetime-local"
          onChange={handleFieldChange}
          className="board__input board__input--date"
          name="date"
          defaultValue={moment(form.date).format('YYYY-MM-DDThh:mm')}
        />
      </fieldset>
      <div className="btns">
        <button
          type="submit"
          className="btn-submit">
          {buttonText}
        </button>
        <button
          type="reset"
          className="btn-reset"
          onClick={handleClean}>
          Очистить
        </button>
      </div>
    </form>
  );
})

export default Event;
