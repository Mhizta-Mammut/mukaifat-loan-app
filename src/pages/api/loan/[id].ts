import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loanId = req.query.id;

  if (req.method === "DELETE") {
    const loan = await prisma.bashi.delete({
      where: {
        id: Number(loanId),
      },
    });
    res.json(loan);
  } else {
    console.log("Loan cannot be created");
  }

  // +639063749137n
}
