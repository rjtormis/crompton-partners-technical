/*
  Warnings:

  - Added the required column `status` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "status" VARCHAR(255) NOT NULL;
