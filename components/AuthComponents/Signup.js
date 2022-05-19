import Link from "next/link";
import { useReducer, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { feedbackActions } from "../../store/feedbackSlice";

import styles from "./Signup.module.scss";

function formReducer(state, action) {
  switch (action.type) {
    case "USERNAME":
      return {
        ...state,
        username: action.val,
        isUsernameValid:
          action.val.trim().length >= 4 && action.val.trim().length <= 25,
      };

    case "EMAIL":
      return {
        ...state,
        email: action.val,
        isEmailValid:
          !action.val.trim().startsWith("@") &&
          (action.val.trim().endsWith("@student.pwr.edu.pl") ||
            action.val.trim().endsWith("@pwr.edu.pl")),
      };
    case "PASSWORD":
      return {
        ...state,
        password: action.val,
        isPasswordValid: action.val.trim().length >= 8,
      };
    case "CONFIRM-PASSWORD":
      return {
        ...state,
        confirmPassword: action.val,
        isConfirmPasswordValid: action.val.trim() === state.password,
      };
    default:
      return state;
  }
}

const Signup = () => {
  const reduxDispatch = useDispatch();
  const router = useRouter();

  const [formState, dispatch] = useReducer(formReducer, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isUsernameValid: false,
    isEmailValid: false,
    isPasswordValid: false,
    isConfirmPasswordValid: false,
  });

  const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(true);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);
  const [enteredConfirmPasswordValid, setEnteredConfirmPasswordValid] =
    useState(true);

  const { isUsernameValid } = formState;
  const { isEmailValid } = formState;
  const { isPasswordValid } = formState;
  const { isConfirmPasswordValid } = formState;

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      try {
        reduxDispatch(feedbackActions.loading());

        const response = await axios.post("http://localhost:8080/auth/signup", {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          confirmPassword: formState.confirmPassword,
        });

        reduxDispatch(feedbackActions.success("You successfully signed up!"));

        setTimeout(() => {
          reduxDispatch(feedbackActions.cleanup());
        }, 3000);

        router.push("/login");
      } catch (err) {
        if (err.status === 500) {
          reduxDispatch(feedbackActions.error(err.data.message));

          setTimeout(() => {
            reduxDispatch(feedbackActions.cleanup());
          }, 5000);

          return;
        }

        if (err.response.status === 422) {
          const firstError = err.response.data.errors.errors[0].msg;
          console.log(firstError);
          reduxDispatch(feedbackActions.error(firstError));

          setTimeout(() => {
            reduxDispatch(feedbackActions.cleanup());
          }, 5000);

          return;
        }
      }
    }

    setEnteredUsernameIsValid(isUsernameValid);
    setEnteredEmailIsValid(isEmailValid);
    setEnteredPasswordIsValid(isPasswordValid);
    setEnteredConfirmPasswordValid(isConfirmPasswordValid);
  };
  return (
    <form className={`${styles.container}`} onSubmit={formSubmissionHandler}>
      <h1 className={`${styles.title}`}>signup</h1>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="username">
          username
        </label>
        <input
          className={`${styles.formInput} ${
            !enteredUsernameIsValid && !isUsernameValid && styles.invalidInput
          }`}
          id="username"
          type="text"
          onChange={(event) =>
            dispatch({ type: "USERNAME", val: event.currentTarget.value })
          }
        />
        {!enteredUsernameIsValid && !isUsernameValid && (
          <p>usernames must be between 4 and 25 characters!</p>
        )}
      </div>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="email">
          email
        </label>
        <input
          className={`${styles.formInput} ${
            !enteredEmailIsValid && !isEmailValid && styles.invalidInput
          }`}
          id="email"
          type="text"
          onChange={(event) =>
            dispatch({ type: "EMAIL", val: event.currentTarget.value })
          }
        />
        {!enteredEmailIsValid && !isEmailValid && (
          <p>
            please enter a valid email under either
            &apos;student.pwr.edu.pl&apos; or &apos;pwr.edu.pl&apos; domains!
          </p>
        )}
      </div>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="password">
          password
        </label>
        <input
          className={`${styles.formInput} ${
            !enteredPasswordIsValid && !isPasswordValid && styles.invalidInput
          }`}
          id="password"
          type="password"
          onChange={(event) => {
            dispatch({ type: "PASSWORD", val: event.currentTarget.value });
            dispatch({
              type: "CONFIRM-PASSWORD",
              val: formState.confirmPassword,
            });
          }}
        />
        {!enteredPasswordIsValid && !isPasswordValid && (
          <p>password must have a minimum of eight characters!</p>
        )}
      </div>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="confirm-password">
          confirm Password
        </label>
        <input
          className={`${styles.formInput} ${
            !enteredConfirmPasswordValid &&
            !isConfirmPasswordValid &&
            styles.invalidInput
          }`}
          id="confirm-password"
          type="password"
          onChange={(event) =>
            dispatch({
              type: "CONFIRM-PASSWORD",
              val: event.currentTarget.value,
            })
          }
        />
        {!enteredConfirmPasswordValid && !isConfirmPasswordValid && (
          <p>passwords do not match!</p>
        )}
      </div>

      <div className={`${styles.aggrementContainer}`}>
        <label className={`${styles.checkboxContainer}`}>
          I have read the{" "}
          <span className={`${styles.checkboxSpan}`}>membership aggrement</span>
          <input type="checkbox" />
          <span className={`${styles.checkboxMark}`}></span>
        </label>
      </div>

      <button type="submit" className={`${styles.blockButton}`}>
        continue
      </button>

      <div className={`${styles.alreadyMemberContainer}`}>
        <p className={`${styles.alreadyMemberParagraph}`}>
          already a member?{" "}
          <Link href="/login">
            <a className={`${styles.alreadyMemberLink}`}>Login</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
