-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_invitorId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "invitorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_invitorId_fkey" FOREIGN KEY ("invitorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
