import { useReducer, useEffect, useState } from "react";

import Link from "next/link";
import styles from "./Login.module.scss";

function formReducer(state, action) {
  switch (action.type) {
    case "EMAIL":
      return {
        ...state,
        email: action.val,
        isEmailValid: action.val.trim().length > 0,
      };
    case "PASSWORD":
      return {
        ...state,
        password: action.val,
        isPasswordValid: action.val.trim().length > 0,
      };
    default:
      return state;
  }
}

const Login = () => {
  console.log("TEST!!!");
  const [formState, dispatch] = useReducer(formReducer, {
    email: "",
    password: "",
    isEmailValid: false,
    isPasswordValid: false,
  });
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);

  const { isEmailValid } = formState;
  const { isPasswordValid } = formState;

  function formSubmissionHandler(event) {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      return;
    }
    setEnteredEmailIsValid(isEmailValid);
    setEnteredPasswordIsValid(isPasswordValid);
  }

  return (
    <form className={`${styles.container}`} onSubmit={formSubmissionHandler}>
      <h1 className={`${styles.title}`}>login</h1>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="email">
          email
        </label>
        <input
          onChange={(event) =>
            dispatch({ type: "EMAIL", val: event.currentTarget.value })
          }
          className={`${styles.formInput} ${
            !enteredEmailIsValid && !isEmailValid && styles.invalidInput
          }`}
          id="email"
          type="text"
        />
        {!enteredEmailIsValid && !isEmailValid && (
          <p>email must not be empty!</p>
        )}
      </div>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="password">
          password
        </label>
        <input
          onChange={(event) =>
            dispatch({ type: "PASSWORD", val: event.currentTarget.value })
          }
          className={`${styles.formInput} ${
            !enteredPasswordIsValid && !isPasswordValid && styles.invalidInput
          }`}
          id="password"
          type="password"
        />
        {!enteredPasswordIsValid && !isPasswordValid && (
          <p>password must not be empty!</p>
        )}
      </div>

      <div className={`${styles.aggrementContainer}`}>
        <label className={`${styles.checkboxContainer}`}>
          remember my password
          <input type="checkbox" />
          <span className={`${styles.checkboxMark}`}></span>
        </label>
      </div>

      <button type="submit" className={`${styles.blockButton}`}>
        log in
      </button>

      <div className={`${styles.alreadyMemberContainer}`}>
        <p className={`${styles.alreadyMemberParagraph}`}>
          <Link href="/login">
            <a className={`${styles.alreadyMemberLink}`}>
              I forgot my password &#x1F625;
            </a>
          </Link>
        </p>
        <p className={`${styles.alreadyMemberParagraph}`}>
          <Link href="/signup">
            <a className={`${styles.alreadyMemberLink}`}>signup!</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
