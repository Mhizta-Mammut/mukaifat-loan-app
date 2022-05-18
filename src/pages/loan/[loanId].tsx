import Layout from "@src/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const loan = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();
  const { loanId } = router.query;

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  if (!session) {
    return <Layout>Access denied</Layout>;
  }
  return (
    <Layout>
      <form className="w-full">
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
              htmlFor="inline-full-name"
            >
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              value="Jane Doe"
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <label className="block font-bold text-gray-500 md:w-2/3">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">Send me your newsletter!</span>
          </label>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="px-4 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none"
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default loan;
