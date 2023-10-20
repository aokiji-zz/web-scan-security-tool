/*
  Warnings:

  - You are about to drop the column `macAddress` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `port` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `protocol` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Target` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Target" DROP COLUMN "macAddress",
DROP COLUMN "port",
DROP COLUMN "product",
DROP COLUMN "protocol",
DROP COLUMN "service",
DROP COLUMN "state",
DROP COLUMN "version",
ADD COLUMN     "serviceIds" INTEGER;

-- CreateTable
CREATE TABLE "Service" (
    "port" INTEGER NOT NULL,
    "protocol" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "version" TEXT,
    "product" TEXT,
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
