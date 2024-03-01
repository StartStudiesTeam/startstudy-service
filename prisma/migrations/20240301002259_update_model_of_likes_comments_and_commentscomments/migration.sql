/*
  Warnings:

  - Added the required column `comments` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comments_comments` to the `comments_comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "comments" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comments_comments" ADD COLUMN     "comments_comments" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "likes" BOOLEAN NOT NULL DEFAULT false;
