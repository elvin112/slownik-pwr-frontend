import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { authActions } from "../../../store/authSlice";
import styles from "./Header.module.scss";
import SearchIcon from "./SearchIcon";

const Header = ({
  hideSearchResultWindow,
  onBringSearchResult,
  onCloseSearchResult,
}) => {
  const [searchItems, setSearchItems] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState("");
  const [searchFilter, setSearchFilter] = useState("title-text-search");

  const [dynamicMenuItems, setDynamicMenuItems] = useState();

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchSearchResultHandler = useCallback(async (searched, filter) => {
    const response = await fetch("http://localhost:8080/posts/" + filter, {
      method: "POST",
      body: JSON.stringify(searched),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setSearchItems(data.result);
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      let data = {};

      if (searchFilter === "title-text-search") {
        data = {
          title: searchInputVal,
        };
      } else if (searchFilter === "post-text-search") {
        data = {
          post: searchInputVal,
        };
      } else {
        data = {
          user: searchInputVal,
        };
      }
      fetchSearchResultHandler(data, searchFilter);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchInputVal, searchFilter, fetchSearchResultHandler]);

  function searchInputChangeHandler(event) {
    onBringSearchResult();
    setSearchInputVal(event.target.value);
  }

  let searchResultContent = <></>;

  if (searchFilter === "title-text-search") {
    searchResultContent = (
      <>
        {searchItems.map((elem) => (
          <li
            key={elem._id}
            onClick={() => {
              onCloseSearchResult();
            }}
          >
            <Link href={`/${elem._id}/1`}>
              <p className={styles.seachLink}>{elem.name}</p>
            </Link>
          </li>
        ))}
      </>
    );
  } else if (searchFilter === "post-text-search") {
    searchResultContent = (
      <>
        {searchItems.map((elem) => (
          <li
            key={elem._id}
            onClick={() => {
              onCloseSearchResult();
            }}
          >
            <Link href={`/${elem.titleId}/1`}>
              <p className={styles.seachLink}>{elem.content}</p>
            </Link>
          </li>
        ))}
      </>
    );
  } else if (searchFilter === "user-text-search") {
    searchResultContent = (
      <>
        {searchItems.map((elem) => (
          <li
            key={elem._id}
            onClick={() => {
              onCloseSearchResult();
            }}
          >
            <p className={styles.seachLink}>{elem.username}</p>
          </li>
        ))}
      </>
    );
  }

  const logoutHandler = () => {
    dispatch(authActions.logout());
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
    <>
      <div
        className={styles.searchButtonResultContainer}
        hidden={hideSearchResultWindow}
      >
        <div className={styles.searchWindowHeader}>
          <button onClick={() => setSearchFilter("title-text-search")}>
            titles
          </button>
          <button onClick={() => setSearchFilter("post-text-search")}>
            posts
          </button>
          <button onClick={() => setSearchFilter("user-text-search")}>
            users
          </button>
        </div>
        <div className={styles.searchWindowContent}>
          <ul>{searchResultContent}</ul>
        </div>
      </div>
      <div className={`${styles.container}`}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <a className={`${styles.a}`}>
              Słownik<span>PWR</span>
            </a>
          </Link>
        </div>

        <div className={styles.searchbarContainer}>
          <input
            onFocus={() => {
              onBringSearchResult();
            }}
            className={styles.searchInput}
            type="search"
            placeholder="title"
            onChange={searchInputChangeHandler}
          />
          <button
            onClick={() => {
              if (hideSearchResultWindow) {
                onBringSearchResult();
              } else {
                onCloseSearchResult();
              }
            }}
            className={styles.searchButton}
          >
            <SearchIcon />
          </button>
        </div>
        {dynamicMenuItems}
      </div>
    </>
  );
};

export default Header;
