/*
  Warnings:

  - You are about to drop the column `userId` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_userId_fkey";

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "userId",
ADD COLUMN     "parentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "inviteCode" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
