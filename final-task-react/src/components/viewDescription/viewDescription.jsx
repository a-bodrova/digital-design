import styles from './viewDescription.module.scss';

const ViewDescription = ({ info }) => {
  return (
    <div className={styles.block}>
        <p className={styles.label}>Название</p>
        <p className={styles.description}>
          {info.description}
        </p>
    </div>
  )
}

export default ViewDescription;