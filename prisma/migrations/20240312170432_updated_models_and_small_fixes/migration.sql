-- AlterTable
ALTER TABLE "bookmarks" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "code_token" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "comments_comments" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "roadmap" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "videos" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "videos_roadmap" ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);
