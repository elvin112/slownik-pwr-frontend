import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

import { feedbackActions } from "../../store/feedbackSlice";
import styles from "./CreateTitle.module.scss";

const CreateTitle = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [titleInputErrorMessage, setTitleInputErrorMessage] = useState("");
  const [postInputErrorMessage, setPostInputErrorMessage] = useState("");

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const _createTitleRequest = async () => {
    try {
      dispatch(feedbackActions.loading());
      const response = await axios.post(
        "http://localhost:8080/posts/title",
        {
          title: title,
          post: post,
        },
        {
          headers: {
            Authorization: "Bearer " + authState.token,
          },
        }
      );

      if (response.status === 201) {
        dispatch(feedbackActions.success("Post content successfully updated!"));

        setTimeout(() => {
          dispatch(feedbackActions.cleanup());
        }, 3000);

        router.push(`/${response.data.result._id}/1`);
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const firstError = err.response.data.errors.errors[0].msg;
        dispatch(feedbackActions.error(firstError));

        setTimeout(() => {
          dispatch(feedbackActions.cleanup());
        }, 5000);

        return;
      }

      if (err.response && err.response.status === 500) {
        const message = err.response.data.message;
        dispatch(feedbackActions.error(message));

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

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (title === "") {
      setTitleInputErrorMessage(
        "You have to enter a title to create a new title!"
      );
    }
    if (post === "") {
      setPostInputErrorMessage(
        "You have to enter a post to create a new title!"
      );
    }
    if (title.length > 128) {
      setTitleInputErrorMessage("Title's length must be below 128!");
    }
    if (post.length > 560) {
      setPostInputErrorMessage("Post's length must be below 560");
    }

    if (
      title === "" ||
      post === "" ||
      title.length > 128 ||
      post.length > 560
    ) {
      return;
    }

    _createTitleRequest();
  };

  const inputAreaHandler = (e) => {
    if (titleInputErrorMessage.length > 0) {
      setTitleInputErrorMessage("");
    }
    setTitle(e.target.value);
  };

  const textAreaHandler = (e) => {
    if (postInputErrorMessage.length > 0) {
      setPostInputErrorMessage("");
    }
    setPost(e.target.value);

    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <form className={`${styles.form}`} onSubmit={formSubmitHandler}>
      <div className={`${styles.inputGroup}`}>
        <input
          type="text"
          placeholder="Enter Title Name:"
          className={`${styles.titleInput}`}
          value={title}
          onChange={inputAreaHandler}
        />
        <p>{titleInputErrorMessage}</p>
      </div>
      <div className={`${styles.inputGroup}`}>
        <textarea
          className={`${styles.postInput}`}
          placeholder="Enter First Post:"
          value={post}
          onChange={textAreaHandler}
        />
        <p className={`${styles.textAreaErrorText}`}>{postInputErrorMessage}</p>
      </div>
      <input type="submit" className={`${styles.submitButton}`} />
    </form>
  );
};

export default CreateTitle;
