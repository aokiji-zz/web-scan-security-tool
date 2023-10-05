-- AlterTable
ALTER TABLE "Target" ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "internalIp" TEXT,
ALTER COLUMN "externalIp" DROP NOT NULL,
ADD CONSTRAINT "Target_pkey" PRIMARY KEY ("id");
