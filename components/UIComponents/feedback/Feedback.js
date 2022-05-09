import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faBomb,
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { feedbackActions } from "../../../store/feedbackSlice";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Feedback.module.scss";

const Feedback = () => {
  const dispatch = useDispatch();
  const feedbackState = useSelector((state) => state.feedback);

  const exitButtonHandler = () => {
    dispatch(feedbackActions.cleanup());
  };

  const loadingFeedback = (
    <div className={`${styles.container}`}>
      <div className={`${styles.loadingContainer}`}>
        <div className={`${styles.innerContainer}`}>
          <div className={`${styles.iconContainer}`}>
            <FontAwesomeIcon
              icon={faWrench}
              className={`${styles.icon} ${styles.rotate}`}
            />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>Loading...</p>
          </div>
          <div className={`${styles.buttonContainer}`}>
            <button className={`${styles.button}`} onClick={exitButtonHandler}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={`${styles.exitIcon}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const errorFeedback = (
    <div className={`${styles.container}`}>
      <div className={`${styles.errorContainer}`}>
        <div className={`${styles.innerContainer}`}>
          <div className={`${styles.iconContainer}`}>
            <FontAwesomeIcon icon={faBomb} className={`${styles.icon}`} />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>Error: {feedbackState.errorText}</p>
          </div>
          <div className={`${styles.buttonContainer}`}>
            <button className={`${styles.button}`} onClick={exitButtonHandler}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={`${styles.exitIcon}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const successFeedback = (
    <div className={`${styles.container}`}>
      <div className={`${styles.successContainer}`}>
        <div className={`${styles.innerContainer}`}>
          <div className={`${styles.iconContainer}`}>
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={`${styles.icon}`}
            />
          </div>
          <div className={`${styles.textContainer}`}>
            <p>Success: {feedbackState.successText}</p>
          </div>
          <div className={`${styles.buttonContainer}`}>
            <button className={`${styles.button}`} onClick={exitButtonHandler}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={`${styles.exitIcon}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (feedbackState.isLoading) {
    return loadingFeedback;
  }

  if (feedbackState.isSuccess) {
    return successFeedback;
  }

  if (feedbackState.isError) {
    return errorFeedback;
  }

  if (
    !feedbackState.isLoading &&
    !feedbackState.isSuccess &&
    !feedbackState.isError
  ) {
    return null;
  }

  return successFeedback;
};

export default Feedback;
