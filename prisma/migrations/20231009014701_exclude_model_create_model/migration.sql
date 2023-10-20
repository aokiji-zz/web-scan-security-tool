/*
  Warnings:

  - You are about to drop the column `externalIp` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `internalIp` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ipAddress` to the `Target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `port` to the `Target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protocol` to the `Target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Target` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_targetId_fkey";

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "externalIp",
DROP COLUMN "internalIp",
ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "macAddress" TEXT,
ADD COLUMN     "port" INTEGER NOT NULL,
ADD COLUMN     "product" TEXT,
ADD COLUMN     "protocol" TEXT NOT NULL,
ADD COLUMN     "service" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "version" TEXT;

-- DropTable
DROP TABLE "Service";
