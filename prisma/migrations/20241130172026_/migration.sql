/*
  Warnings:

  - You are about to drop the `_angel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_bad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_cry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_funny` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_good` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_angel" DROP CONSTRAINT "_angel_A_fkey";

-- DropForeignKey
ALTER TABLE "_angel" DROP CONSTRAINT "_angel_B_fkey";

-- DropForeignKey
ALTER TABLE "_bad" DROP CONSTRAINT "_bad_A_fkey";

-- DropForeignKey
ALTER TABLE "_bad" DROP CONSTRAINT "_bad_B_fkey";

-- DropForeignKey
ALTER TABLE "_cry" DROP CONSTRAINT "_cry_A_fkey";

-- DropForeignKey
ALTER TABLE "_cry" DROP CONSTRAINT "_cry_B_fkey";

-- DropForeignKey
ALTER TABLE "_funny" DROP CONSTRAINT "_funny_A_fkey";

-- DropForeignKey
ALTER TABLE "_funny" DROP CONSTRAINT "_funny_B_fkey";

-- DropForeignKey
ALTER TABLE "_good" DROP CONSTRAINT "_good_A_fkey";

-- DropForeignKey
ALTER TABLE "_good" DROP CONSTRAINT "_good_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDeveloper" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_angel";

-- DropTable
DROP TABLE "_bad";

-- DropTable
DROP TABLE "_cry";

-- DropTable
DROP TABLE "_funny";

-- DropTable
DROP TABLE "_good";

-- CreateTable
CREATE TABLE "_angry" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_horror" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_smile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_angry_AB_unique" ON "_angry"("A", "B");

-- CreateIndex
CREATE INDEX "_angry_B_index" ON "_angry"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_horror_AB_unique" ON "_horror"("A", "B");

-- CreateIndex
CREATE INDEX "_horror_B_index" ON "_horror"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_smile_AB_unique" ON "_smile"("A", "B");

-- CreateIndex
CREATE INDEX "_smile_B_index" ON "_smile"("B");

-- AddForeignKey
ALTER TABLE "_angry" ADD CONSTRAINT "_angry_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_angry" ADD CONSTRAINT "_angry_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_horror" ADD CONSTRAINT "_horror_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_horror" ADD CONSTRAINT "_horror_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_smile" ADD CONSTRAINT "_smile_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_smile" ADD CONSTRAINT "_smile_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
