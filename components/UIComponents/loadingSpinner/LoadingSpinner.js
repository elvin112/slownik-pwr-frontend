import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={`${styles["spinner-container"]}`}>
      <div className={`${styles["loading-spinner"]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
