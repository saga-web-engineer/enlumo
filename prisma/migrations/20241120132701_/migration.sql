/*
  Warnings:

  - You are about to drop the column `inviteIdChildren` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Invite` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `invitorId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_parentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_inviteIdChildren_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "inviteIdChildren",
ADD COLUMN     "invitorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Invite";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_invitorId_fkey" FOREIGN KEY ("invitorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
