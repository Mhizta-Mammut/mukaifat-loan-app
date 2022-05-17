import prisma from "@lib/prisma";
import Layout from "@src/components/Layout";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface FormData {
  amount: number;
  description: string;
  uid: string;
}

const New = () => {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState<FormData>({
    amount: 0,
    description: "",
    uid: String(id),
  });

  async function create(data: FormData) {
    //
    try {
      fetch("/api/entry", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => router.back());
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
    //   e: React.FormEvent
    // let amount = Number(amt);
    //   const config: AxiosRequestConfig = {
    //     method: "POST",
    //     url: "api/entry",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: { description, amount },
    //   };
    //   const { data } = await axios(config);
    //   alert("adding new entry");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">New Entry {id}</h1>
      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
          className="max-w-4xl mt-4"
        >
          <label className="block">
            <span className="text-gray-700">Amount</span>
            <input
              className="w-full h-10 px-3 mt-1 mb-3 bg-gray-100 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-blue-100 text-1xl text-neutral-500"
              type="text"
              value={form.amount}
              placeholder="₦10,000"
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Description</span>
            <input
              className="w-full h-10 px-3 mt-1 mb-3 bg-gray-100 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-blue-100 text-1xl text-neutral-500"
              type="text"
              value={form.description}
              placeholder="Money of..."
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          <button
            type="submit"
            className="w-full p-3 mt-4 text-blue-700 transition-all duration-100 bg-transparent border border-blue-700 rounded hover:bg-blue-700 hover:text-white hover:border-transparent"
          >
            Add Entry
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default New;
