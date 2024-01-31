/*
  Warnings:

  - You are about to drop the `dateusers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token_confirmation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "token_confirmation" DROP CONSTRAINT "token_confirmation_user_id_fkey";

-- DropTable
DROP TABLE "dateusers";

-- DropTable
DROP TABLE "token_confirmation";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nick_name" TEXT NOT NULL,
    "phone_number" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "verify_mail" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "code_token" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "code_token" VARCHAR(6) NOT NULL,
    "confirmation_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "code_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nick_name_key" ON "users"("nick_name");

-- AddForeignKey
ALTER TABLE "code_token" ADD CONSTRAINT "code_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
