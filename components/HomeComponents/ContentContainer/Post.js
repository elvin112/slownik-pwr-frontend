import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faFlag,
  faMarker,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Post.module.scss";

const dateConverter = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${dt}.${month}.${year} ${hours}:${minutes}`;
};

const Post = ({ date, postContent, username }) => {
  const authState = useSelector((state) => state.auth);
  const [optionsState, setOptionsState] = useState();
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);

  // Check the state of authentication and render correct options list by that
  useEffect(() => {
    if (authState.isLoggedIn && authState.username === username) {
      setOptionsState(selfPostDetailsOptions);
      return;
    }

    setOptionsState(notAuthenticatedDetailsOptions);
  }, [authState, isOptionsExpanded]);

  // Add body event listener to recollapse when the body is clicked
  // useEffect(() => {
  //   const bodyClickedEventListener = () => {
  //     if (isOptionsExpanded) {
  //       setIsOptionsExpanded(false);
  //     }
  //   };

  //   document.body.addEventListener("click", bodyClickedEventListener);

  //   return function cleanup() {
  //     window.removeEventListener("click", bodyClickedEventListener);
  //   };
  // }, [isOptionsExpanded]);

  const optionsToggleHandler = () => {
    setIsOptionsExpanded((state) => !state);
  };

  const notAuthenticatedDetailsOptions = (
    <div
      className={`${styles.optionsContainer} ${
        !isOptionsExpanded ? styles.hidden : null
      }`}
    >
      <ul>
        <li>
          <button>
            <p>Report</p>
            <FontAwesomeIcon icon={faFlag} className={`${styles.optionIcon}`} />
          </button>
        </li>
      </ul>
    </div>
  );

  const selfPostDetailsOptions = (
    <div
      className={`${styles.optionsContainer} ${
        !isOptionsExpanded ? styles.hidden : null
      }`}
    >
      <ul>
        <li>
          <button>
            <p>Update</p>
            <FontAwesomeIcon
              icon={faMarker}
              className={`${styles.optionIcon}`}
            />
          </button>
        </li>
        <li>
          <button>
            <p>Delete</p>
            <FontAwesomeIcon
              icon={faTrashCan}
              className={`${styles.optionIcon}`}
            />
          </button>
        </li>
        <li>
          <button>
            <p>Report</p>
            <FontAwesomeIcon icon={faFlag} className={`${styles.optionIcon}`} />
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.upperContainer}`}>
        <p>{postContent}</p>
      </div>
      <div className={`${styles.lowerContainer}`}>
        <div className={`${styles.date}`}>
          <p>{dateConverter(date)}</p>
        </div>
        <div className={`${styles.username}`}>
          <p>{username}</p>
        </div>
        <div className={`${styles.iconContainer}`}>
          <button
            className={`${styles.iconButton}`}
            onClick={optionsToggleHandler}
          >
            <FontAwesomeIcon icon={faEllipsis} className={`${styles.icon}`} />
          </button>
          {optionsState}
        </div>
      </div>
    </div>
  );
};

export default Post;
