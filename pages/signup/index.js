import HomeLayout from "../../components/Layout/HomeLayout";
import Signup from "../../components/AuthComponents/Signup";

import styles from "./Signup.module.scss";

const index = () => {
  return (
    <div className={`${styles.container}`}>
      <HomeLayout>
        <Signup />
      </HomeLayout>
    </div>
  );
};

export default index;
