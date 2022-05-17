import React from "react";
// import PropTypes from "prop-types";
import { GetServerSideProps } from "next";
import prisma from "@lib/prisma";
import { useSession } from "next-auth/react";
import Layout from "@src/components/Layout";
import Link from "next/link";
import Table, { StatusPill } from "@src/components/Table";
import accounting from "accounting";
import { useRouter } from "next/router";

export type BProps = {
  id: number;
  peopleId: number;
  amount: number;
  description: string;
  dt: string;
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const b = await prisma.bashi.findMany({
    where: {
      peopleId: Number(params?.pid) || -1,
    },
    include: {
      people: {
        select: {
          name: true,
        },
      },
    },
  });
  const user = await prisma.people.findUnique({
    where: {
      id: Number(params?.pid),
    },
  });
  return {
    props: {
      b: JSON.parse(JSON.stringify(b)),
      user,
    },
  };
};

const People: React.FC<{ b: BProps }> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (prop) => {
          const a = prop.row.values.amount;
          let num = accounting.formatMoney(a, "₦", 2, ",", ".");
          return num;
        },
      },
      {
        Header: "Status",
        accessor: "paid",
        Cell: StatusPill,
        // Cell: (prop) => {
        //   const p = prop.row.values;

        //   return p.paid ? "Paid" : "Not Paid";
        // },
      },
      {
        Header: "Action",
        accessor: "url",
        Cell: (prop) => {
          const r = prop.row.values;
          // console.log(r);
          return (
            <>
              <Link href={`people/edit/${r.id}`}>
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
  const getTotals = (data, key) => {
    let total = 0;
    data.forEach((item) => {
      total += item[key];
    });
    return total;
  };

  const router = useRouter();
  const { pid } = router.query;

  const t = getTotals(props.b, "amount");
  return (
    <Layout>
      <div>
        <div className="flex justify-between">
          <h1 className="mb-5 text-4xl">Jerin B</h1>
          <p className="mb-5 text-3xl">({props.user.name + "'s records"})</p>
        </div>
        <div className="flex justify-between">
          <h1 className="mb-3 text-xl">
            Total Amount: (
            <span className="text-green-700">
              {accounting.formatMoney(t, "₦", 2, ",", ".")}
            </span>
            )
          </h1>
          <Link href={`/new-entry/${pid}`}>
            <a className="px-4 py-2 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent">
              Add Entry
            </a>
          </Link>
        </div>
        <Table columns={columns} data={props.b} />
      </div>
    </Layout>
  );
};

export default People;
