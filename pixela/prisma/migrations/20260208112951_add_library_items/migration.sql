-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('PLAN_TO_WATCH', 'WATCHING', 'COMPLETED', 'DROPPED');

-- CreateTable
CREATE TABLE "library_items" (
    "library_item_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_type" "ItemType" NOT NULL,
    "tmdb_id" BIGINT NOT NULL,
    "status" "WatchStatus" NOT NULL DEFAULT 'PLAN_TO_WATCH',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "library_items_pkey" PRIMARY KEY ("library_item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "library_items_user_id_item_type_tmdb_id_key" ON "library_items"("user_id", "item_type", "tmdb_id");

-- AddForeignKey
ALTER TABLE "library_items" ADD CONSTRAINT "library_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
