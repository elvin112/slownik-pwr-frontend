import { useEffect } from "react";
import Link from "next/link";

import styles from "./ContentDiscoveryContainer.module.scss";
import Post from "../ContentContainer/Post";
import POSTS_PER_PAGE from "../../../constants/POSTS_PER_PAGE";

/*
Create a ContentDiscoveryPost component, it should also handle update and delete options

When click to the title it should go to that page and mark the post with yellow background using params
*/

const ContentDiscoveryContainer = ({ content, paginationExists }) => {
  const postsArray = content.map((content) => {
    return (
      <div key={content.postId}>
        <div className={`${styles.titleContainer}`}>
          <Link href={`/${content.titleId}/${content.pageId}`}>
            <p className={`${styles.title}`}>{content.title}</p>
          </Link>
        </div>
        <Post
          date={content.date}
          postContent={content.postContent}
          username={content.username}
          postId={content.postId}
          totalPosts={POSTS_PER_PAGE}
        />
      </div>
    );
  });

  return (
    <>
      <div className={`${styles.marginTop}`}></div>
      {postsArray}
    </>
  );
};

export default ContentDiscoveryContainer;
