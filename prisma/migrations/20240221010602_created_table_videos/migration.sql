-- CreateTable
CREATE TABLE "Videos" (
    "id" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount_like" INTEGER NOT NULL,
    "user_owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_user_owner_id_fkey" FOREIGN KEY ("user_owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
