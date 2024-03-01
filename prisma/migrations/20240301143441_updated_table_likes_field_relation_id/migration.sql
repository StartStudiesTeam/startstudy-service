-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_comments_comments_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_comments_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_roadmap_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_video_id_fkey";

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "video_id" DROP NOT NULL,
ALTER COLUMN "roadmap_id" DROP NOT NULL,
ALTER COLUMN "comments_id" DROP NOT NULL,
ALTER COLUMN "comments_comments_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "roadmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_comments_id_fkey" FOREIGN KEY ("comments_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_comments_comments_id_fkey" FOREIGN KEY ("comments_comments_id") REFERENCES "comments_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
