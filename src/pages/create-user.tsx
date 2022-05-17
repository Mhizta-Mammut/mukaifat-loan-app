import Layout from "@src/components/Layout";
import React, { useState } from "react";
import { useRouter } from "next/router";

interface FormData {
  fullname: string;
  mobile: string;
}

const user = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({ fullname: "", mobile: "" });

  async function createUser(data: FormData) {
    try {
      await fetch("/api/add-user", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => {
          router.push("/");
        })
        .then(() => setForm({ fullname: "", mobile: "" }));
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (data: FormData) => {
    try {
      createUser(data);
    } catch (error) {
      console.log(error);
    }
    // console.log(fname, mobile);
    // const config: AxiosRequestConfig = {
    //   method: "POST",
    //   url: "api/add-user",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: { fname, mobile },
    // };
    // const { data } = await axios(config);
    // setM(data);
  };
  return (
    <Layout>
      <h1 className="text-2xl font-bold">New User</h1>
      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
          className="max-w-4xl mt-4"
        >
          <label className="block">
            <span className="text-gray-700">Full name</span>
            <input
              className="w-full h-10 px-3 mt-1 mb-3 bg-gray-100 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-blue-100 text-1xl text-neutral-500"
              type="text"
              value={form.fullname}
              placeholder="Enter the full name"
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Phone Number</span>
            <input
              className="w-full h-10 px-3 mt-1 mb-3 bg-gray-100 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-blue-100 text-1xl text-neutral-500"
              type="text"
              value={form.mobile}
              placeholder="08012345678"
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
          </label>

          <button
            type="submit"
            className="w-full p-3 mt-4 text-blue-700 transition-all duration-100 bg-transparent border border-blue-700 rounded hover:bg-blue-700 hover:text-white hover:border-transparent"
          >
            Add User
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default user;
