/*
  Warnings:

  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "title" TEXT NOT NULL;
