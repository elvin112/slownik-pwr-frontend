import styles from "../styles/Home.module.scss";
import { lightTheme } from "../constants/theme";

export default function Home() {
  return (
    <div className={`${styles.home}`} style={lightTheme}>
      <p style={{ fontSize: "5rem", fontWeight: 600 }}>Hello World!</p>
    </div>
  );
}
