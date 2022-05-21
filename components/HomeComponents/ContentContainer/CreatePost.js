import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CreatePost.module.scss";
import { feedbackActions } from "../../../store/feedbackSlice";

const CreatePost = ({ setNewPost }) => {
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const authState = useSelector((state) => state.auth);

  const textAreaChangeHandler = (event) => {
    setPost(event.target.value);
  };

  const addButtonHandler = async () => {
    const titleId = router.query.title[0];

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authState.token}`,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/posts/post",
        { titleId: titleId, post: post },
        { headers: headers }
      );

      const data = response.data;

      setNewPost(data.response);
      setPost("");
    } catch (err) {
      if (err.response.status === 422) {
        dispatch(
          feedbackActions.error(
            err.response.status + " " + err.response.data.errors.errors[0].msg
          )
        );
      }

      if (err.response.status === 500) {
        dispatch(
          feedbackActions.error(
            err.response.data.status + " " + err.response.data.message
          )
        );
      }

      setTimeout(() => {
        dispatch(feedbackActions.cleanup());
      }, 5000);

      console.log(err.response);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <textarea
        className={`${styles.textArea}`}
        value={post}
        placeholder="Write a new post:"
        onChange={textAreaChangeHandler}
      />
      <div className={`${styles.addButtonContainer}`}>
        <button className={`${styles.addButton}`} onClick={addButtonHandler}>
          add
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
