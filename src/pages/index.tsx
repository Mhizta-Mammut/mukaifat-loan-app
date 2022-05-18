import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import Table from "../components/Table";
import Link from "next/link";
import accounting from "accounting";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {
  const people = await prisma.people.findMany();
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed, people },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const router = useRouter();

  async function handleDeleteButtonClick(id: number) {
    const answer = confirm("Are you sure you want to delete this post?");
    if (!answer) return;

    try {
      // await deletePost(id);
      alert("Post deleted successfully!");
      // router.replace("/");
    } catch (error) {
      alert("Something went wrong :/");
    }
  }
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Mobile Number",
        accessor: "phone",
      },
      {
        Header: "Action",
        accessor: "url",
        Cell: (prop) => {
          const r = prop.row.values;
          // console.log(r);
          return (
            <>
              <Link href={`people/${r.id}/edit`}>
                <a className="px-4 py-2 mr-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
                  Edit
                </a>
              </Link>
              <Link href={`people/${r.id}`}>
                <a className="px-4 py-2 mr-2 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent">
                  {/* IoEyeOutline */}
                  View
                </a>
              </Link>

              {/* <a>d</a> */}
            </>
          );
        },
      },
    ],
    []
  );

  const { data: session, status } = useSession();
  const loading = status === "loading";

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  if (!session) {
    return <Layout>Access denied</Layout>;
  }

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <Layout>
      <div className="page">
        <div className="flex justify-between">
          <h1 className="mb-5 text-2xl">
            Total Loan:{" "}
            <span className="text-4xl text-blue-700">
              {" "}
              {accounting.formatMoney(40, "₦", 2, ",", ".")}
            </span>
          </h1>
          <h1 className="mb-5 text-2xl">
            Paid:{" "}
            <span className="text-4xl text-green-700">
              {" "}
              {accounting.formatMoney(30, "₦", 2, ",", ".")}
            </span>
          </h1>
          <h1 className="mb-5 text-2xl">
            Actual:{" "}
            <span className="text-4xl text-red-700">
              {" "}
              {accounting.formatMoney(10, "₦", 2, ",", ".")}
            </span>
          </h1>
        </div>

        <div className="flex justify-between">
          <h1 className="mb-5 text-4xl">People</h1>
          <p className="mb-5 text-3xl"></p>
        </div>

        <main>
          <Table columns={columns} data={props.people} />
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
