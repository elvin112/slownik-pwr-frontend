import axios from "axios";

import HomeLayout from "../components/Layout/HomeLayout";
import ContentContainer from "../components/HomeComponents/ContentContainer/ContentContainer";
import { POSTS_PER_PAGE } from "../constants/constantNums";

const Title = ({ titleName, posts, url, baseUrl, currentPage, totalPages }) => {
  return (
    <HomeLayout>
      <ContentContainer
        titleName={titleName}
        serverPosts={posts}
        baseUrl={baseUrl}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </HomeLayout>
  );
};

export default Title;

// All the titles and pages of the titles added to static paths
export const getStaticPaths = async () => {
  // Fetch all the titles
  const result = await axios.get("http://localhost:8080/posts/all-titles");

  // Store all the possible path parameters in fetchedParams
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
    const baseUrl = `http://localhost:8080/posts/title/${titleId}?pId=`;

    const url = `http://localhost:8080/posts/title/${titleId}?pId=${
      pageId || 1
    }`;

    // Make request to each one of the parameters coming from getStaticParams
    const result = await axios.get(url);
    const data = result.data;

    // If there are no posts return to notFound
    if (result.status !== 200) {
      throw new Error("Couldn't fetch the data");
    }

    return {
      props: {
        posts: data.posts,
        titleName: data.titleName,
        baseUrl,
        currentPage: pageId,
        totalPages: data.totalPages,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
