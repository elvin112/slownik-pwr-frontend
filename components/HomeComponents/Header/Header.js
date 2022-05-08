import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { authActions } from "../../../store/authSlice";
import styles from "./Header.module.scss";

const Header = () => {
  const [dynamicMenuItems, setDynamicMenuItems] = useState();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const loginMenuItemsJsx = (
    <>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
    </>
  );

  const logoutMenuItemsJsx = (
    <>
      <Link href="/">
        <a onClick={logoutHandler}>Logout</a>
      </Link>
    </>
  );

  useEffect(() => {
    if (authState.isLoggedIn) {
      setDynamicMenuItems(logoutMenuItemsJsx);
    } else {
      setDynamicMenuItems(loginMenuItemsJsx);
    }
  }, [authState.isLoggedIn]);

  return (
    <div className={`${styles.container}`}>
      <p>Slownik PWR</p>
      <div>Searchbar</div>
      {dynamicMenuItems}
    </div>
  );
};

export default Header;
