import Link from "next/link";

import styles from "./Signup.module.scss";

const Signup = () => {
  return (
    <form className={`${styles.container}`}>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="username">
          Username
        </label>
        <input className={`${styles.formInput}`} id="username" type="text" />
      </div>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="email">
          Email
        </label>
        <input className={`${styles.formInput}`} id="email" type="email" />
      </div>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="password">
          Password
        </label>
        <input
          className={`${styles.formInput}`}
          id="password"
          type="password"
        />
      </div>
      <div className={`${styles.formControl}`}>
        <label className={`${styles.formLabel}`} htmlFor="confirm-password">
          Confirm Password
        </label>
        <input
          className={`${styles.formInput}`}
          id="confirm-password"
          type="password"
        />
      </div>

      <div className={`${styles.aggrementContainer}`}>
        <input className={`${styles.checkbox}`} type="checkbox" id="checkbox" />
        <label className={`${styles.checkboxLabel}`} htmlFor="checkbox">
          I have read the{" "}
          <span className={`${styles.checkboxSpan}`}>membership aggrement</span>
        </label>
      </div>

      <button type="submit" className={`${styles.blockButton}`}>
        continue
      </button>

      <div className={`${styles.alreadyMemberContainer}`}>
        <p className={`${styles.alreadyMemberParagraph}`}>
          Already a member?{" "}
          <Link href="/login">
            <a className={`${styles.alreadyMemberLink}`}>Login</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
