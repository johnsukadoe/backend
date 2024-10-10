/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `Creator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Creator" DROP COLUMN "avatar_url";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_url" TEXT;
