import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Link href={`/auth/login`}>Go</Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return { props: {}, redirect: { destination: "/auth/login" } };
};

export default Home;
