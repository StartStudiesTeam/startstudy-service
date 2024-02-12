/*
  Warnings:

  - Made the column `verify_mail` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "verify_mail" SET NOT NULL,
ALTER COLUMN "verify_mail" SET DEFAULT false;
