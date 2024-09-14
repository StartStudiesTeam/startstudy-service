/*
  Warnings:

  - You are about to drop the column `comments_comments_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `comments_comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments_comments" DROP CONSTRAINT "comments_comments_comments_id_fkey";

-- DropForeignKey
ALTER TABLE "comments_comments" DROP CONSTRAINT "comments_comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_comments_comments_id_fkey";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "comments_comments_id";

-- DropTable
DROP TABLE "comments_comments";
