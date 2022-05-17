import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import Table from "../components/Table";
import Link from "next/link";

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
              <a
                onClick={() => handleDeleteButtonClick(r.id)}
                className="px-4 py-2 mr-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
              >
                {/* IoEyeOutline */}
                Delete
              </a>
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

  if (!session) {
    return <Layout>Access denied</Layout>;
  }

  // console.log(props.people);
  return (
    <Layout>
      <div className="page">
        <div className="flex justify-between">
          <h1 className="mb-5 text-2xl">Total Loan:</h1>
          <p className="mb-5 text-3xl">'hhhhh'</p>
        </div>

        <div className="flex justify-between">
          <h1 className="mb-5 text-4xl">People</h1>
          <p className="mb-5 text-3xl"></p>
        </div>

        <main>
          <Table columns={columns} data={props.people} />
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
