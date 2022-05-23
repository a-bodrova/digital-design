import styles from "./editDescription.module.scss";

const EditDescription = ({ setter, editedTask }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setter(name, value);
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.block}>
        <label htmlFor="title" className={styles.label}>Название</label>
          <input
            type="text"
            id="title"
            name="title"
            className={styles.select}
            defaultValue={editedTask.title}
            onChange={handleChange}
            required
          />
      </div>
      <div className={styles.block}>
        <label htmlFor="description" className={styles.label}>Описание</label>
          <textarea
            id="description"
            name="description"
            className={styles.textarea}
            defaultValue={editedTask.description}
            onChange={handleChange}
            required
          ></textarea>
      </div>
    </section>
  );
};

export default EditDescription;
