-- CreateTable
CREATE TABLE "dateusers" (
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

    CONSTRAINT "dateusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_confirmation" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "code_token" VARCHAR(6) NOT NULL,
    "confirmation_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "token_confirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dateusers_email_key" ON "dateusers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dateusers_nick_name_key" ON "dateusers"("nick_name");

-- AddForeignKey
ALTER TABLE "token_confirmation" ADD CONSTRAINT "token_confirmation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "dateusers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
