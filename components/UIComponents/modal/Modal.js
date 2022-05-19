import styles from "./Modal.module.scss";

const Modal = ({
  setState,
  setCloseModel,
  title,
  text,
  cancelButtonText,
  confirmButtonText,
  areButtonsOpposite,
}) => {
  const cancelHandler = () => {
    setCloseModel((state) => !state);
  };

  const confirmHandler = () => {
    setState((state) => !state);
    setCloseModel((state) => !state);
  };

  return (
    <div className={`${styles.overlay}`}>
      <div className={`${styles.modal}`}>
        <div className={`${styles.upperContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <p>{title}</p>
          </div>
          <div className={`${styles.textContainer}`}>
            <p>{text}</p>
          </div>
        </div>
        <div className={`${styles.lowerContainer}`}>
          <button
            onClick={cancelHandler}
            className={`${
              !areButtonsOpposite ? styles.cancel : styles.confirm
            }`}
          >
            {cancelButtonText}
          </button>
          <button
            onClick={confirmHandler}
            className={`${
              !areButtonsOpposite ? styles.confirm : styles.cancel
            }`}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
