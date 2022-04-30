import HomeLayout from "../../components/Layout/HomeLayout";
import Login from "../../components/AuthComponents/Login";

import styles from "./Login.module.scss";

const index = () => {
  return (
    <div className={`${styles.container}`}>
      <HomeLayout>
        <Login />
      </HomeLayout>
    </div>
  );
};

export default index;
