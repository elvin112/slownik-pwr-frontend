import Link from "next/link";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <form className={`${styles.container}`}>
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

      <div className={`${styles.aggrementContainer}`}>
        <input className={`${styles.checkbox}`} type="checkbox" id="checkbox" />
        <label className={`${styles.checkboxLabel}`} htmlFor="checkbox">
          Remember my password
        </label>
      </div>

      <button type="submit" className={`${styles.blockButton}`}>
        continue
      </button>

      <div className={`${styles.alreadyMemberContainer}`}>
        <p className={`${styles.alreadyMemberParagraph}`}>
          <Link href="/login">
            <a className={`${styles.alreadyMemberLink}`}>
              I forgot my password :(
            </a>
          </Link>
        </p>
        <p className={`${styles.alreadyMemberParagraph}`}>
          <Link href="/signup">
            <a className={`${styles.alreadyMemberLink}`}>Signup!</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
