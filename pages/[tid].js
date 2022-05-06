import axios from "axios";

import HomeLayout from "../components/Layout/HomeLayout";
import ContentContainer from "../components/HomeComponents/ContentContainer/ContentContainer";

const Title = ({ titleName, posts }) => {
  return (
    <HomeLayout>
      <ContentContainer titleName={titleName} posts={posts} />
    </HomeLayout>
  );
};

export default Title;

// All the sidebar titles are added to the static paths
export const getStaticPaths = async () => {
  const result = await axios.get("http://localhost:8080/posts/titles/0");

  const fetchedParams = result.data.bestTitles.map((titleItem) => {
    return { params: { tid: titleItem._id } };
  });

  const anotherParams = fetchedParams.map((item) => {
    return;
  });

  return {
    paths: fetchedParams,
    fallback: true,
  };
};

// Extract url title id, fetch the data and pass it as props
export async function getStaticProps(context) {
  const { params } = context;

  const titleId = params.tid;

  // For the future
  const pageId = params.pid;

  try {
    const result = await axios.get(
      `http://localhost:8080/posts/title/${titleId}?pId=1`
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
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
