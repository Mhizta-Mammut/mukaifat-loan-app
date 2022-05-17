-- CreateTable
CREATE TABLE "People" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" INTEGER
);

-- CreateTable
CREATE TABLE "Bashi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "dt" DATETIME DEFAULT NOW(),
    "amount" INTEGER NOT NULL,
    "peopleId" INTEGER,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Bashi_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
