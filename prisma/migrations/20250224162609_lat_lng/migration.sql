/*
  Warnings:

  - You are about to drop the column `location` on the `properties` table. All the data in the column will be lost.
  - Added the required column `lat` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "location",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;
