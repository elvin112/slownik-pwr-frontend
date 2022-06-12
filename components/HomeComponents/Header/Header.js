import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { authActions } from "../../../store/authSlice";
import styles from "./Header.module.scss";
import SearchIcon from "./SearchIcon";

const Header = () => {
  const [searchItems, setSearchItems] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState("");
  const [dynamicMenuItems, setDynamicMenuItems] = useState();
  const [hideSearchResultWindow, setHideSearchResultWindow] = useState(true);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(
    () => {
      const identifier = setTimeout(() => {
        const data = {
          title: searchInputVal,
        };

        fetchSearchResultHandler(data);
      }, 500);

      return () => {
        clearTimeout(identifier);
      };
    },
    [searchInputVal],
    fetchSearchResultHandler
  );

  function searchInputChangeHandler(event) {
    setSearchInputVal(event.target.value);
  }

  async function fetchSearchResultHandler(searched) {
    const response = await fetch(
      "http://localhost:8080/posts/title-text-search",
      {
        method: "POST",
        body: JSON.stringify(searched),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setSearchItems(data.result);
  }

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const bringSearchResultWindowHandler = () => {
    setHideSearchResultWindow(false);
  };

  const closeSearchResultWindowHandler = () => {
    setHideSearchResultWindow(true);
  };

  const loginMenuItemsJsx = (
    <>
      <nav className={styles.headerNav}>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </nav>
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
  }, [authState.isLoggedIn, logoutMenuItemsJsx]);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={`${styles.a}`}>
            Słownik<span>PWR</span>
          </a>
        </Link>
      </div>

      <div
        className={styles.searchbarContainer}
        onFocus={bringSearchResultWindowHandler}
      >
        <input
          className={styles.searchInput}
          type="search"
          placeholder="title"
          onBlur={closeSearchResultWindowHandler}
          onChange={searchInputChangeHandler}
        />
        <button className={styles.searchButton}>
          <SearchIcon />
        </button>
        <div
          className={styles.searchButtonResultContainer}
          hidden={hideSearchResultWindow}
        >
          <div className={styles.searchWindowHeader}>
            <button>titles</button>
            <button>posts</button>
            <button>users</button>
          </div>
          <div className={styles.searchWindowContent}>
            <ul>
              {searchItems.map((elem) => (
                <li key={elem._id}>
                  <a style={{ fontSize: 16 }}>{elem.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {dynamicMenuItems}
    </div>
  );
};

export default Header;
