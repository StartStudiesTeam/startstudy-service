/*
  Warnings:

  - You are about to drop the column `video_id` on the `bookmarks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_video_id_fkey";

-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "video_id";
