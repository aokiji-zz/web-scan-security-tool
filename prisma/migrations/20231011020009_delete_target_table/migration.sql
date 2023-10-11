/*
  Warnings:

  - You are about to drop the column `targetId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `Target` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_targetId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "targetId";

-- DropTable
DROP TABLE "Target";
