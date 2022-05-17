import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fullname, mobile } = req.body;
  try {
    //
    await prisma.people.create({
      data: {
        name: fullname,
        phone: mobile,
      },
    });
    // let d = {
    //     error: false,
    //     msg: `${fname} Added Successfully!`
    // }
    res.status(200).json({ message: `${fullname} Added Successfully!` });
  } catch (error) {
    console.log(error);
    // res.status(401).json(error);
    throw Error(error);
  }
}
