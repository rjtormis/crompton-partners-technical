/*
  Warnings:

  - Added the required column `images` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "images" JSONB NOT NULL;
