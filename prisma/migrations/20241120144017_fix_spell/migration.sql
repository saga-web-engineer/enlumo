/*
  Warnings:

  - You are about to drop the column `invitorId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_invitorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "invitorId",
ADD COLUMN     "inviterId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
