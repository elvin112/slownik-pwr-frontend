import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./ContentContainer.module.scss";
import Post from "./Post";
import { POSTS_PER_PAGE } from "../../../constants/constantNums";
import PaginationButtons from "../../UIComponents/pagination/PaginationButtons";

const fetchHelperFunc = async (url, setPosts) => {
  const fetchedPosts = await axios.get(url);

  setPosts(fetchedPosts.data.posts);
};

const ContentContainer = ({
  titleName,
  serverPosts,
  baseUrl,
  currentPage,
  totalPages,
}) => {
  const [posts, setPosts] = useState(serverPosts);

  // If page is not full we might miss some posts before revalidation so fetch it
  useEffect(() => {
    fetchHelperFunc(baseUrl + currentPage, setPosts);
  }, [baseUrl, currentPage]);

  // When we move to another title reset the posts according to serverProps
  useEffect(() => {
    setPosts(serverPosts);
  }, [serverPosts]);

  // If there are no posts return <p> (to avoid errors)
  if (!posts) {
    return <p>No posts</p>;
  }

  // Make a posts array to use in container
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

  // Return the jsx of ContentContainer
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.titleContainer}`}>
        <p className={`${styles.title}`}>{titleName}</p>
      </div>
      <div className={`${styles.paginationButtonsContainer}`}>
        <PaginationButtons totalPages={totalPages} />
      </div>
      <div className={`${styles.postsContainer}`}>{postsArray}</div>
      <div className={`${styles.paginationButtonsContainer}`}>
        <PaginationButtons totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ContentContainer;
