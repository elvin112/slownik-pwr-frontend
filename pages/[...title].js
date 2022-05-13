import axios from "axios";
import Head from "next/head";

import HomeLayout from "../components/Layout/HomeLayout";
import ContentContainer from "../components/HomeComponents/ContentContainer/ContentContainer";

const Title = ({
  titleName,
  posts,
  url,
  baseUrl,
  currentPage,
  totalPages,
  totalPosts,
}) => {
  return (
    <>
      <Head>
        <title>{titleName}</title>
      </Head>
      <HomeLayout>
        <ContentContainer
          titleName={titleName}
          serverPosts={posts}
          baseUrl={baseUrl}
          currentPage={currentPage}
          totalPages={totalPages}
          totalPosts={totalPosts}
        />
      </HomeLayout>
    </>
  );
};

export default Title;

// All the titles and pages of the titles added to static paths
export const getStaticPaths = async () => {
  // Fetch all the titles
  const result = await axios.get("http://localhost:8080/posts/all-best-titles");

  // Store all best title urls in fetchedParams
  const allBestTitles = result.data;
  const fetchedParams = [];

  // For each popular title add them to fetchedParams with next.js syntax
  allBestTitles.result.forEach((titleUrl) => {
    fetchedParams.push({
      params: { title: [titleUrl, "1"] },
    });
  });

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

    const url = `${baseUrl}${pageId || 1}`;

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
        totalPosts: data.totalPosts,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
