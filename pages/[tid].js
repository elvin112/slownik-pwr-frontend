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
  const result = await axios.get("http://localhost:8080/posts/get-titles");

  const fetchedParams = result.data.output.map((titleItem) => {
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
      `http://localhost:8080/posts/get-title/${titleId}`
    );
    const data = result.data;

    if (result.status !== 200) {
      throw new Error("Couldn't fetch the data");
    }

    return {
      props: {
        posts: data.titleResult.posts,
        titleName: data.titleResult.titleName,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
