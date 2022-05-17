import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, description, uid } = req.body;
  try {
    const entry = await prisma.bashi.create({
      data: {
        description,
        amount,
        peopleId: Number(uid),
      },
    });

    res.status(200).json({ message: `${entry} Added Successfully!` });
  } catch (error) {
    console.log(error);
    // res.status(401).json(error);
    throw Error(error);
  }
}
