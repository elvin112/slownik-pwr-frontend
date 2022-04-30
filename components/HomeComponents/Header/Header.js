import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={`${styles.container}`}>
      <p>Slownik PWR</p>
      <div>Searchbar</div>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
    </div>
  );
};

export default Header;
