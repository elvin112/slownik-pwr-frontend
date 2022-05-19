import styles from "./CreateTitle.module.scss";

const CreateTitle = () => {
  return (
    <form className={`${styles.form}`}>
      <input type="text" placeholder="Enter Title Name:" />
      <textarea placeholder="Enter First Post" />
      <input type="submit" onClick={formSubmitHandler} />
    </form>
  );
};

export default CreateTitle;
