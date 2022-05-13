import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CreatePost.module.scss";

const CreatePost = ({ setNewPost }) => {
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const authState = useSelector((state) => state.auth);
  const feedbackState = useSelector((state) => state.feedback);

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
      console.log(err.response);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <textarea
        className={`${styles.textArea}`}
        value={post}
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
