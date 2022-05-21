import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import styles from "./ContentContainer.module.scss";
import Post from "./Post";
import CreatePost from "./CreatePost";
import PaginationButtons from "../../UIComponents/pagination/PaginationButtons";
import POSTS_PER_PAGE from "../../../constants/POSTS_PER_PAGE";

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
  totalPosts,
}) => {
  const [posts, setPosts] = useState(serverPosts);
  const [newPost, setNewPost] = useState(null);
  const router = useRouter();
  let frontendTitleId;

  if (router.query.title) {
    frontendTitleId = router.query.title[0];
  }

  const authState = useSelector((state) => state.auth);

  // If page is not full we might miss some posts before revalidation so fetch it
  useEffect(() => {
    fetchHelperFunc(baseUrl + currentPage, setPosts);
  }, [baseUrl, currentPage]);

  // When we move to another title reset the posts according to serverProps
  useEffect(() => {
    setPosts(serverPosts);
  }, [serverPosts]);

  // When new post is created
  useEffect(() => {
    if (newPost) {
      // Check if last page is full to decide which page to go
      const isLastPageFullOfPosts = totalPosts % 7 === 0;

      if (isLastPageFullOfPosts) {
        router.push(frontendTitleId + "/" + (totalPages + 1).toString());
        return;
      }

      // If we are not in the last page
      if (+currentPage !== totalPages) {
        router.push(frontendTitleId + "/" + totalPages);
        return;
      }

      // If we are in the last page but posts are full
      if (+currentPage === totalPages && posts.length >= POSTS_PER_PAGE) {
        router.push(frontendTitleId + "/" + (totalPages + 1).toString());
        return;
      }

      // If we are in the last page and there is place for more posts
      setPosts((state) => [...state, newPost]);
      setNewPost(null);
    }
  }, [newPost]);

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
        postId={post._id}
        totalPosts={totalPosts}
      />
    );
  });

  const pagination = (
    <div className={`${styles.paginationButtonsContainer}`}>
      <PaginationButtons totalPages={totalPages} currentPage={currentPage} />
    </div>
  );

  // Return the jsx of ContentContainer
  return (
    <>
      <div className={`${styles.titleContainer}`}>
        <p className={`${styles.title}`}>{titleName}</p>
      </div>
      {pagination}
      <div className={`${styles.postsContainer}`}>{postsArray}</div>
      {posts.length >= 4 ? pagination : null}
      {authState.token ? (
        <div className={`${styles.createPostContainer}`}>
          <CreatePost setNewPost={setNewPost} />
        </div>
      ) : null}
    </>
  );
};

export default ContentContainer;
