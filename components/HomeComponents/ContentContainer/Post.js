import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faFlag,
  faMarker,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Post.module.scss";
import { feedbackActions } from "../../../store/feedbackSlice";

const dateConverter = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${dt}.${month}.${year} ${hours}:${minutes}`;
};

const Post = ({ date, postContent, username, postId }) => {
  const authState = useSelector((state) => state.auth);
  const [optionsState, setOptionsState] = useState();
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatePost, setUpdatePost] = useState(postContent);

  const dispatch = useDispatch();

  // Check the state of authentication and render correct options list by that
  useEffect(() => {
    if (authState.isLoggedIn && authState.username === username) {
      setOptionsState(selfPostDetailsOptions);
      return;
    }

    setOptionsState(notAuthenticatedDetailsOptions);
  }, [authState, isOptionsExpanded]);

  const optionsToggleHandler = () => {
    setIsOptionsExpanded((state) => !state);
  };

  const updateHandler = () => {
    setIsUpdate(true);
    setIsOptionsExpanded(false);
  };

  const updateContentHandler = (event) => {
    setUpdatePost(event.target.value);
  };

  const updateCancelButtonHandler = () => {
    setUpdatePost(postContent);
    setIsUpdate(false);
  };

  const updateUpdateButtonHandler = async () => {
    try {
      dispatch(feedbackActions.loading());

      if (updatePost === postContent) {
        throw new Error("Updated post is same as the old one");
      }

      const response = await axios.put(
        "http://localhost:8080/posts/post",
        {
          postId: postId,
          postContent: updatePost,
        },
        {
          headers: {
            Authorization: "Bearer " + authState.token,
          },
        }
      );

      if (response.status === 201) {
        dispatch(feedbackActions.success("Post content successfully updated!"));
        setIsUpdate(false);

        setTimeout(() => {
          dispatch(feedbackActions.cleanup());
        }, 3000);
      }
    } catch (err) {
      if (err && !err.response) {
        dispatch(feedbackActions.error(err.message));

        setTimeout(() => {
          dispatch(feedbackActions.cleanup());
        }, 5000);
        return;
      }

      if (err.response && err.response.status === 422) {
        const firstError = err.response.data.errors.errors[0].msg;
        dispatch(feedbackActions.error(firstError));

        setTimeout(() => {
          dispatch(feedbackActions.cleanup());
        }, 5000);

        return;
      }

      dispatch(feedbackActions.error("Unexpected Error"));

      setTimeout(() => {
        dispatch(feedbackActions.cleanup());
      }, 5000);
    }
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
        <li className={`${styles.optionLi}`}>
          <button onClick={updateHandler}>
            <p>Update</p>
            <FontAwesomeIcon
              icon={faMarker}
              className={`${styles.optionIcon}`}
            />
          </button>
        </li>
        <li className={`${styles.optionLi}`}>
          <button>
            <p>Delete</p>
            <FontAwesomeIcon
              icon={faTrashCan}
              className={`${styles.optionIcon}`}
            />
          </button>
        </li>
        <li className={`${styles.optionLi}`}>
          <button>
            <p>Report</p>
            <FontAwesomeIcon icon={faFlag} className={`${styles.optionIcon}`} />
          </button>
        </li>
      </ul>
    </div>
  );

  const updateJsx = (
    <>
      <textarea
        className={`${styles.textArea}`}
        value={updatePost}
        onChange={updateContentHandler}
      />
      <div className={`${styles.updateButtonsContainer}`}>
        <button onClick={updateCancelButtonHandler}>cancel</button>
        <button onClick={updateUpdateButtonHandler}>update</button>
      </div>
    </>
  );

  return (
    <div className={`${styles.container}`}>
      <div
        className={`${
          !isUpdate ? styles.upperContainer : styles.updateContainer
        }`}
      >
        {!isUpdate ? <p>{updatePost}</p> : updateJsx}
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
