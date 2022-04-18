import { useState, useEffect } from "react";
import axios from "axios";

import TitleItem from "./TitleItem";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8080/posts/get-titles"
        );

        if (result.status !== 200) {
          throw new Error("Error while fetching titles");
        }

        setTitles(result.data.output);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTitles();
  }, []);

  const titleItems = titles.map((title, idx) => {
    if (idx > 20) return;

    return (
      <TitleItem key={title._id} id={title._id}>
        {title.titleName}
      </TitleItem>
    );
  });

  return <div className={`${styles.container}`}>{titleItems}</div>;
};

export default Sidebar;
