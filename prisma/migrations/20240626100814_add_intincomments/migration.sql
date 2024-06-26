/*
  Warnings:

  - You are about to alter the column `commentscount` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "commentscount" SET DATA TYPE INTEGER;
