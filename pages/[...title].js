import axios from "axios";
import { useRouter } from "next/router";

import HomeLayout from "../components/Layout/HomeLayout";
import ContentContainer from "../components/HomeComponents/ContentContainer/ContentContainer";

const POSTS_PER_PAGE = 7;

const Title = ({ titleName, posts }) => {
  const router = useRouter();

  return (
    <HomeLayout>
      <ContentContainer titleName={titleName} posts={posts} />
    </HomeLayout>
  );
};

export default Title;

// All the sidebar titles are added to the static paths
export const getStaticPaths = async () => {
  const result = await axios.get("http://localhost:8080/posts/all-titles");

  const allTitles = result.data;
  const fetchedParams = [];

  for (let i = 0; i < allTitles.length; i++) {
    const maxPage = Math.floor(allTitles[i].length / POSTS_PER_PAGE) + 1;

    for (let j = 0; j < maxPage; j++) {
      fetchedParams.push({
        params: { title: [allTitles[i]._id, (j + 1).toString()] },
      });
    }
  }

  return {
    paths: fetchedParams,
    fallback: true,
  };
};

// Extract url title id, fetch the data and pass it as props
export async function getStaticProps(context) {
  const { params } = context;

  const titleId = params.title[0];
  const pageId = params.title[1];

  try {
    const result = await axios.get(
      `http://localhost:8080/posts/title/${titleId}?pId=${pageId || 1}`
    );
    const data = result.data;

    if (result.status !== 200) {
      throw new Error("Couldn't fetch the data");
    }

    return {
      props: {
        posts: data.posts,
        titleName: data.titleName,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
