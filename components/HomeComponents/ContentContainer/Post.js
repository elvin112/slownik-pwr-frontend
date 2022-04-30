import styles from "./Post.module.scss";

const dateConverter = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${dt}.${month}.${year} ${hours}:${minutes}`;
};

const Post = ({ date, postContent, username }) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.upperContainer}`}>
        <p>{postContent}</p>
      </div>
      <div className={`${styles.lowerContainer}`}>
        <div className={`${styles.date}`}>
          <p>{dateConverter(date)}</p>
        </div>
        <div className={`${styles.username}`}>
          <p>{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
