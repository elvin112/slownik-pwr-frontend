import useSWR from "swr";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./ContentContainer.module.scss";
import Post from "./Post";
import { POSTS_PER_PAGE } from "../../../constants/constantNums";

const ContentContainer = ({ titleName, serverPosts, url }) => {
  const [posts, setPosts] = useState(serverPosts);

  useEffect(() => {
    const fetchHelperFunc = async (url) => {
      const fetchedPosts = await axios.get(url);

      setPosts(fetchedPosts.data.posts);
    };

    if (posts.length < POSTS_PER_PAGE) {
      fetchHelperFunc(url);
    }
  }, [url, posts.length]);

  if (!posts) {
    return <p>No posts</p>;
  }

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
