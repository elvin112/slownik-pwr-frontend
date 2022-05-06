import styles from "./ContentContainer.module.scss";
import Post from "./Post";

const ContentContainer = ({ titleName, posts }) => {
  const postsArray = posts.map((post) => {
    return (
      <Post
        key={post._id}
        date={post.date}
        postContent={post.content}
        username={post.userId.username}
      />
    );
  });
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.titleContainer}`}>
        <p className={`${styles.title}`}>{titleName}</p>
      </div>
      <div className={`${styles.postsContainer}`}>{postsArray}</div>
    </div>
  );
};

export default ContentContainer;
